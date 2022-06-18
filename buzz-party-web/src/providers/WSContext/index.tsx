import React from "react";
import useWebSocket from "react-use-websocket";
import WSContext from "./context";

export default function WSProvider(props: {children: React.ReactNode}) {
	const {sendMessage, lastMessage, readyState} = useWebSocket(`ws://${process.env.REACT_APP_WSS_SERVER}:${process.env.REACT_APP_WSS_PORT}`);

	return <WSContext.Provider value={{sendMessage, lastMessage, readyState}}>{props.children}</WSContext.Provider>;
}
