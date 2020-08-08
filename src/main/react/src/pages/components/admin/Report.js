import React from "react";

import { getActivityStatistic } from "../../../api/apiCalls";
import { Card, Tabs, Tab } from "react-bootstrap";
import PeopleList from "./report/PeopleList";
import Chart from "./report/Chart";

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

			const params = {
				id,
			};
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
		return (
			<div className="" style={{}}>
				<Tabs
					style={{ color: "whitesmoke", backgroundColor: "darkred" }}
					defaultActiveKey="chart"
				>
					<Tab eventKey="people" title="People">
						<Card
							className="p-5 shadow"
							style={{ border: "0px", backgroundColor: "whitesmoke" }}
						>
							<PeopleList data={this.state.data.enrolledPeople} />
						</Card>
					</Tab>
					<Tab eventKey="chart" title="Chart">
						<Card
							className="p-5 shadow"
							style={{ border: "0px", backgroundColor: "whitesmoke" }}
						>
							<Chart data={this.state.data.enrollmentCountByDayOfWeek} />
						</Card>
					</Tab>
				</Tabs>
			</div>
		);
	}
}
export default Report;
