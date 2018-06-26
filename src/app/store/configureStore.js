import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';

const configureStore = preloadedState => {
	const middlewares = [thunk];
	const middlewareEnhancer = applyMiddleware(...middlewares);

	const storeEnhancers = [middlewareEnhancer];

	const composedEnhancer = composeWithDevTools(compose(...storeEnhancers));
	const store = createStore(rootReducer, preloadedState, composedEnhancer);

	if (process.env.NODE_ENV !== 'production') {
		if (module.hot) {
			module.hot.accept('../reducers/rootReducer', () => {
				const newReducer = require('../reducers/rootReducer').default;
				store.replaceReducer(newReducer);
			});
		}
	}

	return store;
};

export default configureStore;
