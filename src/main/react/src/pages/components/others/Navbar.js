import React from "react";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { Navbar, Nav, Form, FormControl, Dropdown } from "react-bootstrap";

class Header extends React.Component {
	constructor() {
		super();
		this.state = {
			search: "",
		};
	}

	onSearch = (event) => {
		event.preventDefault();
		if (this.state.search.trim() !== "")
			window.location.href = "/?search=" + this.state.search.trim();
		else window.alert("Please type something...");
	};
	logOut = (event) => {
		const r = window.confirm("Do you really want to Sign Out?");
		if (r === true) {
			localStorage.clear();
			window.location.replace("/");
		}
	};

	onChange = (event) => {
		event.preventDefault();
		this.setState({ search: event.target.value });
	};

	// onKeyUp = (event) => {
	// 	event.preventDefault();
	// 	if (event.key === "Enter") {
	// 		if (this.state.search.trim() !== "")
	// 			window.location.href = "/search?q=" + this.state.search.trim();
	// 		else window.alert("Please type something...");
	// 	}
	// };

	render() {
		return (
			<Navbar
				style={{ position: "sticky", top: 0, zIndex: 2 }}
				bg="dark"
				variant="dark"
			>
				<Navbar.Brand className="ml-4" href="/">
					ACTIVITE
				</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link className="m-2" href="/">
						<HomeIcon className="mr-1" />
						Home
					</Nav.Link>
					<Nav.Link className="m-2" href="/about">
						<InfoIcon className="mr-1" />
						About
					</Nav.Link>
					<Nav.Link className="m-2" href="/help">
						<LiveHelpIcon className="mr-1" />
						Help
					</Nav.Link>
				</Nav>
				<Form inline>
					<FormControl
						type="text"
						placeholder="Search"
						onChange={(event) => this.onChange(event)}
					/>
					<span className="input-group-text" onClick={this.onSearch}>
						<SearchIcon />
					</span>
				</Form>

				<Dropdown
					className="m-2 ml-4"
					style={{
						backgroundColor: "darkgreen",
						color: "white",
						border: "0px",
						borderRadius: "10px",
					}}
				>
					{!localStorage.getItem("token") ? (
						<div>
							<Dropdown.Toggle
								style={{
									backgroundColor: "darkgreen",
									color: "white",
									border: "0px",
									borderRadius: "10px",
								}}
								variant="success"
								id="dropdown-basic"
							>
								<AccountBoxIcon className="mr-1" />
								Register/Login
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<div>
									<Dropdown.Item href="/register-login?q=register">
										<PersonAddIcon className="mr-1" />
										Register
									</Dropdown.Item>
									<Dropdown.Item href="/register-login?q=login">
										<VpnKeyIcon className="mr-1" />
										Login
									</Dropdown.Item>
								</div>
							</Dropdown.Menu>
						</div>
					) : (
						<div>
							<Dropdown.Toggle
								style={{
									backgroundColor: "darkgreen",
									color: "white",
									border: "0px",
									borderRadius: "10px",
								}}
								variant="success"
								id="dropdown-basic"
							>
								<SettingsIcon className="mr-1" />
								Settings
							</Dropdown.Toggle>

							<Dropdown.Menu>
								<div>
									<Dropdown.Item href="/profile">
										<AccountBoxIcon className="mr-1" />
										Profile
									</Dropdown.Item>
									<Dropdown.Item onClick={this.logOut}>
										<ExitToAppIcon className="mr-1" />
										Sign Out
									</Dropdown.Item>
								</div>
							</Dropdown.Menu>
						</div>
					)}
				</Dropdown>
			</Navbar>
		);
	}
}
export default Header;
