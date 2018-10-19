import React, { Component } from "react";
import { Router, Link } from "react-router-dom";
import axios from "axios";

class Jokes extends Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <div>
        <h2>
          Can't see any Dad Jokes? Sign up <Link to="/signup">here!</Link>
        </h2>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>
              <p>{joke.setup}</p>
              <p>{joke.punchline}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };
    axios
      .get("http://localhost:3300/api/jokes", reqOptions)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error("Axios Error:", err);
      });
  }
}

export default Jokes;
