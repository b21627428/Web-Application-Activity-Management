import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import { Row, Col } from "react-bootstrap";
// import "primereact/resources/themes/nova-light/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

import EnrollModal from "./EnrollModal";
import MapModal from "./MapModal";

import styles from "../mystyle.module.css";

import { checkEnrollment } from "../../../../../api/apiCalls";
import { cancelEnrollment } from "../../../../../api/apiCalls";

class ActivityInfo extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	cancel = async (event) => {
		const r = await window.confirm("Do you really want to cancel enrollment?");
		if (r === true) {
			try {
				await cancelEnrollment(this.getParams());
				this.changeAlreadyEnrolled(false);
			} catch (error) {}
		}
	};

	changeAlreadyEnrolled = (value) => {
		this.setState({ isAlreadyEnrolled: value });
	};

	getParams = () => {
		const { activityId } = this.props.data;
		const identificationNumber = JSON.parse(localStorage.getItem("user")).sub;
		const params = {
			identificationNumber,
			activityId,
		};
		return params;
	};
	componentDidMount = async (event) => {
		try {
			if (localStorage.getItem("user")) {
				const response = await checkEnrollment(this.getParams());
				this.setState({ isAlreadyEnrolled: response.data });
			} else this.setState({ isAlreadyEnrolled: false });
		} catch (error) {
			this.setState({ isAlreadyEnrolled: false });
		}
	};
	render() {
		const { isAlreadyEnrolled } = this.state;
		const { data, index } = this.props;
		const backgroundColor = index % 2 === 0 ? "#7f7882" : "#566e65";
		return (
			<div>
				<Card
					className={styles.card_shadow}
					style={{
						backgroundColor,
						width: "450px",
					}}
				>
					<Card
						style={{
							backgroundColor: "#350039",
							color: "white",
						}}
						className="mb-3"
					>
						<CardHeader
							avatar={
								<Avatar
									aria-label="recipe"
									style={{
										backgroundColor: "white",
										color: "black",
										position: "static",
									}}
								>
									{data.name[0]}
								</Avatar>
							}
							title={
								<strong style={{ fontSize: "15px", color: "#e3e3e3" }}>
									{data.name}
								</strong>
							}
						/>
					</Card>

					<div>
						<Card>
							<CardMedia ttitle="Paella dish">
								<img alt="Not Found" className="w-100" src={data.pictureUrl} />
							</CardMedia>
						</Card>

						<div>
							<Card className="mt-3">
								<CardContent>
									<div>
										<strong>Explanation :</strong> {data.explanation}
										<hr />
										<strong>Start Date :</strong>{" "}
										{data.startDate.split("T")[0] +
											" " +
											data.startDate.split("T")[1]}
										<hr />
										<strong>End Date :</strong>{" "}
										{data.endDate.split("T")[0] +
											" " +
											data.endDate.split("T")[1]}
										<hr />
										<div>
											<strong>Address : </strong> {data.address}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
					<Row className="ml-1 mt-3">
						<Col style={{ position: "static" }}>
							{data.isActive !== true ? (
								<Button
									style={{
										backgroundColor: "darkblue",
										color: "white",
										position: "static",
									}}
									disabled={true}
								>
									Not Active
								</Button>
							) : isAlreadyEnrolled === true ? (
								<Button
									style={{
										backgroundColor: "darkred",
										color: "white",
										position: "static",
									}}
									onClick={this.cancel}
								>
									Cancel
								</Button>
							) : (
								<EnrollModal
									changeAlreadyEnrolled={this.changeAlreadyEnrolled}
									data={data}
									getParams={this.getParams}
								/>
							)}
						</Col>
						<Col style={{ position: "static" }}>
							<MapModal data={data} />
						</Col>
					</Row>
				</Card>
			</div>
		);
	}
}
export default ActivityInfo;
