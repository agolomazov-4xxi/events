import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './app/common/utils/ScrollToTop';
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App.jsx';
import { loadEvents } from './features/event/ducks';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');
const store = configureStore();

store.dispatch(loadEvents());

let render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop>
					<App />
				</ScrollToTop>
			</BrowserRouter>
		</Provider>,
		rootEl
	);
};

if (module.hot) {
	module.hot.accept('./app/layout/App.jsx', () => {
		setTimeout(render);
	});
}

render();
registerServiceWorker();
