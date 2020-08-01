import React from "react";

import { DropdownButton, Dropdown, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

import CheckIcon from "@material-ui/icons/Check";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";
export const Pagination = ({
	postPerPage,
	totalPosts,
	paginate,
	orderBy,
	ordered,
	change,
	search,
}) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li style={{ zIndex: 1 }} key={number} className="page-item mr-1">
						<Link
							to=""
							style={{
								backgroundColor: "#343A40",
								color: "#e3e3e3",
								fontSize: "16px",
							}}
							onClick={() => paginate(number)}
							className="page-link"
						>
							{number}
						</Link>
					</li>
				))}

				<DropdownButton
					style={{ position: "static" }}
					variant="secondary"
					className="ml-2"
					title="Order By"
				>
					<Dropdown.Item name="name" onClick={(e) => orderBy(e)}>
						Name {ordered === "name" && <CheckIcon className="ml-5" />}
					</Dropdown.Item>
					<Dropdown.Item name="startDate" onClick={(e) => orderBy(e)}>
						Start Date
						{ordered === "startDate" && <CheckIcon className="ml-5" />}
					</Dropdown.Item>
					<Dropdown.Item name="endDate" onClick={(e) => orderBy(e)}>
						End Date
						{ordered === "endDate" && <CheckIcon className="ml-5" />}
					</Dropdown.Item>
				</DropdownButton>
				<Link to="/activities/create">
					<Button
						className="ml-2 p-2"
						style={{ backgroundColor: "darkgreen", border: "0px" }}
					>
						<AddIcon className="mr-1" />
						Create
					</Button>
				</Link>
				<Form inline className="ml-auto mr-5">
					<FormControl
						type="text"
						placeholder="Search"
						onChange={(e) => change(e)}
					/>
					<span className="input-group-text" onClick={(e) => search(e)}>
						<SearchIcon />
					</span>
				</Form>
			</ul>
		</nav>
	);
};
