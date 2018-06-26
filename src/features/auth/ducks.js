import { createReducer } from '../../app/common/utils/reducerUtil';
import { closeModal } from '../modals/ducks';

const LOGIN_USER = 'LOGIN_USER';
const SIGN_OUT_USER = 'SIGN_OUT_USER';

export const login = creds => {
	return dispatch => {
		dispatch({
			type: LOGIN_USER,
			payload: {
				creds,
			},
		});
		dispatch(closeModal());
	};
};

export const logout = () => ({
	type: SIGN_OUT_USER,
});

const initialState = {
	authenticated: false,
	currentUser: {},
};

const loginUser = (state, payload) => ({
	...state,
	authenticated: true,
	currentUser: payload.creds.email,
});

const signOutUser = state => ({
	authenticated: false,
	currentUser: {},
});

export default createReducer(initialState, {
	[LOGIN_USER]: loginUser,
	[SIGN_OUT_USER]: signOutUser,
});
