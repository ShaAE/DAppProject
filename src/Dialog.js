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
        <div className="w-75 input-group mb-3">
          <span className="input-group-text">Введіть нову ціну</span>
          <input
            id="price"
            placeholder={this.props.price}
            type="text"
            className="form-control"
            ref={(input) => {
              this.price = input;
            }}
          />
          <input
            type="button"            
            className="btn btn-success"
            value="Підтвердити"
            onClick={(event) => {              
              this.props.changePrice(this.props.id, parseInt(this.price.value));
            }}
          />
        </div>
        <div className="w-75 input-group mb-3">
          <span className="input-group-text">Введіть нову ціну</span>
          <input
            id="description"
            placeholder={this.props.description}
            type="text"
            className="form-control"
            ref={(input) => {
              this.description = input;
            }}
          />
          <input
            type="button"            
            className="btn btn-success"
            value="Підтвердити"
            onClick={(event) => {              
              this.props.changeDescription(this.props.id, this.description.value);
            }}
          />
        </div>
        <div className="w-50 input-group mb-3">
          <span className="input-group-text">
            Для того, щоб заборонити/дозволити продаж, встановіть перемикач у
            відповідне положення
          </span>
          <input
            className="m-3"
            type="checkbox"
            name={this.props.id}
            defaultChecked={this.props.isItForSale}
            ref={(input) => {
              this.checkbox = input;
            }}
            onClick={(event) => {
              this.props.changeSoldStatus(this.props.id);
            }}
          />
        </div>
      </div>
    );
  }
}

export default Dialog;
