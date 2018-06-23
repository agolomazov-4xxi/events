import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
	render() {
		const { event, onDeleteEvent } = this.props;
		return (
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size="tiny" circular src={event.hostPhotoURL} />
							<Item.Content>
								<Item.Header as="a">{event.title}</Item.Header>
								<Item.Description>
									Hosted by <a>{event.hostedBy}</a>
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" /> {event.date} |
						<Icon name="marker" /> {event.venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{event.attendees &&
							event.attendees.map(attandee => (
								<EventListAttendee key={attandee.id} attandee={attandee} />
							))}
					</List>
				</Segment>
				<Segment clearing>
					<span>{event.description}</span>
					<Button color="red" floated="right" content="Delete" onClick={onDeleteEvent} />
					<Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
				</Segment>
			</Segment.Group>
		);
	}
}

export default EventListItem;
