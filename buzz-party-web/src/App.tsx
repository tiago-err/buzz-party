import {AnimatePresence} from "framer-motion";
import {useContext, useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {ReadyState} from "react-use-websocket";
import ClientSelection from "./pages/ClientSelection";
import "react-toastify/dist/ReactToastify.css";
import WSContext from "./providers/WSContext/context";
import HostHome from "./pages/HostHome";
import PlayerHome from "./pages/PlayerHome";
import GameContext from "./providers/GameProvider/context";

const connections = {
	[ReadyState.CONNECTING]: () => {},
	[ReadyState.OPEN]: () => toast.success("Connected to the server!"),
	[ReadyState.CLOSING]: () => toast.warn("Closing connection"),
	[ReadyState.CLOSED]: () => toast.error("Connection closed"),
	[ReadyState.UNINSTANTIATED]: () => toast.info("Connection to the server uninstantiated."),
};

function App() {
	const [clientType, setClientType] = useState<"host" | "player" | undefined>();
	const {gameId} = useContext(GameContext);

	const {readyState} = useContext(WSContext);

	useEffect(() => {
		connections[readyState]();
	}, [readyState]);

	return (
		<AnimatePresence key="App_AnimatePresence">
			<ToastContainer />
			<div className="w-full h-screen bg-neutral-200 dark:bg-neutral-700 flex flex-col">
				{!clientType && <ClientSelection selectClientType={setClientType} />}
				{clientType === "host" && gameId && <HostHome gameId={gameId} />}
				{clientType === "player" && <PlayerHome />}
			</div>
		</AnimatePresence>
	);
}

export default App;
