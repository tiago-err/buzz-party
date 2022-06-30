import {RawData, WebSocket} from "ws";
import {COLORS, IGames, IMsgData, INCOMING_COMMANDS} from "./interfaces";
import {v4 as uuidv4} from "uuid";
import {randomColor} from "./utils";
import {broadcastToGame} from "./websocket";
import {retrieveSampleQuestions} from "./triviaService";

enum COMMANDS {
	GEN_GAME = "gen_game",
	JOIN_GAME = "join_game",
	PLAYER_LIST = "player_list",
	START_GAME = "start_game",
}

const commands = {
	[INCOMING_COMMANDS.GEN_GAME]: (ws: WebSocket, games: IGames, data: RawData) => {
		const gameId = Math.floor(Math.random() * 1000000);

		const game = {
			host: {
				ws,
				id: uuidv4(),
			},
			players: [],
			usedColors: [],
			trivia: [],
		};

		ws.send(JSON.stringify({type: "response", command: COMMANDS.GEN_GAME, id: uuidv4(), gameId}));
		return {game, gameId};
	},
	[INCOMING_COMMANDS.JOIN_GAME]: (ws: WebSocket, games: IGames, data: RawData) => {
		const parsedData = JSON.parse(data.toString("utf-8")) as IMsgData;

		const gameId = parsedData.gameId;
		if (!Object.keys(games).includes(gameId)) {
			ws.send(
				JSON.stringify({
					id: uuidv4(),
					command: COMMANDS.JOIN_GAME,
					error: "E001",
				}),
			);
			return {gameId: undefined, game: undefined};
		}

		const game = games[gameId];
		if (!!game.players.find((player) => player.name.toLowerCase() === parsedData.name.toLowerCase())) {
			ws.send(
				JSON.stringify({
					id: uuidv4(),
					command: COMMANDS.JOIN_GAME,
					error: "E002",
				}),
			);

			return {gameId: undefined, game: undefined};
		}

		const newPlayer = {
			ws,
			name: parsedData.name,
			color: randomColor(game.usedColors),
		};

		game.players.push(newPlayer);
		game.usedColors.push(newPlayer.color);
		game.host.ws.send(
			JSON.stringify({
				id: uuidv4(),
				player: {
					name: parsedData.name,
					color: newPlayer.color,
				},
				command: COMMANDS.JOIN_GAME,
				gameId,
				success: true,
			}),
		);

		ws.send(
			JSON.stringify({
				id: uuidv4(),
				player: {
					name: parsedData.name,
					color: newPlayer.color,
				},
				command: COMMANDS.JOIN_GAME,
				gameId,
				success: true,
			}),
		);

		broadcastToGame(
			[game.host.ws, ...game.players.map((player) => player.ws)],
			JSON.stringify({
				id: uuidv4(),
				players: game.players.map((player) => ({name: player.name, color: player.color})),
				command: COMMANDS.PLAYER_LIST,
				gameId,
			}),
		);

		return {gameId, game};
	},
	// [INCOMING_COMMANDS.START_GAME]: (ws: WebSocket, games: IGames, data: RawData) => {
	// 	const parsedData = JSON.parse(data.toString("utf-8")) as IMsgData;

	// 	const gameId = parsedData.gameId;
	// 	if (!Object.keys(games).includes(gameId)) {
	// 		ws.send(
	// 			JSON.stringify({
	// 				id: uuidv4(),
	// 				command: COMMANDS.START_GAME,
	// 				error: "E001",
	// 			}),
	// 		);
	// 		return {gameId: undefined, game: undefined};
	// 	}

	// 	const game = games[gameId];
	// 	return retrieveSampleQuestions().then((questions) => {
	// 		game.trivia = questions;
	// 		broadcastToGame(
	// 			[game.host.ws, ...game.players.map((player) => player.ws)],
	// 			JSON.stringify({
	// 				id: uuidv4(),
	// 				type: "response",
	// 				command: COMMANDS.START_GAME,
	// 				trivia: questions,
	// 			}),
	// 		);

	// 		return {gameId, game};
	// 	});
	// },
};

export {COMMANDS};
export default commands;
