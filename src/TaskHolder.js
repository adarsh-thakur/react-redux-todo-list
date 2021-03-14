import React, { Component } from "react";
import CustomButton from "./CustomButton";
import Popup from "./Popup";
import CheckBox from "./CheckBox";
import { connect } from "react-redux";
import { addTask, updateTask } from "./redux/actions/actions";
class TaskHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addButtonTitle: "+ Add Task",
      tasks: this.props.selectedFolder.tasks ? this.props.selectedFolder.tasks : [],
      taskTitle: '',
      needAddTaskPopup: false,
    };
  }
  render() {
    return (
      <div
        className="column pt-m pb-m pl-m pr-m"
        style={{ height: 500, width: 400 }}
      >
        <div className="row-reverse">
          <CustomButton
            className="bg-blue"
            title={this.state.addButtonTitle}
            handler={this.addTaskButtonClicked}
          />
        </div>
        <div className="fw-b fs-m">{`${this.props.selectedFolder.title ? this.props.selectedFolder.title + ' > ' : ''} Tasks`}</div>
        {this.renderAllTasks()}
        {this.state.needAddTaskPopup && (
          <Popup
            title='Add Task'
            onTaskSave={this.addTask}
            onCancel={() => this.changeVisibilityOfAddTaskPopup(false)}
          >
            <div className="column">
              <input
                type="text"
                className="TextField2"
                onChange={(e) => {
                  this.taskTitleChanged(e);
                }}
              />
            </div>
          </Popup>
        )}
      </div>
    );
  }

  getTaskObject(title) {
    return {
      title: title,
      selected: false,
    };
  }

  renderAllTasks() {
    return (
      <div>
        {this.props.selectedFolder.tasks && this.props.selectedFolder.tasks.map((obj, index) => {
          return this.getTaskRowDiv(obj, index);
        })}
      </div>
    );
  }

  addTask = () => {
    this.props.addTask(this.getTaskObject(this.state.taskTitle));
    this.changeVisibilityOfAddTaskPopup(false);
  };

  addTaskButtonClicked = () => {
    if (Object.keys(this.props.selectedFolder).length == 0) return;
    this.changeVisibilityOfAddTaskPopup(true);
  };

  changeVisibilityOfAddTaskPopup(visibility) {
    this.setState({ needAddTaskPopup: visibility });
  }

  getTaskRowDiv(task, index) {
    return (
      <div className="parent-width fs-r mt-l align-items-start row">
        <CheckBox
          selected={task.selected}
          handler={() => this.checkBoxClicked(index)}
        />
        <div className={task.selected ? "text-line-through text-gray" : ""}>
          {task.title}
        </div>
      </div>
    );
  }
  checkBoxClicked = (index) => {
    let task = this.props.selectedFolder.tasks[index];
    this.props.updateTask({ ...task, selected: !task.selected })
  };
  taskTitleChanged = (event) => {
    this.setState({
      taskTitle: event.target.value,
    });
  };
}
const mapStateToProps = (state, ownProps) => {
  return {
    selectedFolder: state.folders.currentFolder
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: task => dispatch(addTask(task)),
    updateTask: task => dispatch(updateTask(task))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskHolder);
