import { LocationProvider, Route, Router } from "preact-iso";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

export interface AppProps {
  hasPrerenderedContent?: boolean;
  slug?: string;
}

function App(props: AppProps) {
  return (
    <LocationProvider>
      <Router>
        <Route path="/" component={HomePage} />
        <Route
          path="/posts/:slug"
          component={(routeProps) => <PostPage {...routeProps} {...props} />}
        />
        <Route default component={() => <div>404</div>} />
      </Router>
    </LocationProvider>
  );
}

export default App;
