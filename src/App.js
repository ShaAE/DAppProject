import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import { SMART_CONTRACT_ABI, SMART_CONTRACT_ADDRESS } from "./config";
import TodoList from "./TodoList";
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  componentWillMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const currentProvider = this.detectCurrentProvider();
    await currentProvider.request({ method: "eth_requestAccounts" });
    const web3 = new Web3(currentProvider);
    const account = await web3.eth.getAccounts();
    this.setState({ account: account[0] });
    const contract = new web3.eth.Contract(
      SMART_CONTRACT_ABI,
      SMART_CONTRACT_ADDRESS
    );
    this.setState({ contract });
    const network = await web3.eth.net.getNetworkType();
    const taskCount = await contract.methods.taskCount().call();
    this.setState({ taskCount });
    this.setState({tasks: []})
    for (let i = 1; i <= taskCount; i++) {
      const task = await contract.methods.tasks(i).call();
      this.setState({ tasks: [...this.state.tasks, task] });
    }
    this.setState({ loading: false });
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
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      taskCount: 0,
      tasks: [],
      loading: true,
    };
    this.createTask = this.createTask.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  createTask(content) {
    this.setState({ loading: true });
    this.state.contract.methods
      .createTask(content)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.loadBlockchainData()
        // this.setState({ loading: false })
      });
  }

  toggleCompleted(taskId) {
    this.setState({ loading: true });
    this.state.contract.methods
      .toggleCompleted(taskId)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.loadBlockchainData()
        // this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
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
                <TodoList
                  tasks={this.state.tasks}
                  createTask={this.createTask}
                  toggleCompleted={this.toggleCompleted}
                />
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
