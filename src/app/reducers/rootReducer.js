import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import eventReducer from '../../features/event/ducks';
import modalReducer from '../../features/modals/ducks';
import authReducer from '../../features/auth/ducks';

export default combineReducers({
	events: eventReducer,
	form: formReducer,
	modals: modalReducer,
	auth: authReducer,
});
