import React, { Component } from "react";

class View extends Component {
  render() {
    return (
      <div id="content" className="text-center">
        <ul id="imageList" className="list-ustyled">
          <h2>Images list</h2>
          {this.props.images.map((image, key) => {
            return (
              <div className="imageContainer" key={key}>
                <div class="container mt-3">
                  <h3><div class="badge bg-danger">Ціна: {image.price} Wei</div></h3>          
                  <h3><div class="badge bg-info">Назва зображення: {image.description}</div></h3>                  
                  <h3><div class="badge bg-success">Адреса власника: {image.owner}</div></h3>                
                </div>                
                <img
                  src={`http://localhost:8080/ipfs/${image.cid}`}
                  className="img-thumbnail"
                  style={{ maxWidth: "500px" }}
                />                
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default View;
