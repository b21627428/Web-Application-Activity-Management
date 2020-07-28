import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import MaterialButton from "@material-ui/core/Button";
import { Button } from "react-bootstrap";
import AddIcon from "@material-ui/icons/Add";

import CreateContainer from "./CreateContainer";
import Map from "../Map";

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
		height: "85%",
		backgroundColor: "#e3e3e3",
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

	const create = () => {};
	const body = (
		<div style={modalStyle} className={classes.paper}>
			<CreateContainer />

			<div>
				<Map
					google={props.google}
					center={{
						lat: 39.907,
						lng: 32.8,
						address: "",
					}}
					height="300px"
					zoom={15}
				/>
			</div>
			<div
				style={{
					backgroundColor: "darkgray",
					marginTop: "100px",
					paddingLeft: "50px",
				}}
			>
				<MaterialButton
					style={{
						backgroundColor: "darkred",
						color: "white",
						border: "0px",
						margin: "20px",
					}}
				>
					Create
				</MaterialButton>
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
