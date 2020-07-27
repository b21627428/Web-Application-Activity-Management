import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";

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
		width: "70%",
		height: "90%",
		backgroundColor: "#343A40",
		color: "white",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function CreateModal(props) {
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
			<div className="p-3">
				<div id="simple-modal-description">
					<CreateUpdateForm />
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<Button
				className="ml-2"
				style={{ backgroundColor: "darkgreen", border: "0px" }}
				onClick={handleOpen}
			>
				<AddIcon className="mr-1" />
				Create
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
