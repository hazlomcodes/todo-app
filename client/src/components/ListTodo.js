import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = () => {


    const [todos, setTodos] = useState([]);

    //delete todo

    const deleteTodo = async id => {
        try {
            const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.todo_id !== id)) //filter checks if false and deletes without reload
        } catch (error) {
            console.error(error.message)
            
        }
    }


    const getTodos = async() => {

        try {

            const response = await fetch("http://localhost:5000/todos")
            const jsonData = await response.json()
            setTodos(jsonData);
            
        } catch (error) {
            console.log(error.message)
        }
    }
    
    //ensures only makes 1 request

    useEffect(() => {
        getTodos();
    }, []);

    
    
    
    return <Fragment>


<table className="table mt-5 text-center">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
       <tr>
        <td></td>
        <td></td>
        <td></td>
      </tr> 
      {todos.map(todo => (
        <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td>
                <EditTodo todo={todo}/>
                </td>
            <td>
                <button className= "btn btn-danger" 
                onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
            </td>
        </tr>
      ))}
      
      </tbody>
  </table>

        
        </Fragment>
}

export default ListTodos;