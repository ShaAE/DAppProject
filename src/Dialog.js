import React, { Component } from "react";

class Dialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showDialog: false,
    };
    this.showDialog = this.showDialog.bind(this);
  }

  showDialog() {
    this.setState({ showDialog: true });
  }

  render() {
    return (
      <div id="content" className="text-center">
        <div className="w-50 input-group mb-3">
          <span className="input-group-text">Введіть нову ціну</span>
          <input type="text" className="form-control" />
        </div>
        <div className="w-50 input-group mb-3">
          <span className="input-group-text">Введіть нову назву</span>
          <input type="text" className="form-control" />
        </div>
        <div className="w-50 input-group mb-3">
          <span className="input-group-text">Змінити статус</span>
          <input type="text" className="form-control" />
        </div>
      </div>
    );
  }
}

export default Dialog;
