import dotenv from "dotenv";
import generateWebSocket from "./websocket";
import SimpleNodeLogger from "simple-node-logger";
import {IGames, IMsgData} from "./interfaces";
import commands from "./commands";

dotenv.config();
const log = SimpleNodeLogger.createSimpleLogger();

const games: IGames = {};
const wss = generateWebSocket(parseInt(process.env.WSS_PORT || "8080"));

wss.on("connection", (ws) => {
	log.info(`[WSS] New client connected: ${ws.url}`);

	ws.on("message", (data) => {
		log.info(`[WSS] Client sent: ${data}`);
		const parsedData = JSON.parse(data.toString("utf-8")) as IMsgData;

		const {game, gameId} = commands[parsedData.command](ws, games, data);
		if (game) games[gameId] = game;
	});

	ws.on("close", () => {
		log.info("[WSS] Client disconnected!");
	});

	ws.onerror = () => {
		log.info("[WSS] Error occurred!");
	};
});

log.info(`[WSS] Started websocket server on port ${process.env.WSS_PORT || "8080"}!`);
