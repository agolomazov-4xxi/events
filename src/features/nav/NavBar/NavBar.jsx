import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/ducks';
import { logout } from '../../auth/ducks';

class NavBar extends Component {
	handleSignIn = () => {
		this.props.openModal('LoginModal');
	};

	handleRegister = () => {
		this.props.openModal('RegisterModal');
	};

	handleSignOut = () => {
		this.props.logout();
		this.props.history.push('/');
	};

	render() {
		const { authenticated, currentUser } = this.props.auth;
		return (
			<Menu inverted fixed="top">
				<Container>
					<Menu.Item as={Link} to="/" header>
						<img src="/assets/logo.png" alt="logo" />
						Re-vents
					</Menu.Item>
					<Menu.Item as={NavLink} to="/events" name="Events" />
					{authenticated && <Menu.Item as={NavLink} to="/people" name="People" />}
					{authenticated && (
						<Menu.Item>
							<Button
								as={Link}
								to="/create-event"
								floated="right"
								positive
								inverted
								content="Create Event"
							/>
						</Menu.Item>
					)}
					{authenticated ? (
						<SignedInMenu currentUser={currentUser} signOut={this.handleSignOut} />
					) : (
						<SignedOutMenu signIn={this.handleSignIn} register={this.handleRegister} />
					)}
				</Container>
			</Menu>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
});

const mapDispatchToProps = {
	openModal,
	logout,
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(NavBar)
);
