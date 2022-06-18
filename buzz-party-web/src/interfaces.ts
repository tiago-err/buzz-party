export enum COMMANDS {
	GEN_GAME = "gen_game",
	JOIN_GAME = "join_game",
}

export enum ERRORS {
	INVALID_GAME_ID = "E001",
	NAME_ALREADY_IN_USE = "E002",
}

export interface IPlayer {
	name: string;
	id: string;
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
	player: {
		name: string;
		id: string;
	};
	error?: ERRORS;
	gameId: string;
}
