import React from "react";

import { listActivities } from "../../../../api/apiCalls";

import ActivityInfo from "./activity/ActivityInfo";

import { Pagination } from "./Pagination";

import { Card, Row, Col } from "react-bootstrap";

class ActivityList extends React.Component {
	constructor() {
		super();
		this.state = {
			size: 4,
			total: 0,
			data: [],
		};
	}

	handleOrderByChange = async (event) => {
		let { name } = event.target;
		this.getActivities(this.state.page, name, this.state.search);
	};

	handlePageChange = (pageNumber) => {
		const page = pageNumber - 1;
		console.log(page);
		this.getActivities(page, this.state.sortBy, this.state.search);
	};

	componentDidMount = () => {
		const search = this.getSearchParameters()["search"];
		const sortBy = "startDate";
		const page = 0;
		this.getActivities(page, sortBy, search !== undefined ? search : "");
	};
	getActivities = async (page, sortBy, search) => {
		const { size } = this.state;
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
			page,
			sortBy,
			search,
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
			<div className="mt-4">
				{data.length !== 0 ? (
					<div style={{ padding: "80px", paddingTop: "20px" }}>
						<Pagination
							postPerPage={size}
							totalPosts={total}
							paginate={this.handlePageChange}
							orderBy={this.handleOrderByChange}
							ordered={this.state.sortBy}
						/>
						<Row>
							{data.map((row) => (
								<Col className="col-3">
									<ActivityInfo data={row} />
								</Col>
							))}
						</Row>
					</div>
				) : (
					<Card
						className="p-5 m-5 shadow"
						style={{ backgroundColor: "#e3e3e3" }}
					>
						Not found ...
					</Card>
				)}
			</div>
		);
	}
}
export default ActivityList;
