import React from "react";

import { getActivityStatistic } from "../../../api/apiCalls";

class Report extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
		};
	}
	componentDidMount = async () => {
		try {
			const id = this.getSearchParameters()["id"];
			console.log(id);
			const params = {
				id,
			};
			console.log(params);
			const response = await getActivityStatistic(params);
			this.setState({ data: response.data });
		} catch (error) {
			console.log(error);
		}
	};
	getSearchParameters() {
		var prmstr = window.location.search.substr(1);
		return prmstr !== null && prmstr !== ""
			? this.transformToAssocArray(prmstr)
			: {};
	}

	transformToAssocArray(prmstr) {
		var params = {};
		var prmarr = prmstr.split("&");
		for (var i = 0; i < prmarr.length; i++) {
			var tmparr = prmarr[i].split("=");
			params[tmparr[0]] = tmparr[1];
		}
		return params;
	}
	render() {
		return <div>{this.state.id}</div>;
	}
}
export default Report;
