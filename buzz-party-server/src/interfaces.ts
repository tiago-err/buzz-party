import {WebSocket} from "ws";
import {COMMANDS} from "./commands";

export interface IGames {
	[key: string]: {
		host: {
			id: string;
			ws: WebSocket;
		};
		players: {
			ws: WebSocket;
			name: string;
		}[];
	};
}

export interface IMsgData {
	command: COMMANDS;
	[key: string]: string;
}
