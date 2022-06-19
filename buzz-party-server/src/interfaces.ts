import {WebSocket} from "ws";
import {COMMANDS} from "./commands";

export enum COLORS {
	RED = "red",
	BLUE = "blue",
	GREEN = "green",
	PINK = "pink",
	ORANGE = "orange",
	YELLOW = "yellow",
	PURPLE = "purple",
	BROWN = "brown",
}

export interface IGames {
	[key: string]: {
		host: {
			id: string;
			ws: WebSocket;
		};
		players: {
			ws: WebSocket;
			name: string;
			color: COLORS;
		}[];
		usedColors: COLORS[];
	};
}

export enum INCOMING_COMMANDS {
	GEN_GAME = "gen_game",
	JOIN_GAME = "join_game",
}

export interface IMsgData {
	command: INCOMING_COMMANDS;
	[key: string]: string;
}
