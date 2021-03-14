import { ADD_FOLDER, ADD_TASK, SELECT_FOLDER, UPDATE_TASK } from "./actionTypes";


export const addFolder = (folder) => {
    return {
        type: ADD_FOLDER,
        payload: {
            ...folder,
            id: Math.random()
        }
    };
};

export const selectFolder = (folder) => {
    return {
        type: SELECT_FOLDER,
        payload: folder
    };

}
export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: { ...task, id: Math.random() }
    }
}
export const updateTask = (task) => {
    return {
        type: UPDATE_TASK,
        payload: task
    }
}