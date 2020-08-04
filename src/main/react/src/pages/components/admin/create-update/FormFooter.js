import React from "react";

import { Row, Col } from "react-bootstrap";

class FormFooter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {
		if (
			this.props.startDate &&
			this.props.endDate &&
			this.props.quota &&
			this.props.explanation
		) {
			const { startDate, endDate, quota, explanation } = this.props;
			this.setState({ startDate, endDate, quota, explanation });
		}
	};
	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};
	render() {
		return (
			<div>
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
				</Row>
				<Row className="mx-5 mt-5 mb-3">
					<label className="pt-2">Explanation</label>

					<Col>
						<textarea
							id="explanation"
							name="explanation"
							type="text"
							placeholder="Enter Explanation"
							onChange={this.onChange}
							value={this.state.explanation || ""}
							className="ml-2 p-2"
							style={{ width: "100%", height: "100px" }}
						/>
					</Col>
					<label className="ml-4 pt-2">Quota</label>

					<Col xs lg="2" className="mr-5">
						<input
							id="quota"
							name="quota"
							type="text"
							onChange={this.onChange}
							value={this.state.quota || ""}
							className="ml-2 p-2"
							style={{ width: "75px" }}
						/>
					</Col>
				</Row>
			</div>
		);
	}
}
export default FormFooter;
