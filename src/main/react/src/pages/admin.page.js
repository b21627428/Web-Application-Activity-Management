import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Menu from "./components/admin/Menu";
import Activities from "./components/admin/Activities";
import Users from "./components/admin/Users";
import AdminNavbar from "./components/admin/AdminNavbar";
import Dashboard from "./components/admin/Dashboard";
import Create from "./components/admin/Create";

class AdminPage extends React.Component {
	render() {
		return (
			<div
				style={{
					backgroundColor: "#e3e3e3",
				}}
			>
				<Router>
					<AdminNavbar />
					<Menu />
					<div style={{ marginLeft: "250px" }}>
						<Switch>
							<Route path="/dashboard" component={Dashboard} />
							<Route path="/users" component={Users} />
							<Route path="/activities/create" component={Create} />
							<Route path="/" component={Activities} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
export default AdminPage;
