import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// Stateful component that toggles instructions

class Instructions extends React.Component{
state={
      showInstructions: false
    };
  toggleInstructs = () => {
    if (this.state.showInstructions === true) {
      this.setState({
        showInstructions: false
      });} else {
        this.setState({
          showInstructions: true
        })
      }
  }
  render(){
    let instructStyle = {
      textAlign: 'center',
      margin: 'auto'
    }
    return(
      <div>
      {(this.state.showInstructions === true) ? <div style={instructStyle}>
    <div>Type your item in the list and click enter to add an item.</div>
    <div>Click an item to cross it off your list.</div>
    <div>Click the X to delete an item.</div>
    {/*<div>Drag an item to re-order it</div>*/} 
    <button onClick={this.toggleInstructs}>Hide instructions</button></div>
    : <div style={instructStyle}><button onClick={this.toggleInstructs}>Show instructions</button></div>}
    </div>
);
  }
}

// App title section with instructions child component

class Title extends React.Component{
  render(){
    let titleStyle = {
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center'
    };
    return(
    <div>
      <div style={titleStyle}>To-Do List</div>
      <Instructions />
      </div>)
  }
}

// form element for inputting new tasks
// Child to App component

class InputTask extends React.Component {
  state={
    task: ""
  }
  // submits task to app state AND prevents sending blank tasks
  handleSubmit = (event) => {
    event.preventDefault();
    if(this.state.task.length > 0){
    this.props.onSubmit(this.state.task)};
    this.setState({task: ""});
  }
  render(){
    let formStyle={
      textAlign: 'center',
    }
    return(
      <div style={formStyle}>
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        size="50" maxlength="45" 
        value={this.state.task} 
        onChange={event => this.setState({task: event.target.value})} 
        placeholder="Input new task (max 45 chars)" 
          />
        <button>Add</button>
        </form>
        </div>
    );
  }
}

//Task component with strikethrough on click and delete on X click
// Child to App component

class Task extends React.Component {
state = {
  notDone: true
}
toggleDone = () => {(this.state.notDone) ? this.setState({notDone: false}) : this.setState({notDone: true})}
  render(){
    return(
    <li onClick={this.toggleDone} className={this.state.notDone ? 'regStyle' : 'doneStyle'}>
    <div className={this.state.notDone ? 'taskStyle' : 'doneTask'}>
    {this.props.taskToDo}
    </div> 
    <div style={{textAlign: 'right'}}>
    <button style={{border: 'none', background: 'none', padding: '0', fontSize: '1rem'}} onClick={()=>this.props.removeTask(this.props.taskToDo)}>X</button>
    </div>
    </li>
   );
  }
}

//Task list to show all tasks in a list 
//Issue: if task is identical to previous task, will have 2 identical keys

class TaskList extends React.Component {
  render(){
  const items = this.props.tasks.map(i => 
  <Task key={i} taskToDo={[...i]} removeTask={this.props.removeTask} classToggle={this.classToggle}/>);
  return(
  <div>
    <ul>
        {items} 
    </ul>
	</div>
);
    }
  }

class App extends React.Component {
  state = {
    listOfTasks: [],
  }
  addTask = (newTask) => {
    this.setState(prevState => ({listOfTasks: [...prevState.listOfTasks, newTask]}))
  };
  removeTask = (task) => {this.setState({listOfTasks: this.state.listOfTasks.filter(e => e !== task.join(""))})
};
  render(){
    return(
    <div>
        <Title />
        <InputTask onSubmit={this.addTask} />
        <TaskList tasks={this.state.listOfTasks} removeTask={this.removeTask}/>
        </div>)
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
