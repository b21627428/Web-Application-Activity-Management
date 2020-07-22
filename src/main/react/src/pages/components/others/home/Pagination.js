import React from "react";

import { DropdownButton, Dropdown } from "react-bootstrap";

export const Pagination = ({ postPerPage, totalPosts, paginate, search }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li style={{ zIndex: 1 }} key={number} className="page-item">
						<a
							style={{
								backgroundColor: "#e3e3e3",
								color: "black",
							}}
							onClick={() => paginate(number)}
							href="!#"
							className="page-link"
						>
							{number}
						</a>
					</li>
				))}

				<DropdownButton
					style={{ position: "static" }}
					variant="secondary"
					className="ml-2"
					title="Order By"
				>
					<Dropdown.Item name="name" onClick={(e) => search(e)}>
						Name
					</Dropdown.Item>
					<Dropdown.Item name="startDate" onClick={(e) => search(e)}>
						Start Date
					</Dropdown.Item>
					<Dropdown.Item name="endDate" onClick={(e) => search(e)}>
						End Date
					</Dropdown.Item>
				</DropdownButton>
			</ul>
		</nav>
	);
};
