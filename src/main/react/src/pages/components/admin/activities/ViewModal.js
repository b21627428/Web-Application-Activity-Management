import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

import { Button } from "react-bootstrap";

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
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

export default function ViewModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const { data } = props;

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div className="p-3">
				<h2 id="simple-modal-title">{data.name}</h2>
				<div id="simple-modal-description">
					{/* <EnrollContainer
						handleClose={handleClose}
						data={data}
					/> */}
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
