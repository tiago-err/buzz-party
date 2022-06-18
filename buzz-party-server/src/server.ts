import dotenv from "dotenv";
import generateWebSocket from "./websocket";
import SimpleNodeLogger from "simple-node-logger";

dotenv.config();
const log = SimpleNodeLogger.createSimpleLogger();

const wss = generateWebSocket(parseInt(process.env.WSS_PORT || "8080"));

wss.on("connection", (ws) => {
	log.info("[WSS] New client connected!");

	ws.on("message", (data) => {
		log.info(`[WSS] Client sent: ${data}`);
	});

	ws.on("close", () => {
		log.info("[WSS] Client disconnected!");
	});

	ws.onerror = () => {
		log.info("[WSS] Error occurred!");
	};
});

log.info(`[WSS] Started websocket server on port ${process.env.WSS_PORT || "8080"}!`);
