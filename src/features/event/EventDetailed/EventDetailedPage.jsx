import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	const event = state.events.find(ev => ev.id === eventId);
	return {
		event,
	};
};

const EventDetailedPage = ({ event }) => {
	return (
		<Grid>
			<Grid.Column width={10}>
				<EventDetailedHeader event={event} />
				<EventDetailedInfo event={event} />
				<EventDetailedChat />
			</Grid.Column>
			<Grid.Column width={6}>
				{event.attendees && <EventDetailedSidebar attendees={event.attendees} />}
			</Grid.Column>
		</Grid>
	);
};

export default connect(mapStateToProps)(EventDetailedPage);
