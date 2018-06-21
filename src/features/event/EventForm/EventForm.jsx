import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import * as R from 'ramda';

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
		if (props.selectedEvent) {
			return {
				event: props.selectedEvent,
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
		const { createEvent, updateEvent, selectedEvent } = this.props;
		if (selectedEvent) {
			return updateEvent(event);
		}
		return createEvent(event);
	};

	onInputChange = e => {
		const { event } = this.state;
		event[e.target.name] = e.target.value;
		this.setState({
			event,
		});
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
					<Button type="button" onClick={onCancel}>
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;
