import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import TodoList from "../TodoList/TodoList";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      loginComplete: false,
    };
  }

  setUsernameInput(value) {
    this.setState({
      username: value,
    });
  }

  setPasswordInput(value) {
    this.setState({
      password: value,
    });
  }

  login() {
    this.setState({
      loginComplete: true,
    });
  }

  render() {
    const loginComplete = this.state.loginComplete;
    if (loginComplete) {
      return <TodoList />;
    } else {
      return (
        <Container>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3rem",
              fontWeight: "bolder",
            }}
          >
            Login
          </Row>
          <hr />
          <Row>
            <Col md={{ span: 5, offset: 4 }}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Username"
                  size="lg"
                  value={this.state.username}
                  onChange={(username) =>
                    this.setUsernameInput(username.target.value)
                  }
                  aria-label="username"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Password"
                  size="lg"
                  type="password"
                  value={this.state.password}
                  onChange={(password) =>
                    this.setPasswordInput(password.target.value)
                  }
                  aria-label="password"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
              <InputGroup>
                <Button
                  variant="dark"
                  className="mt-2"
                  onClick={() => this.login()}
                  disabled={!this.state.username || !this.state.password}
                >
                  Login
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Login;
