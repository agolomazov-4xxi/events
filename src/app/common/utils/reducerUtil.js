export const createReducer = (initialState, map) => {
	return (state = initialState, { type, payload }) => {
		const handler = map[type];
		return handler ? handler(state, payload) : state;
	};
};
