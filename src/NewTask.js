import React from 'react';
import PropTypes from 'prop-types';

class NewTask extends React.Component {
  state = {
    newTaskText: '',
    userOption: '',
    errors: {
      title: false,
      username: false,
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  checkEditing = (target) => {
    let titleField;
    let userField;

    switch (target) {
      case 'newTaskText': titleField = false; break;
      default:
      case 'userOption': userField = false;
    }

    this.setState(prevState => ({
      ...prevState,
      errors: {
        title: titleField,
        username: userField,
      },
    }));
  }

  getNewTask = (event) => {
    event.preventDefault();

    const { newTaskText, userOption } = this.state;
    const { users, addNewTask, listOfTodos } = this.props;

    if (
      /\W/.test(newTaskText.replace(/\s/g, ''))
      || newTaskText.length < 1
      || userOption.length < 1
    ) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          title: /\W/.test(prevState.newTaskText.replace(/\s/g, ''))
            || prevState.newTaskText.length < 1,
          username: prevState.userOption.length < 1,
        },
      }));

      return;
    }

    const newTask = {
      title: newTaskText,
      user: users.find(user => user.username === userOption),
      id: listOfTodos.length + 1,
    };

    this.setState({
      newTaskText: '',
      userOption: '',
      errors: {
        title: false,
        username: false,
      },
    });

    addNewTask(newTask);
  }

  render() {
    const { newTaskText, userOption, errors: { title, username } } = this.state;

    return (
      <form onSubmit={this.getNewTask} className="App__form">
        <input
          type="text"
          id="title"
          placeholder="Enter a task"
          name="newTaskText"
          value={newTaskText}
          onChange={this.handleChange}
          onFocus={() => this.checkEditing('newTaskText')}
          autoComplete="off"
        />

        <span className={title ? 'error' : 'hide-error'}>
          Please enter a new task
        </span>

        <select
          onChange={this.handleChange}
          onFocus={() => this.checkEditing('userOption')}
          value={userOption}
          name="userOption"
        >
          <option
            value=""
            selected
            disabled
            hidden
          >
            Choose a user
          </option>

          {this.props.users.map(user => (
            <option
              value={user.username}
              name="userOption"
              key={user.username}
            >
              {user.username}
            </option>
          ))}
        </select>

        <span className={username ? 'error' : 'hide-error'}>
          Please choose a user
        </span>

        <button
          type="submit"
        >
          Add new task
        </button>
      </form>
    );
  }
}

NewTask.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  listOfTodos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewTask: PropTypes.func.isRequired,
};

export default NewTask;
