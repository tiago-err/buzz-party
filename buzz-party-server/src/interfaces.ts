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

export interface IMsgData {
	command: COMMANDS;
	[key: string]: string;
}
