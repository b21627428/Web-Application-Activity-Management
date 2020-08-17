import React from "react";
import Card from "@material-ui/core/Card";

import Map from "../Map";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormButton from "./FormButton";

import { storage } from "../Firebase";

import { createActivity } from "../../../../api/apiCalls";
import { updateActivity } from "../../../../api/apiCalls";

class CreateUpdateForm extends React.Component {
	imageUploadAndRecord = async (image, params) => {
		var metadata = {
			contentType: "image/jpeg",
		};
		var uploadTask = storage.ref(`images/${image.name}`).put(image, metadata);
		uploadTask.on(
			"state_changed",
			(snapshot) => {},
			(error) => {
				console.log(error);
			},
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(async (url) => {
						params["pictureUrl"] = url;
						if (this.props.data) {
							try {
								await updateActivity(params);
								alert("Succesfully updated");
								this.props.handleClose();
								window.location.reload();
							} catch (error) {
								alert(error.response.data.message);
							}
						} else {
							try {
								await createActivity(params);
								alert("Succesfully created");
								window.location.href = "/";
							} catch (error) {
								alert(error.response.data.message);
							}
						}
					});
			}
		);
	};
	onCreateUpdate = async () => {
		if (!this.isThereError()) {
			var params = this.getParams();
			if (params["quota"] <= 0) {
				alert("Quota must be positive..");
			} else {
				if (this.props.data) {
					params["id"] = this.props.data.id;
					params["pictureUrl"] = this.props.data.pictureUrl;
				}
				if (params["startDate"] > params["endDate"]) {
					alert("The start date must be before end date");
				} else {
					var image = document.getElementById("picture").files[0];
					if (image === undefined && !this.props.data) {
						alert("The image must be choosen");
					} else if (image === undefined && this.props.data) {
						try {
							await updateActivity(params);
							alert("Succesfully updated");
							this.props.handleClose();
							window.location.reload();
						} catch (error) {
							alert(error.response.data.message);
						}
					} else if (image !== undefined) {
						await this.imageUploadAndRecord(image, params);
					}
				}
			}
		} else {
			alert("All blanks must be filled.");
		}
	};
	isThereError() {
		const params = this.getParams();
		let error = false;
		Object.keys(params).forEach(function (key) {
			if (params[key].trim() === "") {
				error = true;
			}
		});
		return error;
	}
	getParams = () => {
		try {
			const array = [
				"name",
				"address",
				"lat",
				"lng",
				"quota",
				"startDate",
				"endDate",
				"explanation",
			];
			let params = {};
			array.map((row) => (params[row] = document.getElementById(row).value));
			return params;
		} catch (error) {
			return {};
		}
	};

	render() {
		return (
			<div>
				<FormHeader name={this.props.data && this.props.data.name} />
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
							lat: this.props.data ? this.props.data.lat : 39.907,
							lng: this.props.data ? this.props.data.lng : 32.8,
							address: this.props.data
								? this.props.data.address
								: "Tübitak Bilgem YTE",
						}}
						height="350px"
						zoom={15}
					/>
				</Card>
				<Card
					style={{
						border: "0px",
						backgroundColor: "whitesmoke",
					}}
				>
					<FormFooter
						quota={this.props.data && this.props.data.quota}
						startDate={this.props.data && this.props.data.startDate}
						endDate={this.props.data && this.props.data.endDate}
						explanation={this.props.data && this.props.data.explanation}
					/>
				</Card>
				<Card style={{ backgroundColor: "darkgray" }}>
					<FormButton
						data={this.props.data}
						onCreate={this.onCreateUpdate}
						onUpdate={this.onCreateUpdate}
						handleClose={this.props.handleClose}
					/>
				</Card>
			</div>
		);
	}
}
export default CreateUpdateForm;
