import {ReadyState, SendMessage} from "react-use-websocket";
import {createContext} from "react";

const contextDefaults: {sendMessage: SendMessage; lastMessage: MessageEvent | null; readyState: ReadyState} = {
	sendMessage: () => {},
	lastMessage: null,
	readyState: ReadyState.CONNECTING,
};

const WSContext = createContext(contextDefaults);

export default WSContext;
