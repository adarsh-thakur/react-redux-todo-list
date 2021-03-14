import * as actionTypes from '../actions/actionTypes';
export default (state = { folders: [], currentFolder: {} }, action) => {
    switch (action.type) {
        case actionTypes.ADD_FOLDER:
            return {
                ...state,
                folders: [...state.folders, action.payload],
                currentFolder:action.payload,
            }
        case actionTypes.SELECT_FOLDER:
            return {
                ...state,
                currentFolder: action.payload
            }
        case actionTypes.ADD_TASK:
            let folder = state.folders.find(folder => folder.id == state.currentFolder.id);
            folder = { ...folder, tasks: [...folder.tasks, action.payload] };
            return {
                ...state,
                folders: state.folders.map(item => item.id == folder.id ? folder : item),
                currentFolder: folder
            }
        case actionTypes.UPDATE_TASK:
            let updatedFolder = state.folders.find(folder => folder.id == state.currentFolder.id);
            updatedFolder = { ...updatedFolder, tasks: updatedFolder.tasks.map(task => task.id == action.payload.id ? action.payload : task) };
            return {
                ...state,
                folders: state.folders.map(item => item.id == updatedFolder.id ? updatedFolder : item),
                currentFolder: updatedFolder
            }
        default:
            return state;
    }
}