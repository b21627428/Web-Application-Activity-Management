import React from "react";

import { getQrCode } from "../../../../../api/apiCalls";

class QrCodeContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			base64: "",
		};
	}

	componentDidMount = async (event) => {
		const params = await this.props.getParams();

		try {
			const response = await getQrCode(params);
			this.setState({ base64: response.data });
		} catch (error) {
			alert("Something went wrong");
		}
	};

	render() {
		const { base64 } = this.state;
		return (
			<div>
				<img
					alt="Can not create"
					style={{ width: 500, height: 500 }}
					src={"data:image/png;base64," + base64}
				/>
			</div>
		);
	}
}
export default QrCodeContainer;
