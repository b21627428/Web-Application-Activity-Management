import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends React.Component {
	state = {
		showingInfoWindow: true,
		activeMarker: {},
	};

	componentDidMount = () => {
		this.setState({ showingInfoWindow: true });
	};

	onMarkerClick = (props, marker, e) =>
		this.setState({
			activeMarker: marker,
			showingInfoWindow: true,
		});

	onMapClicked = (props) => {
		if (this.state.showingInfoWindow) {
			this.setState({
				showingInfoWindow: false,
				activeMarker: null,
			});
		}
	};
	render() {
		return (
			<div>
				<Map
					google={this.props.google}
					initialCenter={{
						lat: this.props.location.lat,
						lng: this.props.location.lng,
						address: this.props.location.address,
					}}
					onClick={this.onMapClicked}
					zoom={16}
				>
					<Marker onClick={this.onMarkerClick} />
					<InfoWindow
						marker={this.state.activeMarker}
						visible={this.state.showingInfoWindow}
					>
						<div>
							<h4>{this.props.location.adress}</h4>
						</div>
					</InfoWindow>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: process.env.REACT_APP_KEY,
})(MapContainer);
