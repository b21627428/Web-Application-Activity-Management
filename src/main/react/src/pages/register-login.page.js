import React from "react";

import { Container, Card, Tabs, Tab } from "react-bootstrap";
import RegisterForm from "./components/others/guest/RegisterForm";
import LoginForm from "./components/others/guest/LoginForm";
import MyFooter from "./components/others/Footer";

class RegisterLogin extends React.Component {
	render() {
		const form = this.props.location.search.split("=")[1];
		return (
			<div style={{ height: "100vh" }}>
				<Container style={{ width: "48%", padding: "110px" }}>
					{form !== "forgotPassword" ? (
						form === "register" || form === "login" ? (
							<Tabs
								className="w-25"
								defaultActiveKey={form}
								id="uncontrolled-tab-example"
							>
								<Tab eventKey="register" title="Sign Up">
									<Card
										className="p-5 shadow"
										style={{ backgroundColor: "#e3e3e3" }}
									>
										<RegisterForm />
									</Card>
								</Tab>

								<Tab eventKey="login" title="Sign In">
									<Card
										className="p-5 shadow"
										style={{ backgroundColor: "#e3e3e3" }}
									>
										<LoginForm />
									</Card>
								</Tab>
							</Tabs>
						) : (
							<Tabs
								className="w-25"
								defaultActiveKey={form}
								id="uncontrolled-tab-example"
							>
								<Tab eventKey={form}>
									<Card
										className="p-5 shadow"
										style={{ backgroundColor: "#e3e3e3" }}
									>
										404 Page
									</Card>
								</Tab>
							</Tabs>
						)
					) : (
						<Tabs
							className="w-25"
							defaultActiveKey={form}
							id="uncontrolled-tab-example"
						>
							<Tab eventKey="forgotPassword">
								<Card
									className="p-5 shadow"
									style={{ backgroundColor: "#e3e3e3" }}
								>
									Forgot Password?
								</Card>
							</Tab>
						</Tabs>
					)}
				</Container>
				<MyFooter />
			</div>
		);
	}
}
export default RegisterLogin;
