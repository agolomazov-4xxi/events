import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import Navbar from '../../features/nav/NavBar/NavBar';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import HomePage from '../../features/home/HomePage';
import ModalManager from '../../features/modals/ModalManager';

class App extends Component {
	render() {
		return (
			<Fragment>
				<ModalManager />
				<Switch>
					<Route path="/" component={HomePage} exact />
				</Switch>
				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<Navbar />
							<Container className="main">
								<Switch>
									<Route path="/events" component={EventDashboard} />
									<Route path="/event/:id" component={EventDetailedPage} />
									<Route path="/manage/:id" component={EventForm} />
									<Route path="/people" component={PeopleDashboard} />
									<Route path="/profile/:id" component={UserDetailedPage} />
									<Route path="/settings" component={SettingsDashboard} />
									<Route path="/create-event" component={EventForm} />
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
