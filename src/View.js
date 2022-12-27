import React, { Component } from "react";

class View extends Component {
  render() {
    return (
      <div id="content" className="text-center">
        <ul id="imageList" className="list-ustyled">
          {this.props.images.map((image, key) => {
            return (
              <div className="imageContainer" key={key}>
                <img src={`http://localhost:8080/ipfs/${image.cid}`} />
                <p>Назва зображення: {image.description}</p>
                <p>Ціна: {image.price} Wei</p>
                <p>Адреса власника: {image.owner}</p>
                {/* <label>
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
                </label> */}
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default View;
