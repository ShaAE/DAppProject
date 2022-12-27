import React, { Component } from "react";
import { create } from 'ipfs-http-client'

class Upload extends Component {
  constructor(props) {
    super(props);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  async onSubmitHandler(event) {    
    event.preventDefault();
            const form = event.target;
            const files = (form[3]).files;
            const file = files[0];
            const ipfs = create({url: "http://127.0.0.1:5001"});
            const result = await ipfs.add(file);
            this.props.uploadImage(result, parseInt(this.price.value), this.description.value);
            console.log(result)
            form.reset()
  }

  render() {
    return (
      <div id="content">
        {/* <form
          className="text-center"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target;
            const files = (form[0]).files;
            const file = files[0];
            // const ipfs = create();
            // await ipfs.add(file);
            this.props.uploadImage(file, parseInt(this.price.value), this.description.value);
            form.reset()
          }}
        >
          <input
            id="price"
            ref={(input) => {
              this.price = input;
            }}
            type="text"
            className="form-control"
            placeholder="Встановіть ціну на зображення"
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
          <fieldset>
            <legend>Завантажити файл</legend>
            <input type="file" onChange={this.props.captureFile} />
            <input
              className="btn btn-primary"
              type="submit"
              value="Підтвердити"
            />
          </fieldset>
        </form> */}
        <form onSubmit={this.onSubmitHandler}>
        <input
            id="price"
            ref={(input) => {
              this.price = input;
            }}
            type="text"
            className="form-control"
            placeholder="Встановіть ціну на зображення"
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
          <fieldset>
            <legend>Завантажити файл</legend>
            <input type="file" name="file" required/>
            <input
              className="btn btn-primary"
              type="submit"
              value="Підтвердити"
            />
          </fieldset>
          {/* <input type="file" name="file" required/>
          <button type="submit">Upload file</button> */}
        </form>
      </div>
    );
  }
}

export default Upload;
