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
		trivia: ResultsItem[];
	};
}

export enum INCOMING_COMMANDS {
	GEN_GAME = "gen_game",
	JOIN_GAME = "join_game",
	// START_GAME = "start_game",
}

export interface IMsgData {
	command: INCOMING_COMMANDS;
	[key: string]: string;
}

export interface IOpenDBData {
	response_code: OpenDBRespondeCode;
	results: ResultsItem[];
}

enum OpenDBRespondeCode {
	SUCCESS = 0,
	NO_RESULTS,
	INVALID_PARAMETER,
	TOKEN_NOT_FOUND,
	TOKEN_EMPTY,
}

interface ResultsItem {
	category: string;
	type: string;
	difficulty: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}
