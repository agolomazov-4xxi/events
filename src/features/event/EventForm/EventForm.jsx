/* global google */
import React, { Component } from 'react';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import cuid from 'cuid';
import { composeValidators, isRequired, hasLengthGreaterThan, combineValidators } from 'revalidate';
import { reduxForm, Field } from 'redux-form';
import moment from 'moment';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { createEvent, updateEvent } from '../ducks';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';

const emptyEvent = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: '',
};

const category = [
	{ key: 'drinks', text: 'Drinks', value: 'drinks' },
	{ key: 'culture', text: 'Culture', value: 'culture' },
	{ key: 'film', text: 'Film', value: 'film' },
	{ key: 'food', text: 'Food', value: 'food' },
	{ key: 'music', text: 'Music', value: 'music' },
	{ key: 'travel', text: 'Travel', value: 'travel' },
];

const validate = combineValidators({
	title: isRequired({ message: 'The event title is required' }),
	category: isRequired({ message: 'Please, provide a category' }),
	description: composeValidators(
		isRequired({ message: 'Please enter a description' }),
		hasLengthGreaterThan(4)({ message: 'Description needs to be at least 5 characters' })
	)(),
	city: isRequired('city'),
	venue: isRequired('venue'),
	date: isRequired('date'),
});

class EventForm extends Component {
	state = {
		cityLatLng: {},
		venueLatLng: {},
		googleScriptLoaded: false,
	};

	handleCiTySelect = selectedCity => {
		geocodeByAddress(selectedCity)
			.then(results => getLatLng(results[0]))
			.then(latLng =>
				this.setState({
					cityLatLng: latLng,
				})
			)
			.then(() => {
				this.props.change('city', selectedCity);
			});
	};

	handleVenueSelect = selectedVenue => {
		geocodeByAddress(selectedVenue)
			.then(results => getLatLng(results[0]))
			.then(latLng =>
				this.setState({
					venueLatLng: latLng,
				})
			)
			.then(() => {
				this.props.change('venue', selectedVenue);
			});
	};

	handleScriptLoaded = () => {
		this.setState({
			googleScriptLoaded: true,
		});
	};

	onFormSubmit = values => {
		const { createEvent, updateEvent, initialValues } = this.props;
		values.date = moment(values.date).format();
		values.venueLatLng = this.state.venueLatLng;
		if (initialValues.id) {
			updateEvent(values);
			return this.goBack();
		} else {
			const newEvent = {
				...values,
				id: cuid(),
				hostPhotoURL: '/assets/user.png',
				attendees: [],
				hostedBy: 'Anton',
			};
			createEvent(newEvent);
			this.props.history.push(`/event/${newEvent.id}`);
		}
	};

	goBack = () => {
		this.props.history.goBack();
	};

	render() {
		const { handleSubmit, invalid, submitting, pristine, reset } = this.props;
		return (
			<Grid>
				<Script
					url="https://maps.googleapis.com/maps/api/js?key=AIzaSyD2xWqWnvsjmCFWy5CtHi68xPCBnD2bfog&libraries=places"
					onLoad={this.handleScriptLoaded}
				/>
				<Grid.Column width={10}>
					<Segment>
						<Header sub color="teal" content="Event Detailes" />
						<Form onSubmit={handleSubmit(this.onFormSubmit)}>
							<Field
								name="title"
								type="text"
								component={TextInput}
								autocomplete="off"
								placeholder="Give your event a name"
							/>
							<Field
								name="category"
								type="text"
								component={SelectInput}
								placeholder="What is your event about"
								options={category}
							/>
							<Field
								name="description"
								component={TextArea}
								placeholder="Tell us about your event"
								rows={3}
							/>
							<Header sub color="teal" content="Event Location Details" />
							<Field
								name="city"
								type="text"
								component={PlaceInput}
								options={{
									types: ['(cities)'],
								}}
								onSelect={this.handleCiTySelect}
								autocomplete="off"
								placeholder="Event city"
							/>
							{this.state.googleScriptLoaded && (
								<Field
									name="venue"
									type="text"
									component={PlaceInput}
									options={{
										location: new google.maps.LatLng(this.state.cityLatLng),
										radius: 1000,
										types: ['establishment'],
									}}
									placeholder="Event venue"
									onSelect={this.handleVenueSelect}
								/>
							)}
							<Field
								name="date"
								type="text"
								component={DateInput}
								dateFormat="DD.MM.YYYY HH:mm"
								timeFormat="HH:mm"
								showTimeSelect
								placeholder="Date and time event"
							/>
							<Button positive type="submit" disabled={invalid || submitting || pristine}>
								Submit
							</Button>
							<Button type="button" onClick={this.goBack} disabled={submitting}>
								Cancel
							</Button>
							<Button type="button" color="brown" onClick={reset}>
								Reset
							</Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const eventId = pathOr(null, ['match', 'params', 'id'], ownProps);

	let event = { ...emptyEvent };

	if (eventId && state.events.length) {
		event = state.events.find(event => event.id === eventId) || event;
	}

	return {
		initialValues: event,
	};
};

const mapDispatchToProps = {
	createEvent,
	updateEvent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm));
