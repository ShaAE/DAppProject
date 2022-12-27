import React, { Component } from "react";

class Upload extends Component {
  render() {
    return (
      <div id="content">
        <form
          className="text-center"
          onSubmit={(event) => {
            event.preventDefault();
            this.props.uploadImage(this.price.value, this.description.value);
          }}
        >
          <input
            id="price"
            ref={(input) => {
              this.price = input;
            }}
            type="text"
            className="form-control"
            placeholder="Вкажіть назву зображення"
            required
          />
          <input
            id="description"
            ref={(input) => {
              this.description = input;
            }}
            type="text"
            className="form-control"
            placeholder="Вкажіть назву зображення"
            required
          />
          <input
            className="btn btn-primary"
            type="submit"
            value="Підтвердити"
          />
        </form>        
      </div>
    );
  }
}

export default Upload;
