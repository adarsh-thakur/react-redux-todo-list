import React, { Component } from "react";
import { connect } from "react-redux";
import Popup from "./Popup";
import CustomButton from "./CustomButton";
import { addFolder,selectFolder } from "./redux/actions/actions";
import './FolderHolder.css';
class FolderHolder extends Component {
  constructor(props) {
    super(props);
    this.showFolderPopUp = this.showFolderPopUp.bind(this);
    this.onFolderAdd = this.onFolderAdd.bind(this);
    this.onColorSelect = this.onColorSelect.bind(this);
    this.onFolderSelect = this.onFolderSelect.bind(this);

    this.state = {
      showPopUp: false,
      taskTitle: '',
      selectedColor: '',
      colors: [
        '#ff0000',
        '#00ff00',
        '#0000ff',
        '#ffff00',
        '#ff00ff',
      ]
    };
  }
  render() {
    return (
      <div
        className="column pt-m pb-m pl-m pr-m bg-gray1"
        style={{ height: 500, width: 300 }}
      >
        <div className="row-reverse ">
          <CustomButton
            className="bg-blue"
            title="+ Add Folder"
            handler={this.showFolderPopUp}
          />
        </div>
        <div className="fw-b fs-m">My Folders</div>
        <div className="">
          {this.props.folders.map(folder => {
            return (
              this.getFolderDiv(folder)
            )
          })}
        </div>
        {
          this.state.showPopUp && (
            <Popup
              title='Add Folder'
              onTaskSave={this.onFolderAdd}
              onCancel={this.showFolderPopUp}
            >
              <div className="column">
                <input
                  type="text"
                  className="TextField2"
                  onChange={(e) => {
                    this.taskTitleChanged(e);
                  }}
                />
                <div className="colorWrapper row">
                  {this.state.colors.map(color => {
                    return (
                      <div className={`${this.state.selectedColor == color ? 'buttonActive' : ''}`} style={{ width: 20, height: 20, backgroundColor: color, margin: 10 }} onClick={() => this.onColorSelect(color)} value={color}></div>
                    )
                  })}
                </div>
              </div>
            </Popup>
          )
        }
      </div>
    );
  }
  showFolderPopUp() {
    this.setState({
      showPopUp: !this.state.showPopUp,
      selectedColor: '',
      title: ''
    })
  }
  taskTitleChanged = (event) => {
    this.setState({
      taskTitle: event.target.value,
    });
  };
  onFolderAdd = () => {
    let folderToAdd = {
      title: this.state.taskTitle,
      color: this.state.selectedColor ? this.state.selectedColor : '#bbbbbb',
      tasks: []
    };
    this.props.addFolder(folderToAdd);
    this.showFolderPopUp();
  }
  getFolderDiv(folder) {
    return (
      <div className={`parent-width fs-r mt-l align-items-start row cursor-hand`} onClick={() => this.onFolderSelect(folder)}>
        <div className={`mr-r ${this.props.selectedFolder == folder ? 'folderSelected' : ''} folder-icon`} style={{ width: 30, height: 20, backgroundColor: folder.color }}></div>
        <div className={`fs-m ${this.props.selectedFolder == folder ? 'fw-b' : ''}`}>{`${folder.title} (${folder.tasks.length})`}</div>
      </div>
    )
  }
  onColorSelect(color) {
    this.setState({
      selectedColor: color
    })
  }
  onFolderSelect(folder) {
    this.props.selectFolder(folder);
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    folders: state.folders.folders,
    selectedFolder:state.folders.currentFolder
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    addFolder: folder => dispatch(addFolder(folder)),
    selectFolder: folder => dispatch(selectFolder(folder))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(FolderHolder);
