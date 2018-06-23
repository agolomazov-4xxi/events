import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { pathOr } from 'ramda';
import cuid from 'cuid';
import { createEvent, updateEvent } from '../ducks';

const emptyEvent = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: '',
};

class EventForm extends Component {
	state = {
		event: emptyEvent,
	};

	static getDerivedStateFromProps(props) {
		if (props.event) {
			return {
				event: props.event,
			};
		}
		return {
			event: emptyEvent,
		};
	}

	componentDidMount() {
		if (this.props.selectedEvent !== null) {
			this.setState({
				event: this.props.selectedEvent,
			});
		}
	}

	onFormSubmit = e => {
		e.preventDefault();
		const { event } = this.state;
		const { createEvent, updateEvent } = this.props;
		if (event.id) {
			updateEvent(event);
			return this.goBack();
		} else {
			const newEvent = {
				...event,
				id: cuid(),
				hostPhotoURL: '/assets/user.png',
				attendees: [],
			};
			createEvent(newEvent);
			this.props.history.push(`/event/${newEvent.id}`);
		}
	};

	onInputChange = e => {
		const { event } = this.state;
		event[e.target.name] = e.target.value;
		this.setState({
			event,
		});
	};

	goBack = () => {
		this.props.history.goBack();
	};

	render() {
		const { onCancel } = this.props;
		const { event } = this.state;
		return (
			<Segment>
				<Form onSubmit={this.onFormSubmit}>
					<Form.Field>
						<label>Event Title</label>
						<input
							value={event.title}
							placeholder="First Name"
							name="title"
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input
							type="date"
							placeholder="Event Date"
							name="date"
							value={event.date}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input
							placeholder="City event is taking place"
							name="city"
							value={event.city}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input
							placeholder="Enter the Venue of the event"
							name="venue"
							value={event.venue}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input
							placeholder="Enter the name of person hosting"
							name="hostedBy"
							value={event.hostedBy}
							onChange={this.onInputChange}
						/>
					</Form.Field>
					<Button positive type="submit">
						Submit
					</Button>
					<Button type="button" onClick={onCancel || this.goBack}>
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const eventId = pathOr(null, ['match', 'params', 'id'], ownProps);

	let event = {
		title: '',
		date: '',
		city: '',
		venue: '',
		hostedBy: '',
	};

	if (eventId && state.events.length) {
		event = state.events.find(event => event.id === eventId) || event;
	}

	return {
		event,
	};
};

const mapDispatchToProps = {
	createEvent,
	updateEvent,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventForm);
