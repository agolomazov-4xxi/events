import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/common/form/TextInput';
import { login } from '../ducks';

const LoginForm = ({ login, handleSubmit }) => {
	return (
		<Form error size="large" onSubmit={handleSubmit(login)}>
			<Segment>
				<Field name="email" component={TextInput} type="text" placeholder="Email Address" />
				<Field name="password" component={TextInput} type="password" placeholder="password" />
				<Button fluid size="large" color="teal">
					Login
				</Button>
			</Segment>
		</Form>
	);
};

const mapDispatchToProps = {
	login,
};

export default connect(
	null,
	mapDispatchToProps
)(reduxForm({ form: 'loginForm', enableReinitialize: true })(LoginForm));
