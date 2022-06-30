import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Home} from "./views";

function Background(props: React.PropsWithChildren) {
	return <div className="h-screen w-full dark:bg-neutral-800 bg-neutral-200">{props.children}</div>;
}

function App() {
	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Background>
							<Home />
						</Background>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
