import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function Background(props: React.PropsWithChildren) {
	return <div className="h-screen w-full dark:bg-neutral-800 bg-neutral-200 flex flex-col justify-center items-center">{props.children}</div>;
}

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Background>
							<div>Teste</div>
						</Background>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
