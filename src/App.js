import { BrowserRouter as Router, Route } from "react-router-dom";
import TopNavigation from "./components/navbar.component";
import Homepage from "./pages/home.page";

function App() {
  return (
	<div className="bg-light" style={{minHeight: "100vh"}}>
		<Router>
			<TopNavigation />
			<br/>
			<Route path="/" exact component={Homepage} />
		</Router>
	</div>
  );
}

export default App;
