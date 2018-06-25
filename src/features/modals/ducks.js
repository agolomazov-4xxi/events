import { createReducer } from '../../app/common/utils/reducerUtil';

const MODAL_OPEN = 'MODAL_OPEN';
const MODAL_CLOSE = 'MODAL_CLOSE';

const initialState = null;

export const openModal = (modalType, modalProps) => ({
	type: MODAL_OPEN,
	payload: {
		modalType,
		modalProps,
	},
});

export const closeModal = () => ({
	type: MODAL_CLOSE,
});

const actionModalOpen = (state, { modalType, modalProps }) => ({
	modalType,
	modalProps,
});

const actionModalClose = state => null;

export default createReducer(initialState, {
	[MODAL_OPEN]: actionModalOpen,
	[MODAL_CLOSE]: actionModalClose,
});
