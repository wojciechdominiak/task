import React, { Component } from "react";
import Input from "./components/Input/Input";
import TaskList from "./components/Tasks/TaskList";
import "./App.scss";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      time: setInterval(
        () => this.setState({ time: new Date().toLocaleTimeString() }),
        1000
      ),
      done: [],
    };
  }

  delete = (indexp) => {
    const newarray = this.state.items.filter((item, index) => index !== indexp);
    this.setState({
      items: newarray,
    });
  };

  addToDone = (e) => {
    const donelist = this.state.done;
    donelist.push(e);
    this.setState({
      done: donelist,
    });

    if (this.state.items.length === 1) {
      alert("Good job!", "You clicked the button!", "success");
    }
  };

  deleteDone = (indexp) => {
    const newarray = this.state.done.filter((item, index) => index !== indexp);
    this.setState({
      done: newarray,
    });
  };

  loadToData = async () => {
    const response = await fetch(
      "https://task-e1453-default-rtdb.firebaseio.com/todo.json"
    );
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message || "Failed to fetch!");
    }
    const results = [];
    for (const id in responseData) {
      results.push({
        id: id,
        name: responseData[id].name,
      });
    }
    this.setState({
      items: results,
    });
  };

  componentDidMount() {
    this.loadToData();
  }

  render() {
    return (
      <div className="app">
        <div className="app__container">
          <h1 className="app__time">{this.state.time}</h1>
          <Input loadToData={this.loadToData} />
          <TaskList
            onClickDeleteHandler={this.delete}
            onClickDoneHandler={this.addToDone}
            type="todo"
            items={this.state.items}
          />
          <TaskList
            onClickDeleteDoneHandler={this.deleteDone}
            type="done"
            items={this.state.done}
          />
        </div>
      </div>
    );
  }
}
