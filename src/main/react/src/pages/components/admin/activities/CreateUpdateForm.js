import React from "react";

class CreateUpdateForm extends React.Component {
	render() {
		const { data } = this.props;
		return <div>{data !== undefined ? data.name : ""}</div>;
	}
}
export default CreateUpdateForm;
