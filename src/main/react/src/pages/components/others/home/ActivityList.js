import React from "react";

import { listActivities } from "../../../../api/apiCalls";

import ActivityInfo from "./ActivityInfo";

import { Pagination } from "./Pagination";

import { Tabs, Tab, Card } from "react-bootstrap";

class ActivityList extends React.Component {
	constructor() {
		super();
		this.state = {
			search: "",
			page: 0,
			size: 5,
			total: 0,
			sortBy: "name",
			data: [],
		};
	}

	handleSearchChange = async (event) => {
		let { name } = event.target;
		await this.setState({ sortBy: name, page: 0 });
		this.getActivities();
	};

	handlePageChange = async (pageNumber) => {
		const page = pageNumber - 1;
		await this.setState({ page });
		this.getActivities();
	};

	componentDidMount = async (event) => {
		if (this.getSearchParameters()["search"])
			await this.setState({ search: this.getSearchParameters()["search"] });
		await this.getActivities();
	};
	getActivities = async (event) => {
		const { search, page, size, sortBy } = this.state;
		const params = {
			search,
			page,
			size,
			sortBy,
		};
		const response = await listActivities(params);
		this.setState({
			data: response.data.content,
			total: response.data.totalElements,
		});
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
		const { data, total, size } = this.state;
		return (
			<div className="ml-5">
				{data.length !== 0 ? (
					<div>
						<div>
							<Pagination
								postPerPage={size}
								totalPosts={total}
								paginate={this.handlePageChange}
								search={this.handleSearchChange}
							/>
						</div>
						<div>
							{data.map((row, index) => (
								<span
									style={{
										width: "350px",
										height: "auto",
										display: "inline-block",
									}}
									key={row.activityId}
								>
									<ActivityInfo data={row} index={index} />
								</span>
							))}
						</div>
					</div>
				) : (
					<Tabs defaultActiveKey="notFound" id="uncontrolled-tab-example">
						<Tab eventKey="notFound" className="m-5">
							<Card
								className="p-5 shadow"
								style={{ backgroundColor: "#e3e3e3" }}
							>
								Not found ...
							</Card>
						</Tab>
					</Tabs>
				)}
			</div>
		);
	}
}
export default ActivityList;
