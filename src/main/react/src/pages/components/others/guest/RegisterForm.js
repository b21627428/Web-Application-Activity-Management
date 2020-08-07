import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Input } from "./Input";
import { signup } from "../../../../api/apiCalls";

class RegisterFrom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			identificationNumber: null,
			name: null,
			address: null,
			phone: null,
			password: null,
			passwordRepeat: null,
			pendingApiCall: false,
			email: null,
			errors: {},
		};
	}
	isThereError = () => {
		const {
			identificationNumber,
			name,
			address,
			phone,
			password,
			passwordRepeat,
			email,
		} = this.state;
		if (
			identificationNumber === "" ||
			identificationNumber === null ||
			name === "" ||
			name === null ||
			address === "" ||
			address === null ||
			phone === "" ||
			phone === null ||
			password === "" ||
			passwordRepeat === null ||
			passwordRepeat === "" ||
			passwordRepeat === null ||
			email === null ||
			email === ""
		)
			return true;
		return false;
	};
	onChange = (event) => {
		const { value, name } = event.target;
		const errors = { ...this.state.errors };

		if (name === "password" || name === "passwordRepeat") {
			if (
				(name === "password" && value !== this.state.passwordRepeat) ||
				(name === "passwordRepeat" && value !== this.state.password)
			) {
				errors.passwordRepeat = "Password mismatch";
			} else {
				errors.passwordRepeat = undefined;
			}
		} else {
			value === ""
				? (errors[name] = `Must be filled.`)
				: (errors[name] = undefined);
		}
		this.setState({
			[name]: value,
			errors,
		});
	};
	onClick = async (event) => {
		event.preventDefault();
		const {
			identificationNumber,
			name,
			address,
			phone,
			password,
			email,
		} = this.state;
		const body = {
			identificationNumber,
			name,
			address,
			phone,
			password,
			email,
		};
		if (!this.isThereError()) {
			this.setState({ pendingApiCall: true });
			try {
				const response = await signup(body);
				alert("Successfully " + response.data.toLowerCase());
				window.location.replace("/register-login?q=login");
			} catch (error) {
				try {
					if (
						error.response &&
						error.response.data &&
						error.response.data.validationErrors
					) {
						this.setState({ errors: error.response.data.validationErrors });
						if (error.response.data.validationErrors.identificationNumber) {
							alert(
								"Identification number " +
									error.response.data.validationErrors.identificationNumber
							);
						} else if (error.response.data.validationErrors.email) {
							alert("Email " + error.response.data.validationErrors.email);
						}
					} else {
						alert(error.response.data);
					}
				} catch (err) {
					alert("Connection failed...");
				}
			}
			this.setState({
				pendingApiCall: false,
			});
		} else {
			alert("All blanks must be filled...");
		}
	};
	render() {
		const { pendingApiCall, errors } = this.state;
		const {
			identificationNumber,
			name,
			address,
			phone,
			password,
			passwordRepeat,
			email,
		} = errors;
		return (
			<Form>
				<Row>
					<Col>
						<Input
							label="Identification Number"
							onChange={this.onChange}
							name="identificationNumber"
							type="text"
							placeholder="Enter identification number"
							error={identificationNumber}
						/>
					</Col>
					<Col>
						<Input
							label="Name"
							onChange={this.onChange}
							name="name"
							type="text"
							placeholder="Enter your name"
							error={name}
						/>
					</Col>
				</Row>
				<Input
					label="Email"
					onChange={this.onChange}
					name="email"
					type="email"
					placeholder="Enter your email"
					error={email}
				/>
				<Input
					label="Address"
					onChange={this.onChange}
					name="address"
					type="text"
					placeholder="Enter your address"
					error={address}
				/>
				<Input
					label="Phone"
					onChange={this.onChange}
					name="phone"
					type="text"
					placeholder="Enter your phone"
					error={phone}
				/>
				<Row>
					<Col>
						<Input
							label="Password"
							onChange={this.onChange}
							name="password"
							type="password"
							placeholder="Enter your password"
							error={password}
						/>
					</Col>
					<Col>
						<Input
							label="Password Repat"
							onChange={this.onChange}
							name="passwordRepeat"
							type="password"
							placeholder="Password Repeat"
							error={passwordRepeat}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button
							variant="primary"
							onClick={this.onClick}
							disabled={pendingApiCall}
						>
							{pendingApiCall && (
								<span className="spinner-border spinner-border-sm"></span>
							)}
							Register
						</Button>
					</Col>
					<Col>
						<a style={{ textAlign: "center" }} href="/register-login?q=login">
							Already have an account? Sign in
						</a>
					</Col>
				</Row>
			</Form>
		);
	}
}
export default RegisterFrom;
