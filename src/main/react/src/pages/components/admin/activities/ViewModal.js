import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { Button, Row, Col } from "react-bootstrap";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: "75%",
		height: "720px",
		backgroundColor: "#e3e3e3",
	},
}));

export default function ViewModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div id="simple-modal-description">
				{/* <Row>
						<Col style={{ fontSize: "21px" }}>{props.data.name}</Col>
						<Col xs lg="1">
							<Button>Report</Button>
						</Col>
					</Row> */}
				<Row style={{ backgroundColor: "#e3e3e3" }}>
					<Col>{/* <input type="text" placeholder={props.data.name} /> */}</Col>
				</Row>
			</div>
		</div>
	);
	return (
		<div>
			<Button
				style={{
					color: "white",
					border: "0px",
				}}
				bg="dark"
				variant="dark"
				className="mr-auto"
				onClick={handleOpen}
			>
				VIEW
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
