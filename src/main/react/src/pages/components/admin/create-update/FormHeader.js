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
				style={{
					backgroundColor: "#343A40",
					color: "#e3e3e3",
					height: "100px",
				}}
				title={
					<Form.Group>
						<Form.Control
							id="name"
							name="name"
							type="text"
							placeholder="Enter name"
							onChange={this.onChange}
							value={this.state.name || ""}
							className="p-4"
						/>
					</Form.Group>
				}
			/>
		);
	}
}

export default FormHeader;
