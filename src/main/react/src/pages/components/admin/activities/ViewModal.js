import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { Button, Row, Col } from "react-bootstrap";

import CreateUpdateForm from "../create-update/CreateUpdate";
import QuestionList from "../create-update/QuestionList";

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
		width: "80%",
		height: "82%",
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
			<Row className="m-0 pb-3 pt-3">
				<Col>
					<CreateUpdateForm handleClose={handleClose} data={props.data} />
				</Col>
				<Col xs lg="3" className="ml-5">
					<QuestionList id={props.data.id} />
				</Col>
			</Row>
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
			<Modal open={open} onClose={handleClose}>
				{body}
			</Modal>
		</div>
	);
}
