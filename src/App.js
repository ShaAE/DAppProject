import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from "./config";
import View from "./View";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  //При завантаженні сторінки потрібно перевірити чи є в користувача Metamask
  componentWillMount() {
    this.findMetamask();
  }

  //Під'єднати сторінку до Metamask і отримати дані смарт-контракту
  async connectAndLoadBlockchainData() {
    try {
      const currentProvider = this.detectCurrentProvider();
      if (currentProvider) {
        const currentProvider = this.detectCurrentProvider();
        await currentProvider.request({ method: "eth_requestAccounts" })
        const web3 = new Web3(currentProvider);
        this.setState({web3})
        const account = await web3.eth.getAccounts()
        this.setState({ account: account[0] });
        const balance = await web3.eth.getBalance(account[0]);
        this.setState({ balance: web3.utils.fromWei(balance) });
        const contract = new web3.eth.Contract(
          SMART_CONTRACT_ABI,
          SMART_CONTRACT_ADDRESS
        );
        this.setState({ contract });
        this.setState({ isConnected: true });
        const amountOfImages = await contract.methods.amountOfImages().call();
        this.setState({ amountOfImages });
        this.setState({ images: [] });
        for (let i = 1; i <= amountOfImages; i++) {
          const image = await contract.methods.allImages(i).call();
          this.setState({ images: [...this.state.images, image] });
        }
        this.setState({ loading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async findMetamask() {
    if (window.ethereum || window.web3) {
      this.setState({ hasMetamask: true });
      console.log("Metamask is found!");
    } else {
      console.log("Please install Metamask wallet in your browser.");
    }
  }

  detectCurrentProvider() {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
      console.log("Using EthereumJS!");
    } else if (window.web3) {
      provider = window.web3.currentProvider;
      console.log("Using Web3JS!");
    } else {
      console.log("Please install Metamask wallet in your browser.");
    }
    return provider;
  }

  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      hasMetamask: false,
      account: null,
      amountOfImages: 0,
      balance: 0,
      images: [],
      loading: true,
      contract: {},
    };
    this.uploadImage = this.uploadImage.bind(this);
    this.changeSoldStatus = this.changeSoldStatus.bind(this);
    this.changePrice = this.changePrice.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.buyImage = this.buyImage.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  uploadImage(cid, price, description) {
    this.setState({ loading: true });
    this.state.contract.methods
      .createTask(cid, price, description)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.updateData();
      });
  }

  changeSoldStatus(taskId) {
    this.setState({ loading: true });
    this.state.contract.methods
      .changeSoldStatus(taskId)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.updateData();
      });
  }

  async updateData() {
    const balance = await this.state.web3.eth.getBalance(account[0]);
    this.setState({ balance: this.state.utils.fromWei(balance) });
    const amountOfImages = await contract.methods.amountOfImages().call();
    this.setState({ amountOfImages });
    this.setState({ images: [] });
    for (let i = 1; i <= amountOfImages; i++) {
      const image = await contract.methods.allImages(i).call();
      this.setState({ images: [...this.state.images, image] });
    }
    this.setState({ loading: false });
  }

  onConnect() {
    try {
      this.connectAndLoadBlockchainData();
    } catch (err) {
      console.log(err.message);
    }
  }

  onDisconnect() {
    this.setState({ isConnected: false });
  }

  render() {
    return (
      <div>
        <div>
          {this.state.hasMetamask ? (
            <div>
              {!this.state.isConnected ? (
                <div className="text-center">
                  <h1 className="alert alert-success">
                    Metamask is found, please click Login, to connect page!
                  </h1>
                  <button className="btn btn-success" onClick={this.onConnect}>
                    Login
                  </button>
                </div>
              ) : (
                <div className="row">
                  <main
                    role="main"
                    className="col-lg-12 d-flex justify-content-center"
                  >
                    {this.state.loading ? (
                      <div id="loader" className="text-center">
                        Зачейкайте доки дані завантажаться із мережі...
                      </div>
                    ) : (
                      <div id="main">
                        <div className="container p-3 my-3 bg-primary text-white">
                          <h1>Інформація про користувача</h1>
                          <p>Адреса облікового запису: {this.state.account}</p>
                          <p>Баланс: {this.state.balance} Ether</p>
                        </div>
                        <View
                          images={this.state.images}
                          uploadImage={this.uploadImage}
                          changeSoldStatus={this.changeSoldStatus}
                        />
                      </div>
                    )}
                  </main>
                </div>
              )}
            </div>
          ) : (
            <h1 className="alert alert-danger">
              Розширення Metamask не знайдене, будь-ласка встановіть його! Щоб
              зробити це, перейдіть за{" "}
              <a href="https://metamask.io/download/">Посиланням</a>
            </h1>
          )}
        </div>
      </div>
    );
  }
}

export default App;
