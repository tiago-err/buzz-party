import WebSocket, {WebSocketServer} from "ws";

export default function generateWebSocket(port: number) {
	return new WebSocketServer({
		port: port,
		perMessageDeflate: {
			zlibDeflateOptions: {
				// See zlib defaults.
				chunkSize: 1024,
				memLevel: 7,
				level: 3,
			},
			zlibInflateOptions: {
				chunkSize: 10 * 1024,
			},
			// Other options settable:
			clientNoContextTakeover: true, // Defaults to negotiated value.
			serverNoContextTakeover: true, // Defaults to negotiated value.
			serverMaxWindowBits: 10, // Defaults to negotiated value.
			// Below options specified as default values.
			concurrencyLimit: 10, // Limits zlib concurrency for perf.
			threshold: 1024, // Size (in bytes) below which messages
			// should not be compressed if context takeover is disabled.
		},
	});
}

export function broadcast(wss: WebSocketServer, message: string) {
	for (const client of wss.clients.values()) {
		client.send(message, (error) => {
			if (!!error) console.log(error);
		});
	}
}

export function broadcastToGame(ws: WebSocket[], message: string) {
	for (const client of ws) {
		client.send(message, (error) => {
			if (!!error) console.log(error);
		});
	}
}
