import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
	render() {
		const { events, onOpenEvent, deleteEvent } = this.props;
		return (
			<div>
				<h1>Event List</h1>
				{events.map(event => (
					<EventListItem
						key={event.id}
						event={event}
						onOpenEvent={() => onOpenEvent(event)}
						onDeleteEvent={deleteEvent(event.id)}
					/>
				))}
			</div>
		);
	}
}

export default EventList;