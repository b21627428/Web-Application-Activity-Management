import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import jwt from "jsonwebtoken";
import { login } from "../../../../api/apiCalls";
import { Input } from "./Input";
import swal from "sweetalert";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			identificationNumber: null,
			password: null,
			pendingApiCall: false,
			errors: {},
		};
	}
	onChange = (event) => {
		const { value, name } = event.target;
		const errors = { ...this.state.errors };
		value === ""
			? (errors[name] = `Must be filled.`)
			: (errors[name] = undefined);
		this.setState({
			[name]: value,
			errors,
		});
	};
	isThereError = () => {
		const { identificationNumber, password } = this.state;
		if (
			identificationNumber === null ||
			identificationNumber === "" ||
			password === null ||
			password === ""
		)
			return true;
		return false;
	};
	onClick = async (event) => {
		const { identificationNumber, password } = this.state;
		const creds = {
			identificationNumber,
			password,
		};

		if (!this.isThereError()) {
			this.setState({ pendingApiCall: true });
			try {
				const response = await login(creds);

				swal({
					title: "Successfully login.Directing...",
					icon: "success",
					timer: 1500,
				}).then((isClicked) => {
					localStorage.setItem("token", response.data);
					const user = jwt.decode(response.data);
					localStorage.setItem("user", JSON.stringify(user));
					window.location.href = "/";
				});
			} catch (error) {
				try {
					if (error.response.status === 422)
						swal({
							title: "Warning!",
							text: "The identification number or password is wrong.",
							icon: "warning",
							dangerMode: true,
						});
					else if (error.response.status === 400) {
						this.setState({ errors: error.response.data.validationErrors });
						swal({
							title: "Warning!",
							text:
								"Identification number " +
								error.response.data.validationErrors.identificationNumber.toLowerCase(),

							icon: "warning",
							dangerMode: true,
						});
					}
				} catch (err) {
					swal({
						title: "Warning!",
						text: "Connection failed.",
						icon: "warning",
						dangerMode: true,
					});
				}
			}
			this.setState({
				pendingApiCall: false,
			});
		} else {
			swal({
				title: "Warning!",
				text: "All blanks must be filled.",
				icon: "warning",
				dangerMode: true,
			});
		}
	};
	render() {
		const { pendingApiCall, errors } = this.state;
		const { identificationNumber, password } = errors;
		return (
			<Form>
				<Input
					label="Identification Number"
					onChange={this.onChange}
					name="identificationNumber"
					type="text"
					placeholder="Enter identification number"
					error={identificationNumber}
				/>
				<Input
					label="Password"
					onChange={this.onChange}
					name="password"
					type="password"
					placeholder="Password"
					error={password}
				/>
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
							Login
						</Button>
					</Col>
					<Col>
						<a
							style={{ textAlign: "center" }}
							href="/register-login?q=forgotPassword"
						>
							Forgot Password?
						</a>
					</Col>
				</Row>
			</Form>
		);
	}
}
export default LoginForm;
