import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import eventReducer from '../../features/event/ducks';

export default combineReducers({
	events: eventReducer,
	form: formReducer,
});
