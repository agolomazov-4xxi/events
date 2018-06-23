import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteEvent } from '../ducks';
import EventList from '../EventList/EventList';

class EventDashboard extends Component {
	handleDeleteEvent = eventId => () => {
		this.props.onDelete(eventId);
	};

	render() {
		const { events } = this.props;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} deleteEvent={this.handleDeleteEvent} />
				</Grid.Column>
				<Grid.Column width={6} />
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	events: state.events,
});

const mapDispatchToProps = {
	onDelete: eventId => deleteEvent(eventId),
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventDashboard);
