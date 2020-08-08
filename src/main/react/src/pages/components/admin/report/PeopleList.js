import React from "react";
import { Table } from "react-bootstrap";
class PeopleList extends React.Component {
	componentDidMount() {
		// const data = this.props.data;
		// data.map((person) => {
		// 	console.log(person);
		// });
	}

	render() {
		const { data } = this.props;
		return (
			<div>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Identification Number</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{data &&
							data.map((person, index) => (
								<tr key={index}>
									<td>{person.identificationNumber}</td>
									<td>{person.name}</td>
									<td>{person.email}</td>
									<td>{person.phone}</td>
									<td>{person.address}</td>
								</tr>
							))}
					</tbody>
				</Table>
			</div>
		);
	}
}
export default PeopleList;
