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

// //  class AddNewToDo extends React.Component {
// // constructor()  {
// // super()
// // this.toDoInput = React.createRef();
// // }
// //   render() {
// {/* <div className="add-todo">
//           <form onSubmit={()=> {insert()}}>
//             <input type="text" ref={this.toDoInput} />
//             <span>(press enter to add)</span>
//           </form> */}
// //   }
// // }

const TodoElement = ({
  insertValue,
  complete,
  check,
  id,
  item,
  removeToDo
}) => {
  return (
    <li>
      {insertValue}
      <input
        type="checkbox"
        id={id}
        checked={complete}
        onClick={() => {
          check(item);
        }}
      />
      <label htmlFor={id} />
      <button
        onClick={() => {
          removeToDo(id);
        }}
      >
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
    const { check } = this.props;
    const { removeToDo } = this.props;

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
          removeToDo={removeToDo}
          item={value}
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
  return <div> {` ${props.length} items`}</div>;
};

TodoCount.propTypes = {
  length: PropTypes.number
};

class TodoApp extends React.Component {
  constructor() {
    super();
    this.toDoInput = React.createRef();
    this.state = {
      toDo: [
        { id: 0, title: "Learn React", complete: false },
        { id: 1, title: "Learn Redux", complete: false },
        { id: 2, title: "Learn Javascript", complete: true },
        { id: 3, title: "Learn Ave", complete: false },
        { id: 4, title: "Learn PHP", complete: true }
      ],
      lastId: 4
    };
  }

  check(newItem) {
    const toDo = this.state.toDo;
    const newTodo = toDo.map(item => {
      if (newItem.id === item.id) {
        // newItem.id = is the current item being clicked comparing against the items
        const oldComplete = item.complete;
        item.complete = !oldComplete;
      }
      return item;
    });
    this.setState({ toDo: newTodo }); // update state to be the new to do
  }

  delete(idToDelete) {
    const toDo = this.state.toDo.filter((item, index) => item.id != idToDelete); // using item.id as it will delete item of id as arrray can be re arranged
    this.setState({ toDo });
  }

  insert = event => {
    event.preventDefault();
    let toDoInput = this.toDoInput.current;
    // console.log(toDoInput);
    if (toDoInput.value) {
      const id = this.state.lastId + 1; // update id
      const newTodos = [
        ...this.state.toDo,
        { id, title: toDoInput.value, complete: false }
      ];
      this.setState({
        toDo: newTodos,
        lastId: id
      });
      toDoInput.value = ""; // reset input to be blank
    }
  };

  clear() {
    const toDo = this.state.toDo.filter((item, index) => !item.complete); // using item.id as it will delete item of id as arrray can be re arranged
    this.setState({ toDo }); // filtering existing state
    // returns true means keeping the completed
    // returns false get rid

    // understand inverted
  }

  hasCompleted() {
    // creating a function whereby array of items are completed / which will return true and
    // if not completed returns false
    let completed = this.state.toDo.filter((item, index) => item.complete);
    return completed.length > 0;
  }
  // creating a function whereby if none of the items are completed

  componentDidMount() {
    this.toDoInput.current.focus();
  }

  render() {
    return (
      <div className="todo-list">
        <TodoHeader />
        <div className="add-todo">
          <form onSubmit={this.insert.bind(this)}>
            <input type="text" ref={this.toDoInput} />
            <span>(press enter to add)</span>
          </form>
          {/* <AddNewToDo insert={this.addToDo}/> */}
        </div>
        <TodoList
          list={this.state.toDo}
          foo="bar"
          check={this.check.bind(this)}
          removeToDo={this.delete.bind(this)}
        />
        <div className="todo-admin">
          <TodoCount length={this.state.toDo.length} />
          {this.hasCompleted() && (
            <ClearButton removeCompleted={this.clear.bind(this)} />
          )}
        </div>
      </div>
    );
  }
}

// conditionally rendering = if the condition before returns false the component after it will not show
// not be rendered
//  let App = () => {

//   return <div>Placeholder text</div>

// };

// things to do = make ref work in separate todo component to make ref.current work

export default TodoApp;
