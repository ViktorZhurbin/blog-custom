import { LocationProvider, Router, Route } from "preact-iso";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={HomePage} />
        <Route path="/posts/:slug" component={PostPage} />
        <Route default component={() => <div>404</div>} />
      </Router>
    </LocationProvider>
  );
}

export default App;
