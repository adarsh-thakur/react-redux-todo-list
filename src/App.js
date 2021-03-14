import React, { Component } from 'react'
import NavBar from './NavBar';
import FolderHolder from './FolderHolder';
import TaskHolder from './TaskHolder';

export default class App extends Component {
  render() {
    return (
      <div className="main-holder bg-gray3 ">
        <NavBar />
        <div className="column parent-width parent-height align-items-center justify-content-center ">
          <div>
            <div
              className="row shadow-m border-radius-m border-m bg-white"
              style={{ overflow: "hidden" }}
            >
              <FolderHolder />
              <TaskHolder />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
