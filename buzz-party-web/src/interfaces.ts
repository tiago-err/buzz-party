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

export enum COMMANDS {
	GEN_GAME = "gen_game",
	JOIN_GAME = "join_game",
	PLAYER_LIST = "player_list",
	START_GAME = "start_game",
}

export enum ERRORS {
	INVALID_GAME_ID = "E001",
	NAME_ALREADY_IN_USE = "E002",
}

export interface IPlayer {
	name: string;
	id: string;
	color: COLORS;
}

export interface IWSBase {
	id: string;
	type: "response" | "command" | "message";
	command: COMMANDS;
}

export interface ICommandGenGame extends IWSBase {
	gameId: string;
}

export interface ICommandJoinGame extends IWSBase {
	player: IPlayer;
	error?: ERRORS;
	gameId: string;
}

export interface ICommandPlayerList extends IWSBase {
	players: IPlayer[];
}
