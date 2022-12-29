import React, { Component } from "react"
import Dialog from "./Dialog"

class View extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showDialog: false
    }
    this.showDialog = this.showDialog.bind(this)
  }

  showDialog() {
    this.setState({showDialog: true})
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
                  <h3><div className="badge bg-danger">Ціна: {image.price} Wei</div></h3>          
                  <h3><div className="badge bg-info">Назва зображення: {image.description}</div></h3>                  
                  <h3><div className="badge bg-success">Адреса власника: {image.owner}</div></h3>                
                </div>                
                <img onClick={this.showDialog}
                  src={`http://localhost:8080/ipfs/${image.cid}`}
                  className="img-thumbnail"
                  style={{ maxWidth: "500px" }}
                />
                {this.state.showDialog && <Dialog id={image.id} />}
                <hr/>
              </div>              
            );
          })}
        </ul>
      </div>
    );
  }
}

export default View;
