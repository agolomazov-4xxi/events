import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import eventReducer from '../../features/event/ducks';
import modalReducer from '../../features/modals/ducks';
import authReducer from '../../features/auth/ducks';
import asyncReducer from '../../features/async/ducks';

export default combineReducers({
	events: eventReducer,
	form: formReducer,
	modals: modalReducer,
	auth: authReducer,
	async: asyncReducer,
	toastr: toastrReducer,
});
