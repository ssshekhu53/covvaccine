import { BrowserRouter as Router, Route } from "react-router-dom";
import TopNavigation from "./components/navbar.component";
import Homepage from "./pages/home.page";

function App() {
  return (
    <Router>
		<TopNavigation />
		<br/>
		<Route path="/" exact component={Homepage} />
	</Router>
  );
}

export default App;
