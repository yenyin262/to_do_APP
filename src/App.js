import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import PropTypes from "prop-types";

// header component
class TodoHeader extends React.Component {
  render() {
    return <h1>So Much To Do </h1>;
  }
}
// ADD TO DO  component
class Addtodo extends React.Component {
  render() {
    let enterFields = this.props.enterFields;

    return (
      <form>
        <textarea placeholder="feed the dog" onKeyPress={enterFields} />
        <div>press enter to add</div>
      </form>
    );
  }
}

// stateless functional component

// stateless functional component

// const TodoElement = (props) => { // props is the object
/* { props.insertValue} the non deconstruct method */

// deconstruct method
const TodoElement = ({ index, insertValue, complete, check, id,  item }) => {
  return (
    <li>
      {insertValue}
      <input type="checkbox" id={id} checked={complete} onClick={() => {check(item)}} />
      <label htmlFor={id} />
      <button>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

TodoElement.propTypes = {
  insertValue: PropTypes.string,
  complete: PropTypes.bool,
  id: PropTypes.number
};

const ClearButton = ({ removeCompleted }) => {
  return <button onClick={removeCompleted}>Clear completed</button>;
};
ClearButton.propTypes = {
  removeCompleted: PropTypes.func
};

class TodoList extends React.Component {
  render() {
    //console.log(this.props.foo);
    const newTodo = this.props.list; // props is a react key word
    const {check} = this.props;

    // const todo = ['Learn React', 'Learn Redux', 'Learn JavaScript', 'Learn Ave', 'Learn PHP'] simple array of string values,
    const todoElements = newTodo.map((value, index) => {
      return (
        <TodoElement
          key={index}
          index={index}
          foo="bar"
          insertValue={value.title}
          complete={value.complete}
          id={value.id}
          check={check}
        />
      ); // ie. foo = 'bar' {key:index} props.foo
    });

    return (
      <div className="todo-list">
        <ul>{todoElements}</ul>
      </div>
    );
  }
}

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      complete: PropTypes.bool
    })
  )
};

const TodoCount = props => {
  return <div> {` ${props.length}items`}</div>;
};

TodoCount.propTypes = {
  length: PropTypes.number
};

class TodoApp extends React.Component {
  constructor() {
    super();

    this.state = {
      newTodo: [

        { id: 0, title: "Learn React", complete: false },
        { id: 1, title: "Learn Redux", complete: false },
        { id: 2, title: "Learn Javascript", complete: true },
        { id: 3, title: "Learn Ave", complete: false },
        { id: 4, title: "Learn PHP", complete: true }
      ],
      lastId: 0
    };
  }
// _check(id) {

//   const toDo = this.state.newTodo;
//   toDo[id].complete = !toDo[id].complete;
//   this.setState({ toDo});
//  }
check(newItem) {
  const toDo = this.state.toDo;
 
  
  const newTodo = toDo.map((item) => {
    if (newItem.id === item.id) {
      const oldComplete = item.complete;
      item.complete = !oldComplete;
    }

    return item;
  });

  this.setState({ toDo: newTodo });
}

  render() {
    return (
      <div>
        
   
        <TodoHeader />
        <Addtodo />
        <TodoList list={this.state.newTodo} foo="bar" check={this.check.bind(this)} />
        <div className="todo-admin">
          <TodoCount length={this.state.newTodo.length} />
          <ClearButton removeCompleted={() => alert("hi")} />
        </div>
      </div>
    );
  }
}
//  let App = () => {

//   return <div>Placeholder text</div>

// };

export default TodoApp;
