import {RawData, WebSocket} from "ws";
import {IGames, IMsgData} from "./interfaces";
import {v4 as uuidv4} from "uuid";

enum COMMANDS {
	GEN_GAME = "gen_game",
	JOIN_GAME = "join_game",
}

const commands = {
	[COMMANDS.GEN_GAME]: (ws: WebSocket, games: IGames, data: RawData) => {
		const gameId = Math.floor(Math.random() * 1000000);

		const game = {
			host: {
				ws,
				id: uuidv4(),
			},
			players: [],
		};

		ws.send(JSON.stringify({type: "response", command: COMMANDS.GEN_GAME, id: uuidv4(), gameId}));
		return {game, gameId};
	},
	[COMMANDS.JOIN_GAME]: (ws: WebSocket, games: IGames, data: RawData) => {
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
		};

		game.players.push(newPlayer);
		game.host.ws.send(
			JSON.stringify({
				id: uuidv4(),
				player: {
					name: parsedData.name,
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
				},
				command: COMMANDS.JOIN_GAME,
				gameId,
				success: true,
			}),
		);

		return {gameId, game};
	},
};

export {COMMANDS};
export default commands;
