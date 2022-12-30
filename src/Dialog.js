import React, { Component } from "react";

class Dialog extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   showDialog: false,
    // };
    // this.showDialog = this.showDialog.bind(this);
  }

  showDialog() {
    this.setState({ showDialog: true });
  }

  render() {
    return (
      <div id="content" className="text-center">        
        <div className="w-50 input-group mb-3">
          <span className="input-group-text">Введіть нову ціну</span>
          <input
            value={this.props.price}
            type="text"
            className="form-control"
          />
        </div>
        <div className="w-50 input-group mb-3">
          <span className="input-group-text">Введіть нову назву</span>
          <input
            value={this.props.description}
            type="text"
            className="form-control"
          />
        </div>
        <div className="w-50 input-group mb-3">
          <span className="input-group-text">Для того, щоб заборонити/дозволити продаж, встановіть перемикач у відповідне положення</span>
          <input
          className="m-3"
            type="checkbox"
            name={this.props.id}
            defaultChecked={this.props.isItForSale}
            ref={(input) => {
              this.checkbox = input;
            }}
            // onClick={(event) => {
            //   this.props.toggleCompleted(this.props.id);
            // }}
          />
        </div>
      </div>
    );
  }
}

export default Dialog;
