import React from "react";

import CardHeader from "@material-ui/core/CardHeader";
import { Form } from "react-bootstrap";

class FormHeader extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount = () => {
		if (this.props.name) {
			const { name } = this.props;
			this.setState({ name });
		}
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		return (
			<CardHeader
				className="bg-secondary"
				title={
					<Form.Control
						id="name"
						name="name"
						type="text"
						placeholder="Enter event title"
						onChange={this.onChange}
						value={this.state.name || ""}
						className="border-0 font-weight-bold"
					/>
				}
			/>
		);
	}
}

export default FormHeader;
