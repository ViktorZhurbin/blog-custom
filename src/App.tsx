import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
	return (
		<StrictMode>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/posts/:slug" element={<PostPage />} />
				</Routes>
			</BrowserRouter>
		</StrictMode>
	);
}

export default App;
