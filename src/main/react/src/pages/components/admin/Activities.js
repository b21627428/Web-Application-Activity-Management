import React from "react";
import { listActivitiesForAdmin } from "../../../api/apiCalls";
import { Pagination } from "./activities/Pagination";
import ActivityCard from "./activities/ActivityCard";

import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
class Activities extends React.Component {
	constructor() {
		super();
		this.state = {
			size: 4,
			total: 0,
			data: [],
			search: "",
		};
	}

	clearAll = () => {
		const search = "";
		const sortBy = "startDate";
		const page = 0;
		this.getActivities(page, sortBy, search);
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
		const response = await listActivitiesForAdmin(params);
		this.setState({
			data: response.data.content,
			total: response.data.totalElements,
			page,
			sortBy,
			search,
		});
	};

	handleOrderByChange = async (event) => {
		let { name } = event.target;
		this.getActivities(this.state.page, name, this.state.search);
	};

	handlePageChange = (pageNumber) => {
		const page = pageNumber - 1;
		console.log(page);
		this.getActivities(page, this.state.sortBy, this.state.search);
	};

	onChange = (event) => {
		event.preventDefault();
		this.setState({ search: event.target.value });
	};
	onSearch = (event) => {
		event.preventDefault();
		if (this.state.search.trim() !== "")
			window.location.href = "/?search=" + this.state.search.trim();
		else window.alert("Please type something...");
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
			<div className="mt-3">
				{data.length !== 0 ? (
					<div
						style={{
							paddingLeft: "80px",
							paddingRigh: "80px",
							paddingTop: "20px",
						}}
					>
						<Pagination
							postPerPage={size}
							totalPosts={total}
							paginate={this.handlePageChange}
							orderBy={this.handleOrderByChange}
							ordered={this.state.sortBy}
							search={this.onSearch}
							change={this.onChange}
						/>

						<Row>
							{data.map((row, index) => (
								<Col key={index} className="col-3">
									<ActivityCard data={row} />
								</Col>
							))}
						</Row>
					</div>
				) : (
					<div>
						<Button
							variant="secondary"
							className="ml-5 mt-3 shadow"
							onClick={this.clearAll}
						>
							Go Back
						</Button>
						<Link to="/activities/create">
							<Button
								className="ml-2 mt-3 shadow"
								style={{ backgroundColor: "darkgreen", border: "0px" }}
							>
								<AddIcon className="mr-1" />
								Create
							</Button>
						</Link>
						<Card
							className="p-5 mx-5 my-3 shadow"
							style={{ backgroundColor: "darkgray" }}
						>
							Not found ...
						</Card>
					</div>
				)}
			</div>
		);
	}
}
export default Activities;
