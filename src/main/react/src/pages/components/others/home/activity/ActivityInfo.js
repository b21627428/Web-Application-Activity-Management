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
import QrCodeModal from "./QrCodeModal";

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
	truncate(str) {
		return str !== null && str.length > 120
			? str.substring(0, 117) + "..."
			: str;
	}
	render() {
		const { isAlreadyEnrolled } = this.state;
		const { data } = this.props;

		return (
			<Card
				style={{
					width: "400px",
				}}
				className={styles.card_shadow}
			>
				<CardHeader
					style={{
						backgroundColor: "#343A40",
						color: "#e3e3e3",
						height: "150px",
					}}
					avatar={
						<Avatar
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
						<strong style={{ fontSize: "16px" }}>
							{this.truncate(data.name)}
						</strong>
					}
				/>

				<CardMedia>
					<img
						style={{
							height: "200px",
							backgroundSize: "cover",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
						alt="Not Found"
						src={data.pictureUrl}
					/>
				</CardMedia>
				<Card>
					<CardContent>
						<Card
							style={{
								height: "100px",
								backgroundColor: "#e3e3e3",
								borderRadius: "0px",
							}}
							className="p-3"
						>
							<strong>Explanation : </strong>
							{this.truncate(data.explanation)}
						</Card>
						<Card style={{ borderRadius: "0px" }} className="p-3">
							<strong>Start Date : </strong>{" "}
							{data.startDate.split("T")[0] +
								" " +
								data.startDate.split("T")[1]}
						</Card>
						<Card
							style={{ backgroundColor: "#e3e3e3", borderRadius: "0px" }}
							className="p-3"
						>
							<strong>End Date :</strong>{" "}
							{data.endDate.split("T")[0] + " " + data.endDate.split("T")[1]}
						</Card>
						<Card
							style={{ height: "100px", borderRadius: "0px" }}
							className="p-3"
						>
							<strong>Address : </strong> {this.truncate(data.address)}
						</Card>
					</CardContent>
				</Card>
				<Card style={{ backgroundColor: "#e3e3e3" }} className="p-3">
					<Row>
						<Col>
							{data.isActive !== true ? (
								<Button
									style={{
										backgroundColor: "darkblue",
										color: "white",
									}}
									className="ml-4"
									disabled={true}
								>
									Not Active
								</Button>
							) : isAlreadyEnrolled === true ? (
								<Row>
									<Button
										style={{
											backgroundColor: "darkred",
											color: "white",
										}}
										className="ml-5"
										onClick={this.cancel}
									>
										Cancel
									</Button>

									<QrCodeModal getParams={this.getParams} />
								</Row>
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
			</Card>
		);
	}
}
export default ActivityInfo;
