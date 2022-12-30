import React, { Component } from "react";
import Dialog from "./Dialog";

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
    };
    this.showDialog = this.showDialog.bind(this);
    this.hideDialog = this.hideDialog.bind(this);
  }

  showDialog() {
    this.setState({ showDialog: true });
  }

  hideDialog() {
    this.setState({ showDialog: false });
  }

  render() {
    return (
      <div id="content" className="text-center">
        <ul id="imageList" className="list-ustyled">
          <h2>Images list</h2>
          {this.props.images.map((image, key) => {
            return (
              <div className="imageContainer" key={key}>
                <div className="container mt-3">
                  <h3>
                    <div className="badge bg-info">Назва: {image.name}</div>
                  </h3>
                  <h3>
                    <div className="badge bg-info">
                      Ціна: {image.price} Wei
                    </div>
                  </h3>
                  <h3>
                    <div className="badge bg-info">
                      Опис зображення: {image.description}
                    </div>
                  </h3>                  
                  <h3>
                    {image.isItForSale ? (
                      <button className="btn btn-success">Придбати</button>
                    ) : (
                      <div className="badge bg-danger">Не продається</div>
                    )}
                  </h3>
                </div>
                <img
                  onLoad={this.hideDialog}
                  onClick={this.showDialog}
                  src={`http://localhost:8080/ipfs/${image.cid}`}
                  className="img-thumbnail"
                  style={{ maxWidth: "500px" }}
                />
                <h3>
                    <div className="badge bg-success">
                      Адреса власника: {image.owner}
                    </div>
                  </h3>
                {this.state.showDialog && (
                  <Dialog
                    changeSoldStatus={this.props.changeSoldStatus}
                    changePrice={this.props.changePrice}
                    changeDescription={this.props.changeDescription}
                    id={image.id}
                    description={image.description}
                    price={image.price}
                    isItForSale={image.isItForSale}
                  />
                )}
                <hr />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default View;
