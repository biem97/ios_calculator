import React, { Component } from "react";
import { evaluate } from "mathjs";
import AppButton from "./AppButton";
import AppDisplay from "./AppDisplay";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ac: "AC",
      display: "0",
      expression: Array(3).fill(null),
    };
  }

  handleClick = (ev) => {
    /*
    if (ev.target.value ==="+" || ev.target.value ==="-" || ev.target.value ==="x" || ev.target.value ==="/" ) {
        this.setState({
            previousValue: this.state.previousValue.concat(ev.target.value),
            display: evaluate(`${this.state.previousValue}`)
        })
    }
    else 
    */
    if (ev.target.value === "+/-"){
        this.setState({
            display: this.state.display[0] === "-" ? this.state.display.slice(1,) : "-".concat(this.state.display),
        })
    }
    else if (ev.target.value === "%") {
      this.setState({
        display: evaluate(`(${this.state.display})/100`),
      });
    } else {
      this.setState({
        display:
          this.state.display === "0"
            ? ev.target.value
            : this.state.display + ev.target.value,
        ac: "C",
      });
    }
  };

  allClear = (ev) => {
    this.setState({
      display: "0",
      ac: "AC",
    });
  };

  equal = (ev) => {
    // Regular expression
    let string = this.state.display.replace(/X/gi, "*");
    this.setState({
      display: evaluate(string),
    });
  };

  render() {
    return (
      <div className="body">
        <div className="row display">
          <AppDisplay display={this.state.display} />
        </div>
        <div className="row">
          <AppButton onClick={this.allClear} value={this.state.ac} type="function" />
          <AppButton onClick={this.handleClick} value={"+/-"} type="function" />
          <AppButton onClick={this.handleClick} value={"%"} type="function" />
          <AppButton onClick={this.handleClick} value={"/"} type="expression" />
        </div>
        <div className="row">
          <AppButton onClick={this.handleClick} value={7} type="number" />
          <AppButton onClick={this.handleClick} value={8} type="number" />
          <AppButton onClick={this.handleClick} value={9} type="number" />
          <AppButton onClick={this.handleClick} value={"x"} type="expression" />
        </div>
        <div className="row">
          <AppButton onClick={this.handleClick} value={4} type="number" />
          <AppButton onClick={this.handleClick} value={5} type="number" />
          <AppButton onClick={this.handleClick} value={6} type="number" />
          <AppButton onClick={this.handleClick} value={"-"} type="expression" />
        </div>
        <div className="row">
          <AppButton onClick={this.handleClick} value={1} type="number" />
          <AppButton onClick={this.handleClick} value={2} type="number" />
          <AppButton onClick={this.handleClick} value={3} type="number" />
          <AppButton onClick={this.handleClick} value={"+"} type="expression" />
        </div>
        <div className="row">
          <AppButton onClick={this.handleClick} value={"0"} type="number" />
          <AppButton onClick={this.handleClick} value={"."} type="number" />
          <AppButton onClick={this.equal} value={"="} type="expression" />
        </div>
      </div>
    );
  }
}
