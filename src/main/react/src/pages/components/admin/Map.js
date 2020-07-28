import React from "react";
import {
	withGoogleMap,
	GoogleMap,
	withScriptjs,
	InfoWindow,
	Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import axios from "axios";
import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_GOOGLEKEY);
Geocode.enableDebug();
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: "",
			lat: "",
			lng: "",
		};
	}

	componentDidMount() {
		this.setState({
			address: this.props.center.address,
			lat: this.props.center.lat,
			lng: this.props.center.lng,
		});
	}

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
		event.preventDefault();
	};

	onMarkerDragEnd = (event) => {
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();
		Geocode.fromLatLng(newLat, newLng).then(
			(response) => {
				const address = response.results[0].formatted_address;
				this.setState({
					address: address ? address : "",

					lat: newLat,
					lng: newLng,
				});
			},
			(error) => {}
		);
	};

	onPlaceSelected = async (place) => {
		try {
			const address = place.formatted_address,
				latValue = place.geometry.location.lat(),
				lngValue = place.geometry.location.lng();
			this.setState({
				address: address ? address : "",
				lat: latValue,
				lng: lngValue,
			});
		} catch (error) {
			try {
				var location = place.name;
				const response = await axios.get(
					"https:/maps.googleapis.com/maps/api/geocode/json",
					{
						params: {
							address: location,
							key: process.env.REACT_APP_GOOGLEKEY,
						},
					}
				);
				var address = response.data.results[0].formatted_address;
				var { lat, lng } = response.data.results[0].geometry.location;
				this.setState({
					address,
					lat,
					lng,
				});
			} catch (error) {
				alert("Invalid address");
			}
		}
	};

	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap((props) => (
				<GoogleMap
					google={this.props.google}
					defaultZoom={this.props.zoom}
					defaultCenter={{
						lat: this.state.lat,
						lng: this.state.lng,
					}}
				>
					<InfoWindow
						position={{
							lat: this.state.lat + 0.0018,
							lng: this.state.lng,
						}}
					>
						<div>
							<span style={{ padding: 0, margin: 0 }}>
								{this.state.address}
							</span>
						</div>
					</InfoWindow>
					<Marker
						google={this.props.google}
						draggable={true}
						onDragEnd={this.onMarkerDragEnd}
						position={{
							lat: this.state.lat,
							lng: this.state.lng,
						}}
					/>
					<Marker />
					<Autocomplete
						style={{
							width: "100%",
							height: "40px",
							paddingLeft: "16px",
							marginTop: "2px",
							marginBottom: "100px",
							position: "relative",
							zIndex: 2,
						}}
						onPlaceSelected={this.onPlaceSelected}
						types={["(regions)"]}
						placeholder="Enter location"
					/>
				</GoogleMap>
			))
		);
		let map;
		if (this.props.center.lat !== undefined) {
			map = (
				<div className="m-5">
					<div>
						<div className="form-group">
							<label htmlFor="">Address</label>
							<input
								type="text"
								name="address"
								className="form-control"
								onChange={this.onChange}
								readOnly="readOnly"
								value={this.state.address}
							/>
						</div>
					</div>

					<AsyncMap
						googleMapURL={
							"https://maps.googleapis.com/maps/api/js?key=" +
							process.env.REACT_APP_GOOGLEKEY +
							"&libraries=places"
						}
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: this.props.height }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
			);
		} else {
			map = <div style={{ height: this.props.height }} />;
		}
		return map;
	}
}
export default Map;
