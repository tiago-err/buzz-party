import dotenv from "dotenv";
import generateWebSocket from "./websocket";
import SimpleNodeLogger from "simple-node-logger";

dotenv.config();
const log = SimpleNodeLogger.createSimpleLogger();

const wss = generateWebSocket(parseInt(process.env.WSS_PORT || "8080"));

wss.on("connection", (ws) => {
	log.info("[WS] New client connected!");

	ws.on("message", (data) => {
		console.log(`[WSS] Client sent: ${data}`);
	});

	ws.on("close", () => {
		console.log("[WSS] Client disconnected!");
	});

	ws.onerror = () => {
		console.log("[WSS] Error occurred!");
	};
});

console.log(`[WSS] Started websocket server on port ${process.env.WSS_PORT || "8080"}!`);
