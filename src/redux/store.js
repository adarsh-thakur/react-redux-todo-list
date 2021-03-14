import { createStore } from 'redux';
import rootReducer from './reducers';
const state = {
    folders: { folders: [], currentFolder: {} },
}
export default function configureStore(initialState = state) {
    return createStore(rootReducer, initialState);
}
