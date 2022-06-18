interface Props {
	selectClientType: (type: "host" | "player") => void;
}

export default function ClientSelection(props: Props) {
	return (
		<div className="h-full w-full flex flex-col justify-center items-center">
			<span className="text-black dark:text-white font-light text-2xl mb-8">Please select a client type</span>
			<button
				onClick={() => props.selectClientType("host")}
				className="bg-white text-black px-8 py-4 rounded-xl text-xl font-semibold drop-shadow-sm mb-8">
				Host
			</button>
			<button
				onClick={() => props.selectClientType("player")}
				className="bg-white text-black px-8 py-4 rounded-xl text-xl font-semibold drop-shadow-sm">
				Player
			</button>
		</div>
	);
}
