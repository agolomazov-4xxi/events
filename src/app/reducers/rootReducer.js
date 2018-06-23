import { combineReducers } from 'redux';
import eventReducer from '../../features/event/ducks';

export default combineReducers({
	events: eventReducer,
});
