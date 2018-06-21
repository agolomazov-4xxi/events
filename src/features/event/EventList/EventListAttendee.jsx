import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';

class EventListAttendee extends Component {
	render() {
		const { photoURL, name } = this.props.attandee;
		return (
			<List.Item>
				<Image as="a" size="mini" circular src={photoURL} ttile={name} />
			</List.Item>
		);
	}
}

export default EventListAttendee;
