import React, { Component } from "react";
import CustomButton from "./CustomButton";

class AddTaskPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskTitle: "",
    };
  }
  render() {
    return (
      <div className="transparent-background">
        <div
          className="bg-white shadow-s border-radius-s border-s popup-window column align-items-start"
          style={{ width: 300 }}
        >
          <div className="fs-m fw-b mb-m">{this.props.title}</div>
          {this.props.children}
          <div className="row-reverse mt-l">
            <CustomButton
              title="Save"
              className="bg-blue ml-r"
              handler={() => {
                this.props.onTaskSave();
              }}
            />
            <CustomButton
              title="Cancel"
              className="bg-gray3 text-black"
              handler={() => {
                this.props.onCancel();
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AddTaskPopup;
