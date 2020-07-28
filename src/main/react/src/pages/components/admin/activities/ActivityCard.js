import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import { Row, Col } from "react-bootstrap";

import styles from "../../others/home/mystyle.module.css";

import ViewModal from "./ViewModal";

import { deleteActivity } from "../../../../api/apiCalls";
import { changeActivity } from "../../../../api/apiCalls";
// import BootstrapSwitchButton from "bootstrap-switch-button-react";

class ActivityCard extends React.Component {
	constructor() {
		super();
		this.state = {
			isActive: false,
		};
	}

	onDelete = async (event) => {
		const r = await window.confirm("Do you really want to delete activity?");
		if (r === true) {
			try {
				await deleteActivity(this.props.data.id);
				alert("Sucessfuly deleted..");
				window.location.reload();
			} catch (error) {
				try {
					alert(error.response.data.message);
				} catch (error2) {
					alert("Connection failed");
				}
			}
		}
	};

	changeActive = async (event) => {
		const r = await window.confirm(
			"Do you really want to change active situation?"
		);
		let { isActive } = this.state;
		const { id } = this.props.data;
		if (r === true) {
			try {
				const params = {
					id,
					did: !isActive,
				};
				await changeActivity(params);
				isActive = !isActive;
			} catch (error) {
				try {
					alert(error.response.data.message);
				} catch (error2) {
					alert("Connection failed");
				}
			} finally {
				this.setState({ isActive });
			}
		} else {
			this.setState({ isActive });
		}
	};
	componentDidMount = async (event) => {
		this.setState({ isActive: this.props.data.isActive });
	};
	truncate(str) {
		return str !== null && str.length > 80 ? str.substring(0, 77) + "..." : str;
	}
	render() {
		const { data } = this.props;

		return (
			<Card
				style={{
					width: "350px",
				}}
				className={styles.card_shadow}
			>
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
							width: "350px",

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
				<Card style={{ backgroundColor: "darkgray" }} className="p-3">
					<Row>
						<Col>
							{/* <BootstrapSwitchButton
								checked={this.state.isActive}
								onlabel="Active"
								onstyle="info"
								offlabel="Not Active"
								offstyle="secondary"
								style="w-75"
								onChange={this.changeActive}
							/> */}
						</Col>
						<Col>
							<Row>
								<ViewModal data={data} />
								<Button
									style={{
										backgroundColor: "darkred",
										color: "white",
									}}
									className="ml-2"
									onClick={this.onDelete}
								>
									DELETE
								</Button>
							</Row>
						</Col>
					</Row>
				</Card>
			</Card>
		);
	}
}
export default ActivityCard;
