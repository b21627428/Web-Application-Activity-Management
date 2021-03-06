import React from "react";

import { DropdownButton, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import CheckIcon from "@material-ui/icons/Check";

export const Pagination = ({
	postPerPage,
	totalPosts,
	paginate,
	orderBy,
	ordered,
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
								backgroundColor: "#e3e3e3",
								color: "black",
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
			</ul>
		</nav>
	);
};
