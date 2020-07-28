import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import { Input } from "../../others/guest/Input";
import { Row, Col, Form } from "react-bootstrap";

class CreateContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			quota: "",
			startDate: "",
			endDate: "",
			address: "",
			errors: {},
		};
	}
	onChange = (event) => {
		event.preventDefault();
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
		const { name, startDate, endDate, quota, address } = this.state;
		if (
			name === "" ||
			startDate === "" ||
			endDate === "" ||
			quota === "" ||
			address === ""
		)
			return true;
		return false;
	};
	render() {
		const { data } = this.props;
		const { errors } = this.state;
		const { name, quota } = errors;
		return (
			<div>
				<CardHeader
					style={{
						backgroundColor: "#343A40",
						color: "#e3e3e3",
						height: "100px",
					}}
					avatar={
						<Avatar
							style={{
								backgroundColor: "white",
								color: "black",
								position: "static",
							}}
						>
							{this.state.name[0] || ""}
						</Avatar>
					}
					title={
						<Input
							onChange={this.onChange}
							name="name"
							type="text"
							placeholder={data !== undefined ? data.name : "Enter name"}
							error={name}
						/>
					}
				/>

				<Row className="m-5">
					<Col>
						<input type="file" />
					</Col>
					<Col>
						<Row>
							<input
								onChange={this.onChange}
								type="datetime-local"
								id="startDate"
								name="startDate"
								placeholder={data !== undefined ? data.startDate : ""}
							/>
						</Row>
						<Row>
							<input
								onChange={this.onChange}
								type="datetime-local"
								id="endDate"
								name="endDate"
								placeholder={data !== undefined ? data.endDate : ""}
							/>
						</Row>
					</Col>
					<Col>
						<Row>
							<Input
								onChange={this.onChange}
								name="quota"
								type="text"
								placeholder={data !== undefined ? data.quota : "Enter Quota"}
								error={quota}
							/>
						</Row>
						<Row></Row>
					</Col>
				</Row>
			</div>
		);
	}
}
export default CreateContainer;
