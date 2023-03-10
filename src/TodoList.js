import React, { Component } from "react";

class TodoList extends Component {
  render() {
    return (
      <div id="content">
        <form className="text-center"
          onSubmit={(event) => {
            event.preventDefault();
            this.props.createTask(this.task.value);
          }}
        >
          <input
            id="newTask"
            ref={(input) => {
              this.task = input;
            }}
            type="text"
            className="form-control"
            placeholder="Add task..."
            required
          /><input className="btn btn-primary" type="submit" value="Підтвердити" />
        </form>
        <ul id="taskList" className="list-ustyled">
          {this.props.tasks.map((task, key) => {
            return (
              <div className="taskTemplate" key={key}>
                <label>
                  <input
                    type="checkbox"
                    name={task.id}
                    defaultChecked={task.completed}
                    ref={(input) => {
                      this.checkbox = input;
                    }}
                    onClick={(event) => {
                      this.props.toggleCompleted(task.id);
                    }}
                  />
                  <span className="content">{task.content}</span>
                </label>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
