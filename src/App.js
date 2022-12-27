import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from "./config";
import TodoList from "./TodoList";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  //При завантаженні сторінки потрібно перевірити чи є в користувача Metamask
  componentWillMount() {
    this.findMetamask();
  }

  //Під'єднати сторінку до Metamask і отримати дані смарт-контракту
  async loadBlockchainData() {
    try {
      const currentProvider = this.detectCurrentProvider();
      if (currentProvider) {
        const currentProvider = this.detectCurrentProvider();
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const account = await web3.eth.getAccounts();
        this.setState({ account: account[0] });
        const balance = await web3.eth.getBalance(account[0]);
        this.setState({ balance: web3.utils.fromWei(balance) });
        const contract = new web3.eth.Contract(
          SMART_CONTRACT_ABI,
          SMART_CONTRACT_ADDRESS
        );
        this.setState({ contract });
        this.setState({ isConnected: true });
        const taskCount = await contract.methods.taskCount().call();
        this.setState({ taskCount });
        this.setState({ tasks: [] });
        for (let i = 1; i <= taskCount; i++) {
          const task = await contract.methods.tasks(i).call();
          this.setState({ tasks: [...this.state.tasks, task] });
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
      hasMetamask: false,
      account: "",
      taskCount: 0,
      balance: 0,
      tasks: [],
      loading: true,
      contract: {},
    };
    this.createTask = this.createTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  createTask(content) {
    this.setState({ loading: true });
    this.state.contract.methods
      .createTask(content)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.updateData();
      });
  }

  toggleCompleted(taskId) {
    this.setState({ loading: true });
    this.state.contract.methods
      .toggleCompleted(taskId)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.updateData();
      });
  }

  async updateData() {
    const taskCount = await this.state.contract.methods.taskCount().call();
    this.setState({ taskCount });
    this.setState({ tasks: [] });
    for (let i = 1; i <= taskCount; i++) {
      const task = await this.state.contract.methods.tasks(i).call();
      this.setState({ tasks: [...this.state.tasks, task] });
    }
    this.setState({ loading: false });
  }

  onConnect() {
    try {
      this.loadBlockchainData();
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
                        Loading...
                      </div>
                    ) : (
                      <div id="main">
                        <div className="container p-3 my-3 bg-primary text-white">
                          <h1>Інформація про користувача</h1>
                          <p>Адреса облікового запису: {this.state.account}</p>
                          <p>Баланс: {this.state.balance} Ether</p>
                        </div>
                        <TodoList
                          tasks={this.state.tasks}
                          createTask={this.createTask}
                          toggleCompleted={this.toggleCompleted}
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
