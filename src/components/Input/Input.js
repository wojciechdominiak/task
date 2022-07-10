import React, { Component } from "react";
import Modal from "../UI/Modal";
import "./Input.scss";

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userinput: "",
      userInputIsValid: true,
    };
  }

  changingInput = (input) => {
    this.setState({
      userinput: input,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.addToList(this.state.userinput);
    }
  };

  addToList = async () => {
    if (this.state.userinput === "") {
      this.setState({
        userInputIsValid: false,
      });
    } else {
      const response = await fetch(
        "https://task-e1453-default-rtdb.firebaseio.com/todo.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.state.userinput,
          }),
        }
      );
      if (response.ok) {
        this.props.loadToData();
      } else {
        throw new Error("Could not save data!");
      }
      this.setState({
        userinput: "",
      });
    }
  };

  handleError = (e) => {
    this.setState({
      userInputIsValid: true,
    });
  };

  render() {
    return (
      <div className="userInput">
        {!this.state.userInputIsValid && (
          <Modal onHideCart={this.handleError}>
            <h3>Userinput cannot be empty!</h3>
            <button className="confirm" onClick={this.handleError}>
              OK
            </button>
          </Modal>
        )}
        <input
          className="userInput__input"
          onKeyPress={this.handleKeyPress}
          placeholder="ENTER TASK"
          onChange={(e) => this.changingInput(e.target.value)}
          value={this.state.userinput}
          type="text"
        />
        <button
          className="userInput__addbutton"
          onClick={() => this.addToList(this.state.userinput)}
        >
          ADD
        </button>
      </div>
    );
  }
}
