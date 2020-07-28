import React from "react";
import { Form } from "react-bootstrap";

export const Input = (props) => {
	const { placeholder, error, name, onChange, type, label, value } = props;
	const className = error
		? "form-control is-invalid shadow p-4"
		: "form-control shadow p-4";
	return (
		<div className="form-group mb-4">
			<Form.Group>
				<Form.Label>{label}</Form.Label>
				<Form.Control
					onChange={onChange}
					name={name}
					type={type}
					placeholder={placeholder}
					className={className}
					value={value}
				/>
			</Form.Group>
		</div>
	);
};
