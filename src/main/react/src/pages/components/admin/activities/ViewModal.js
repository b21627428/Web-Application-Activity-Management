import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { Button, Row, Col } from "react-bootstrap";

import CreateUpdateForm from "./CreateUpdateForm";

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
		width: "90%",
		height: "90%",
		backgroundColor: "#343A40",
		color: "white",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
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
			<div className="p-3" style={{ height: "100%" }}>
				<div id="simple-modal-description">
					<Row>
						<Col style={{ fontSize: "21px" }}>{props.data.name}</Col>
						<Col xs lg="1">
							<Button>Report</Button>
						</Col>
					</Row>
					<Row style={{ backgroundColor: "#e3e3e3" }} className="mt-5">
						<Col>
							{/* <input type="text" placeholder={props.data.name} /> */}
							<CreateUpdateForm data={props.data} />
						</Col>
						<Col xs lg="3" style={{ color: "black" }}>
							Questions
						</Col>
					</Row>
				</div>
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
