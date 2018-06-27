import { createReducer } from '../../app/common/utils/reducerUtil';
import { toastr } from 'react-redux-toastr';
import { asyncStart, asyncFinish, asyncError } from '../async/ducks';
import { fetchSampleData } from '../../app/data/mockApi';

const CREATE_EVENT = 'CREATE_EVENT';
const UPDATE_EVENT = 'UPDATE_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';
const FETCH_EVENTS = 'FETCH_EVENTS';

const initialState = [];

export const createEvent = event => {
	return async dispatch => {
		try {
			dispatch({
				type: CREATE_EVENT,
				payload: {
					event,
				},
			});
			toastr.success('Create Event', 'New event was created');
		} catch (error) {
			toastr.error('Create Event', 'Error in process create new event');
		}
	};
};

export const updateEvent = event => {
	return dispatch => {
		try {
			dispatch({
				type: UPDATE_EVENT,
				payload: {
					event,
				},
			});
			toastr.success('Update event', 'Event was updated');
		} catch (error) {
			toastr.error('Oops', 'Something went wrong!');
		}
	};
};

export const deleteEvent = eventId => ({
	type: DELETE_EVENT,
	payload: {
		eventId,
	},
});

export const loadEvents = () => async dispatch => {
	try {
		dispatch(asyncStart());
		const events = await fetchSampleData();
		dispatch(fetchEvents(events));
		dispatch(asyncFinish());
	} catch (error) {
		dispatch(asyncError(error));
	}
};

export const fetchEvents = events => ({
	type: FETCH_EVENTS,
	payload: events,
});

const actionCreateEvent = (state, payload) => {
	return [...state, payload.event];
};

const actionUpdateEvent = (state, payload) => {
	return [...state.filter(event => event.id !== payload.event.id), payload.event];
};

const actionFetchEvents = (state, payload) => {
	return payload.events;
};

const actionDeleteEvent = (state, payload) => {
	return [...state.filter(event => event.id !== payload.eventId)];
};

export default createReducer(initialState, {
	[CREATE_EVENT]: actionCreateEvent,
	[UPDATE_EVENT]: actionUpdateEvent,
	[DELETE_EVENT]: actionDeleteEvent,
	[FETCH_EVENTS]: actionFetchEvents,
});
