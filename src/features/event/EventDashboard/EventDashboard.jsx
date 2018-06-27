import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteEvent } from '../ducks';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

class EventDashboard extends Component {
	handleDeleteEvent = eventId => () => {
		this.props.onDelete(eventId);
	};

	render() {
		const { events, loading } = this.props;
		if (loading) {
			return <LoadingComponent inverted />;
		}
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} deleteEvent={this.handleDeleteEvent} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	events: state.events,
	loading: state.async.loading,
});

const mapDispatchToProps = {
	onDelete: eventId => deleteEvent(eventId),
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventDashboard);
