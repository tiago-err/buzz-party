import {AnimatePresence} from "framer-motion";
import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import useWebSocket, {ReadyState} from "react-use-websocket";
import "react-toastify/dist/ReactToastify.css";
import {IWSBase} from "./interfaces";
import ClientSelection from "./pages/ClientSelection";
import {useSearchParams} from "react-router-dom";

const connections = {
	[ReadyState.CONNECTING]: () => toast.loading("Connecting to the server...", {closeOnClick: true}),
	[ReadyState.OPEN]: () => toast.success("Connected to the server!"),
	[ReadyState.CLOSING]: () => toast.warn("Closing connection"),
	[ReadyState.CLOSED]: () => toast.error("Connection closed"),
	[ReadyState.UNINSTANTIATED]: () => toast.info("Connection to the server uninstantiated."),
};

function App() {
	const [messageHistory, setMessageHistory] = useState<IWSBase[]>([]);
	const [clientType, setClientType] = useState<"host" | "player" | undefined>();

	let [searchParams, setSearchParams] = useSearchParams();
	const {sendMessage, lastMessage, readyState} = useWebSocket(`ws://${process.env.REACT_APP_WSS_SERVER}:${process.env.REACT_APP_WSS_PORT}`);

	useEffect(() => {
		if (lastMessage !== null) {
			const message = JSON.parse(lastMessage.data) as IWSBase;
			if (!messageHistory.find((msg) => msg.id === message.id)) {
				setMessageHistory((previous) => [...previous, message]);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastMessage]);

	useEffect(() => {
		console.log(searchParams.get("id"));
	}, [searchParams]);

	useEffect(() => {
		if (clientType === "host") {
			setSearchParams({id: `?id=${Math.floor(Math.random() * 1000000)}`});
		}
	}, [clientType, setSearchParams]);

	useEffect(() => {
		connections[readyState]();
	}, [readyState]);

	return (
		<AnimatePresence key="App_AnimatePresence">
			<ToastContainer />
			<div className="w-full h-screen bg-neutral-200 dark:bg-neutral-700 flex flex-col">
				{!clientType && <ClientSelection selectClientType={setClientType} />}
			</div>
		</AnimatePresence>
	);
}

export default App;
