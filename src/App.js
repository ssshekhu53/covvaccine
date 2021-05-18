import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TopNavigation from "./components/navbar.component";
import Homepage from "./pages/home.page";
import Pincode from "./pages/pincode.page";

function App() {
  return (
	<div className="bg-light" style={{minHeight: "100vh"}}>
		<Router>
			<TopNavigation />
			<br/>
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/pincode-search" exact component={Pincode} />
			</Switch>
		</Router>
	</div>
  );
}

export default App;
