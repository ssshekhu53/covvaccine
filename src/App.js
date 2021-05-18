import { BrowserRouter as Router, Route } from "react-router-dom";
import TopNavigation from "./components/navbar.component";
import Homepage from "./pages/home.page";
import Pincode from "./pages/pincode.page";

function App() {
  return (
	<div className="bg-light" style={{minHeight: "100vh"}}>
		<Router>
			<TopNavigation />
			<br/>
			<Route path="/" exact component={Homepage} />
			<Route path="/pincode-search" exact component={Pincode} />
		</Router>
	</div>
  );
}

export default App;
