import React from "react";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

class FormButton extends React.Component {
	render() {
		return (
			<div
				style={{
					padding: "20px",
				}}
			>
				{!this.props.data ? (
					<Row>
						<Link to="/activities">
							<Button variant="secondary" className="mr-auto ml-5">
								Go Back
							</Button>
						</Link>
						<Button
							style={{
								backgroundColor: "darkgreen",
								color: "white",
								border: "0px",
							}}
							className="ml-3"
							onClick={this.props.onCreate}
						>
							Create
						</Button>
					</Row>
				) : (
					<Row>
						<Button
							style={{
								backgroundColor: "#343A40",
								color: "white",
								border: "0px",
							}}
							className="ml-3"
							onClick={this.props.onUpdate}
						>
							Update
						</Button>
						<Link to={"/activities/report?id=" + this.props.data.id}>
							<Button
								style={{
									backgroundColor: "#FFCC00",
									color: "black",
								}}
								className="ml-3"
								onClick={this.props.handleClose}
							>
								Make Report
							</Button>
						</Link>
					</Row>
				)}
			</div>
		);
	}
}
export default FormButton;
