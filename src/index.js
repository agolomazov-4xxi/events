import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App.jsx';
import registerServiceWorker from './registerServiceWorker';

const rootEl = document.getElementById('root');

let render = () => {
	ReactDOM.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
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
