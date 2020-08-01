import React from "react";
import Card from "@material-ui/core/Card";

import Map from "../Map";
import FormHeader from "./FormHeader";
import FormFooter from "./FormFooter";
import FormButton from "./FormButton";

class CreateUpdateForm extends React.Component {
	onCreateUpdate = () => {
		if (!this.isThereError()) {
			const params = this.getParams();
			console.log(params);
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
