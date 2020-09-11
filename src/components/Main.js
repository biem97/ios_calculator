import React, { Component } from "react";
import { evaluate } from "mathjs";
import AppButton from "./AppButton";
import AppDisplay from "./AppDisplay";
import {Container, Row, Col } from 'react-bootstrap';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ac: "AC",
      display: "0",
      expression: "",
    };
  }

  // Add comma into display
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  removeComma(x) {
    return x.toString().replace(/,/gi,"");
  }

  handleClick = (ev) => {

    if (ev.target.value ==="+" || ev.target.value ==="-" || ev.target.value ==="x" || ev.target.value ==="/" ) {
        this.setState({
          display:
            this.state.display === "0"
              ? "0"
              : this.state.display + ev.target.value,
          ac: this.state.display === "0" ? "AC" : "C",
        })
    }
    else if (ev.target.value === "+/-"){
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
        ac: this.state.display === "0" ? "AC" : "C",
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
      <>
      <Container className="body">
          <Row className="flex-row-reverse display">
            <AppDisplay display={this.state.display} />
          </Row>
          <Row >
            <Col><AppButton onClick={this.allClear} value={this.state.ac} type="outline-success" /></Col>
            <Col><AppButton onClick={this.handleClick} value={"+/-"} type="outline-success" /></Col>
            <Col><AppButton onClick={this.handleClick} value={"%"} type="outline-success" /></Col>
            <Col><AppButton onClick={this.handleClick} value={"/"} type="outline-warning" /></Col>
          </Row>
          <Row>
            <Col><AppButton onClick={this.handleClick} value={7} type="outline-secondary" /></Col>
            <Col><AppButton onClick={this.handleClick} value={8} type="outline-secondary" /></Col>
            <Col><AppButton onClick={this.handleClick} value={9} type="outline-secondary" /></Col>
            <Col><AppButton onClick={this.handleClick} value={"x"} type="outline-warning" /></Col>
          </Row>
          <Row>
            <Col><AppButton onClick={this.handleClick} value={4} type="outline-secondary" /></Col>
            <Col><AppButton onClick={this.handleClick} value={5} type="outline-secondary"/></Col>
            <Col><AppButton onClick={this.handleClick} value={6} type="outline-secondary"/></Col>
            <Col><AppButton onClick={this.handleClick} value={"-"} type="outline-warning"/></Col>
          </Row>
          <Row>
            <Col><AppButton onClick={this.handleClick} value={1} type="outline-secondary" /></Col>
            <Col><AppButton onClick={this.handleClick} value={2} type="outline-secondary" /></Col>
            <Col><AppButton onClick={this.handleClick} value={3} type="outline-secondary" /></Col>
            <Col><AppButton onClick={this.handleClick} value={"+"} type="outline-warning" /></Col>
          </Row>
          <Row>
            <Col xs={6}><AppButton onClick={this.handleClick} value={"0"} type="outline-secondary btn-zero" /></Col>
            <Col xs={3}><AppButton onClick={this.handleClick} value={"."} type="outline-secondary" /></Col>
            <Col xs={3}><AppButton onClick={this.equal} value={"="} type="outline-warning" /></Col>
          </Row>
      </Container>
      </>
    );
  }
}
