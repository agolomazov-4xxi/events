import React from 'react';
import { Segment, List, Item, Label } from 'semantic-ui-react';

const isHost = false;

const EventDetailedSidebar = ({ attendees }) => {
	return (
		<div>
			<Segment textAlign="center" style={{ border: 'none' }} attached="top" secondary inverted color="teal">
				{attendees.length} {attendees.length && attendees.length === 1 ? 'Person' : 'People'} Going
			</Segment>
			<Segment attached>
				<List relaxed divided>
					{attendees &&
						attendees.map(attandee => (
							<Item style={{ position: 'relative' }} key={attandee.id}>
								{isHost && (
									<Label style={{ position: 'absolute' }} color="orange" ribbon="right">
										Host
									</Label>
								)}
								<Item.Image size="tiny" src={attandee.photoURL} />
								<Item.Content verticalAlign="middle">
									<Item.Header as="h3">
										<a>{attandee.name}</a>
									</Item.Header>
								</Item.Content>
							</Item>
						))}
				</List>
			</Segment>
		</div>
	);
};

export default EventDetailedSidebar;
