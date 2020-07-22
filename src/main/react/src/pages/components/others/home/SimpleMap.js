import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import RoomIcon from "@material-ui/icons/Room";

const AnyReactComponent = ({ text }) => (
	<div>
		<RoomIcon />
		{text}
	</div>
);

class SimpleMap extends Component {
	constructor() {
		super();
		this.state = {
			center: {
				lat: 59.95,
				lng: 30.33,
			},
			zoom: 16,
		};
	}
	componentDidMount() {
		let center = { ...this.state.center };
		const { lat, lng } = this.props.data;
		center = {
			lat,
			lng,
		};
		this.setState({ center });
	}

	render() {
		const { data } = this.props;
		return (
			// Important! Always set the container height explicitly
			<div style={{ width: "100%", height: "100%" }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API_KEY }}
					defaultCenter={this.state.center}
					defaultZoom={this.state.zoom}
				>
					<AnyReactComponent
						lat={data.lat}
						lng={data.lng}
						text={data.address}
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

export default SimpleMap;
