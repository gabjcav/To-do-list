import React, { useState, useEffect } from 'react'; 
import './App.css';
import Form from './components/Form';
import './styles/main.scss';
import TodoList from './components/TodoList';
import styled, { ThemeProvider } from "styled-components"; 
import { lightTheme,  darkTheme  } from "./themes";

const StyledApp = styled.div

function App() {
 
  //STATES
  const [inputText, setInputText] = useState(""); 
  const [todos, setTodos] = useState([]); 
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]); 
  const [theme, setTheme] = useState("light")
  //RUN ONCE ON APP START

  useEffect(() => {
    getLocalTodos();
  }, []); 

  //USE EFFECT
  useEffect(() => {
    filterHandler(); 
    saveLocalTodos(); 
  }, [todos, status])


  //DARK/LIGHT MODE

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light"); 
  }


  //UPDATE STATE (COMPLETED TODOS)
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      default:
        setFilteredTodos(todos); 
    }
  }

  //SAVE TO LOCAL STORAGE

  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos))
  }; 
  const getLocalTodos = () => {
    if(localStorage.getItem("todos") == null){
      localStorage.setItem("todos", JSON.stringify([]))
    } else {
     let todoLocal = JSON.parse(localStorage.getItem("todos"))
     setTodos(todoLocal); 
    }
  }


  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
    <div className="App">
      <header>
        <h1>Todolist</h1>
      </header>
      <Form 
        setStatus={setStatus} 
        inputText={inputText} 
        todos={todos} 
        setTodos={setTodos} 
        setInputText={setInputText} /> 
      <TodoList 
        setTodos={setTodos} 
        todos={todos} 
        filteredTodos={filteredTodos}/>
    </div>
    </ThemeProvider>
  );
} 

export default App;
