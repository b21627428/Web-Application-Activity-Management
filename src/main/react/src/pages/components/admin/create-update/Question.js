import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { deleteQuestion } from "../../../../api/apiCalls";
import swal from "sweetalert";

class Question extends React.Component {
	onDelete = async () => {
		try {
			const { id } = this.props.data;
			const params = {
				id,
			};
			await deleteQuestion(params);
			swal({
				title: "Good job!",
				text: "Succesfully deleted.",
				icon: "success",
			}).then(() => {
				this.props.getQuestion();
			});
		} catch (error) {
			swal({
				title: error.response.data.message,
				icon: "warning",
				dangerMode: true,
			});
		}
	};

	render() {
		return (
			<Card className="p-3 mx-1 my-2 shadow-sm">
				<Row>
					<Col>{this.props.data.text}</Col>
					<Col xs lg="2" className="mr-5">
						<Button
							style={{ backgroundColor: "darkred", border: "0px" }}
							onClick={this.onDelete}
						>
							Delete
						</Button>
					</Col>
				</Row>
			</Card>
		);
	}
}
export default Question;
