import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalLookup = {
	LoginModal,
	RegisterModal,
};

const ModalManager = ({ currentModal }) => {
	let renderModal;

	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];

		renderModal = <ModalComponent {...modalProps} />;
	}

	return <Fragment>{renderModal}</Fragment>;
};

const mapStateToProps = state => ({
	currentModal: state.modals,
});

export default connect(mapStateToProps)(ModalManager);
