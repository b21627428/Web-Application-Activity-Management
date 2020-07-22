import React from "react";
import { Row, Col } from "react-bootstrap";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import HomeIcon from "@material-ui/icons/Home";

class Footer extends React.Component {
	render() {
		return (
			<div
				className="fixed-bottom"
				style={{
					left: 0,
					bottom: 0,
					width: "100%",
					height: "40px",
					backgroundColor: "#32303D",
					borderTop: "1px solid #49475C",
				}}
			>
				<Row className="p-2" style={{ color: "white", fontSize: "15px" }}>
					<Col style={{ textAlign: "left" }}>
						<button
							onClick={(event) => {
								window.location.href = "/";
							}}
							style={{
								color: "white",
								opacity: 0.6,
								backgroundColor: "#32303D",
								border: "none",
								outline: "none",
							}}
						>
							<HomeIcon className="mr-2" />
							Go to Home Page
						</button>
					</Col>
					<Col style={{ textAlign: "center", color: "white", opacity: 0.6 }}>
						Copyright © Tübitak Bilgem YTE 2020. All rights reserved.
					</Col>
					<Col style={{ textAlign: "right" }}>
						<button
							onClick={(event) => {
								window.scrollTo(0, 0);
							}}
							style={{
								color: "white",
								opacity: 0.6,
								backgroundColor: "#32303D",
								border: "none",
								outline: "none",
							}}
						>
							<ArrowUpwardIcon className="mr-2" />
							Go to Top of Page
						</button>
					</Col>
				</Row>
			</div>
		);
	}
}
export default Footer;
