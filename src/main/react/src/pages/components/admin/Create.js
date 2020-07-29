import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import Avatar from "@material-ui/core/Avatar";

import { Row, Col, Button } from "react-bootstrap";

import Map from "./Map";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

class Create extends React.Component {
	onClick = () => {
		const params = this.getParams();
		console.log(params);
		// if (!this.isThereError) {
		// 	const params = this.getParams();
		// 	console.log(params);
		// } else {
		// 	alert("All blanks must be filled.");
		// }
	};
	isThereError() {
		const params = this.getParams();
		Object.keys(params).forEach(function (key) {
			if (params[key] === "") return true;
		});
		return false;
	}
	getParams = () => {
		try {
			return {
				name: document.getElementById("name").value,
				address: document.getElementById("address").value,
				lat: document.getElementById("lat").value,
				lng: document.getElementById("lng").value,
				quota: document.getElementById("quota").value,
				startDate: document.getElementById("startDate").value,
				endDate: document.getElementById("endDate").value,
			};
		} catch (error) {
			return false;
		}
	};

	render() {
		return (
			<div className="mx-5 mt-5 pb-3">
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
								className="form-control shadow p-4 mt-2"
							/>
						</Form.Group>
					}
				/>

				<Card
					style={{
						backgroundColor: "whitesmoke",
						height: "520px",
						border: "0px",
					}}
				>
					<Map
						google={this.props.google}
						center={{
							lat: 39.907,
							lng: 32.8,
							address: "Tübitak Bilgem YTE",
						}}
						height="350px"
						zoom={15}
					/>
				</Card>
				<Card
					style={{
						backgroundColor: "whitesmoke",
						border: "0px",
					}}
				>
					<Row className="mx-5 my-3">
						<Col>
							<input type="file" id="picture" />
						</Col>
						<Col>
							<label>Start Date</label>
							<input type="datetime-local" id="startDate" name="startDate" />
						</Col>
						<Col>
							<label>End Date</label>

							<input type="datetime-local" id="endDate" name="endDate" />
						</Col>
						<Col>
							<Form.Group>
								<Form.Control
									id="quota"
									name="quota"
									type="text"
									placeholder="Enter Quota"
								/>
							</Form.Group>
						</Col>
					</Row>
				</Card>
				<div
					style={{
						padding: "20px",
					}}
				>
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
							onClick={this.onClick}
						>
							Create
						</Button>
					</Row>
				</div>
			</div>
		);
	}
}
export default Create;
