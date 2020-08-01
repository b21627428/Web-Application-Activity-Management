import React from "react";

import { Row, Col, Form } from "react-bootstrap";

class FormFooter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		if (this.props.startDate && this.props.endDate && this.props.quota) {
			const { startDate, endDate, quota } = this.props;
			this.setState({ startDate, endDate, quota });
		}
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		return (
			<Row className="mx-5 my-3">
				<Col>
					<input type="file" id="picture" />
				</Col>
				<Col>
					<label>Start Date</label>
					<input
						type="datetime-local"
						id="startDate"
						name="startDate"
						onChange={this.onChange}
						value={this.state.startDate || ""}
					/>
				</Col>
				<Col>
					<label>End Date</label>

					<input
						type="datetime-local"
						id="endDate"
						name="endDate"
						onChange={this.onChange}
						value={this.state.endDate || ""}
					/>
				</Col>
				<Col>
					<Form.Group>
						<Form.Control
							id="quota"
							name="quota"
							type="text"
							placeholder="Enter Quota"
							onChange={this.onChange}
							value={this.state.quota || ""}
						/>
					</Form.Group>
				</Col>
			</Row>
		);
	}
}
export default FormFooter;
