import React from "react";

import { Link } from "react-router-dom";

class Menu extends React.Component {
	render() {
		return (
			<div
				className="w3-sidebar w3-bar-block p-3"
				style={{ backgroundColor: "darkgray", color: "white", width: "250px" }}
			>
				{" "}
				<Link
					to="/"
					style={{ backgroundColor: "#e3e3e3", color: "black" }}
					className="w3-bar-item w3-button"
				>
					Activites
				</Link>
				<Link
					to="/dashboard"
					style={{ backgroundColor: "#e3e3e3", color: "black" }}
					className="w3-bar-item w3-button"
				>
					Dashboard
				</Link>
				<Link
					to="/users"
					style={{ backgroundColor: "#e3e3e3", color: "black" }}
					className="w3-bar-item w3-button"
				>
					Users
				</Link>
			</div>
		);
	}
}
export default Menu;
