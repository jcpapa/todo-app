import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  ListGroup,
} from "react-bootstrap";
import Login from "../Login";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInput: "",
      comment: "",
      list: [],
      logout: false,
    };
  }

  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  updateCommentInput(value) {
    this.setState({
      comment: value,
    });
  }

  // Add item if user input in not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        // Add a random id which is used to delete
        id: Math.random(),

        // Add a user value to list
        value: this.state.userInput,
        comment: this.state.comment
      };

      // Update list
      const list = [...this.state.list];
      list.push(userInput);

      // reset state
      this.setState({
        list,
        userInput: "",
        comment: "",
      });
    }
  }

  // Function to delete item from list use id to delete
  deleteItem(key) {
    const list = [...this.state.list];

    // Filter values and leave value which we need to delete
    const updateList = list.filter((item) => item.id !== key);

    // Update list in state
    this.setState({
      list: updateList,
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt("Edit the todo:", todos[index].value);
    if (editedTodo !== null && editedTodo.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  editItemComment = (index) => {
    const todos = [...this.state.list];
    const editedTodoComment = prompt("Edit the todo comment:", todos[index].comment);
    if (editedTodoComment !== null && editedTodoComment.trim() !== "") {
      let updatedTodos = [...todos];
      updatedTodos[index].comment = editedTodoComment;
      this.setState({
        list: updatedTodos,
      });
    }
  };

  logout() {
    this.setState({
      logout: true,
    });
  }

  render() {
    if (this.state.logout) {
      return <Login />;
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
            <Button variant="light" onClick={() => this.logout()}>
              Logout
            </Button>
          </Row>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3rem",
              fontWeight: "bolder",
            }}
          >
            TODO LIST
          </Row>
          <hr />
          <Row>
            <Col md={{ span: 5, offset: 4 }}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="To do"
                  size="lg"
                  value={this.state.userInput}
                  onChange={(item) => this.updateInput(item.target.value)}
                  aria-label="add something"
                  aria-describedby="basic-addon2"
                />
                <FormControl
                  placeholder="Comment"
                  size="lg"
                  value={this.state.comment}
                  onChange={(item) => this.updateCommentInput(item.target.value)}
                  aria-label="add comment"
                  aria-describedby="basic-addon2"
                />
                <InputGroup>
                  <Button
                    variant="dark"
                    className="mt-2"
                    onClick={() => this.addItem()}
                    disabled={!this.state.userInput}
                  >
                    ADD
                  </Button>
                </InputGroup>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 4 }}>
              <ListGroup>
                {/* map over and print items */}
                {this.state.list.map((item, index) => {
                  return (
                    <div key={index}>
                      <ListGroup.Item
                        variant="dark"
                        action
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {item.value}
                        <br />
                        Comment: {item.comment ? item.comment : '-'}
                        <span>
                          <Button
                            style={{ marginRight: "10px" }}
                            variant="light"
                            onClick={() => this.deleteItem(item.id)}
                          >
                            Delete
                          </Button>
                          <Button
                            style={{ marginRight: "10px" }}
                            variant="light"
                            onClick={() => this.editItem(index)}
                          >
                            Edit
                          </Button>
                          <Button
                            style={{ marginRight: "10px" }}
                            variant="light"
                            onClick={() => this.editItemComment(index)}
                          >
                            Edit Comment
                          </Button>
                        </span>
                      </ListGroup.Item>
                    </div>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default TodoList;
