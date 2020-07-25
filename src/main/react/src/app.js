import React from "react";
import { Switch } from "react-router-dom";

// import { TabView, TabPanel } from "primereact/tabview";

import { BrowserRouter as Router, Route } from "react-router-dom";

import RegisterLogin from "./pages/register-login.page";
import GuestUserPage from "./pages/guest-user.page";
import AdminPage from "./pages/admin.page";

import { ProtectedRoute } from "./ProtectedRoute";
import styles from "./pages/components/others/home/mystyle.module.css";

require("dotenv").config();

class App extends React.Component {
	render() {
		let user = JSON.parse(localStorage.getItem("user"));
		if (user != null && user.scopes[0].authority === "ROLE_ADMIN")
			return <AdminPage />;
		return (
			<div className={styles.mybg}>
				<Router>
					<Switch>
						<ProtectedRoute path="/register-login" component={RegisterLogin} />
						<Route path="/" component={GuestUserPage} />
					</Switch>
				</Router>
			</div>
		);
	}
}
export default App;
