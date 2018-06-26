import { createReducer } from '../../app/common/utils/reducerUtil';

const initialState = {
	loading: false,
};

const ASYNC_ACTION_START = 'ASYNC_ACTION_START';
const ASYNC_ACTION_FINISH = 'ASYNC_ACTION_FINISH';
const ASYNC_ACTION_ERROR = 'ASYNC_ACTION_ERROR';

export const asyncStart = () => ({
	type: ASYNC_ACTION_START,
});

export const asyncFinish = () => ({
	type: ASYNC_ACTION_FINISH,
});

export const asyncError = () => ({
	type: ASYNC_ACTION_ERROR,
});

const asyncActionStarted = state => ({
	...state,
	loading: true,
});

const asyncActionFinished = state => ({
	...state,
	loading: false,
});

const asyncActionError = state => ({
	...state,
	loading: false,
});

export default createReducer(initialState, {
	[ASYNC_ACTION_START]: asyncActionStarted,
	[ASYNC_ACTION_FINISH]: asyncActionFinished,
	[ASYNC_ACTION_ERROR]: asyncActionError,
});
