import axios from 'axios';

export const ADD_CHILD = 'ADD_CHILD';
export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const MOVE_ITEM = 'MOVE_ITEM';
export const INPUT_VALUE = 'INPUT_VALUE';
export const ADD_VALUE = 'ADD_VALUE';
export const LOAD_START = 'LOAD_START';
export const LOAD_END = 'LOAD_END';
export const LOAD_ERROR = 'LOAD_ERROR';
export const SAVE_START = 'SAVE_START';
export const SAVE_END = 'SAVE_END';
export const SAVE_ERROR = 'SAVE_ERROR';
export const LOG_INFO = 'LOG_INFO';
export const LOG_ERROR = 'LOG_ERROR';
export const CLEAR_FIELD_ERRORS = 'CLEAR_FIELD_ERRORS';
export const ON_NAVIGATE = 'ON_NAVIGATE';
export const SUBMIT_FIELD = 'SUBMIT_FIELD';
export const CANCEL_EDIT_FIELD = 'CANCEL_EDIT_FIELD';
export const EDIT_FIELD = 'EDIT_FIELD';

export const addChild = (node, childType) => ({
	type: ADD_CHILD,
	node: node,
	childType: childType
});
export const addItem = (node) => ({
	type: ADD_ITEM,
	node: node
});
export const deleteItem = (node, index) => ({
	type: DELETE_ITEM,
	node,
	index
});
export const moveItem = (node, source, target) => ({
	type: MOVE_ITEM,
	node,
	source,
	target
});
export const clearFieldErrors = () => ({
	type: CLEAR_FIELD_ERRORS
});
export const onNavigate = (previousRouterPath, newRouterPath) => ({
	type: ON_NAVIGATE,
	previous: previousRouterPath,
	current: newRouterPath
});

export const addChildAndNavigate = (node, childType, history) => {
	return (dispatch, getState) => {
		dispatch(addChild(node, childType));
		// change history state here
//		history.push(Cms.findNode());
	}
};

export const load = () => {
	return dispatch => {
		dispatch(loadStart());
		dispatch(logInfo('Loading model and data files'));
		Promise.all([axios.get(`/model.json`), axios.get(`/data.json`)]).then(values => {
			const model = values[0].data;
			const data = values[1].data;
			dispatch(loadEnd(model, data));
			dispatch(logInfo('Model and data files loaded from server'));
		}).catch(err => {
			dispatch(loadError());
			dispatch(logError('Error while loading JSON files: ' + err));
		});
	}
};
const loadStart = () => ({
	type: LOAD_START
});
const loadEnd = (model, data) => ({
	type: LOAD_END,
	model,
	data
});
const loadError = () => ({
	type: LOAD_ERROR
});
export const save = () => {
	return (dispatch, getState) => {
		dispatch(saveStart());
		dispatch(logInfo('Loading model and data files'));
		axios.post('/data.json', getState().main.data).then(() => {
			dispatch(saveEnd());
			dispatch(logInfo('JSON data file saved on disk'));
		}).catch(err => {
			dispatch(saveError());
			dispatch(logError('Error while saving JSON file: ' + err));
		});
	}
};
const saveStart = (message) => ({
	type: SAVE_START,
	message
});
const saveEnd = (message) => ({
	type: SAVE_END,
	message
});
const saveError = () => ({
	type: SAVE_ERROR
});
const logInfo = (message) => ({
	type: LOG_INFO,
	message
});
const logError = (message) => ({
	type: LOG_ERROR,
	message
});
export const inputValue = (node, field, event) => ({
	type: INPUT_VALUE,
	node,
	field,
	event
});
export const addValue = (node, field, value) => ({
	type: ADD_VALUE,
	node,
	field,
	value
});
export const editField = (node, index) => ({
	type: EDIT_FIELD,
	node,
	index
});
export const submitField = () => ({
	type: SUBMIT_FIELD
});
export const cancelEditField = () => ({
	type: CANCEL_EDIT_FIELD
});

