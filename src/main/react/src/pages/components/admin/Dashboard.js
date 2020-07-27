import React from "react";
import { Card } from "react-bootstrap";

class Dashboard extends React.Component {
	render() {
		return (
			<div>
				{" "}
				<Card
					className="p-5 mx-5 my-3 shadow"
					style={{ backgroundColor: "darkgray" }}
				>
					Dashboard ...
				</Card>
			</div>
		);
	}
}
export default Dashboard;
