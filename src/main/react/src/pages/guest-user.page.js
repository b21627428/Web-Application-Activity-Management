import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/others/home/Home";
import About from "./components/others/About";
import Help from "./components/others/Help";
import Profile from "./components/others/user/Profile";
import Navbar from "./components/others/Navbar";
import MyFooter from "./components/others/Footer";
import { ProtectedRoute } from "../ProtectedRoute";

import styles from "./components/others/home/mystyle.module.css";

class GuestUserPage extends React.Component {
	render() {
		return (
			<div className={styles.mybg}>
				<Navbar />
				<Switch>
					<Route exact path="/about" component={About}></Route>
					<Route exact path="/help" component={Help}></Route>
					<ProtectedRoute path="/profile" component={Profile} />
					<Route path="/" component={Home}></Route>
				</Switch>
				<MyFooter />
			</div>
		);
	}
}
export default GuestUserPage;
