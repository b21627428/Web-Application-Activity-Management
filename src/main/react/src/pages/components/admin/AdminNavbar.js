import React from "react";

import { Navbar, Button } from "react-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import swal from "sweetalert";

class AdminNavbar extends React.Component {
	logOut = (event) => {
		swal({
			title: "Are you sure?",
			text: "Do you really want to Sign Out?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((logout) => {
			if (logout) {
				localStorage.clear();
				window.location.replace("/");
			}
		});
	};
	render() {
		return (
			<Navbar
				style={{
					position: "sticky",
					top: 0,
					zIndex: 2,
				}}
				bg="dark"
				variant="dark"
			>
				<Navbar.Brand className="m-3" href="/">
					ACTIVITE
				</Navbar.Brand>

				<Button
					style={{
						backgroundColor: "darkgreen",
						color: "white",
						border: "0px",
						borderRadius: "10px",
					}}
					className="ml-auto"
					onClick={this.logOut}
				>
					<ExitToAppIcon className="mr-1" />
					Sign Out
				</Button>
			</Navbar>
		);
	}
}
export default AdminNavbar;
