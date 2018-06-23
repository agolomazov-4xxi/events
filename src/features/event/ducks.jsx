import { createReducer } from '../../app/common/utils/reducerUtil';

export const CREATE_EVENT = 'CREATE_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

const initialState = [
	{
		id: '1',
		title: 'Trip to Tower of London',
		date: '2018-03-27',
		category: 'culture',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
		city: 'London, UK',
		venue: "Tower of London, St Katharine's & Wapping, London",
		hostedBy: 'Bob',
		hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
		attendees: [
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
		],
	},
	{
		id: '2',
		title: 'Trip to Punch and Judy Pub',
		date: '2018-03-28',
		category: 'drinks',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
		city: 'London, UK',
		venue: 'Punch & Judy, Henrietta Street, London, UK',
		hostedBy: 'Tom',
		hostPhotoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
		attendees: [
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
		],
	},
];

export const createEvent = event => ({
	type: CREATE_EVENT,
	payload: {
		event,
	},
});

export const updateEvent = event => ({
	type: UPDATE_EVENT,
	payload: {
		event,
	},
});

export const deleteEvent = eventId => ({
	type: DELETE_EVENT,
	payload: {
		eventId,
	},
});

const actionCreateEvent = (state, payload) => {
	return [...state, payload.event];
};

const actionUpdateEvent = (state, payload) => {
	return [...state.filter(event => event.id !== payload.event.id), payload.event];
};

const actionDeleteEvent = (state, payload) => {
	return [...state.filter(event => event.id !== payload.eventId)];
};

export default createReducer(initialState, {
	[CREATE_EVENT]: actionCreateEvent,
	[UPDATE_EVENT]: actionUpdateEvent,
	[DELETE_EVENT]: actionDeleteEvent,
});
