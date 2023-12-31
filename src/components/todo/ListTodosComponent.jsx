import { useEffect,useState } from "react";
import { retrieveAllTodosForUsername,deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";


function ListTodosComponent(){
    const today = new Date();
    const authContext = useAuth()
    const username = authContext.username

    const targetDate = new Date(today.getFullYear()+10,today.getMonth(),today.getDay())
 /*    const todos = [
        {id: 1, description: 'Learn AWS', done: false, targetDate:targetDate},
        {id: 2, description: 'Learn Full Stack Dev', done: false, targetDate:targetDate},
        {id: 3, description: 'Learn DevOps', done: false, targetDate:targetDate},
    ] */
    const [todos,setTodos] = useState([])
    const [message,setMessage] = useState(null)
    const navigate = useNavigate()

    useEffect(() => refreshTodos(),[])
    
    function refreshTodos(){
        retrieveAllTodosForUsername(username)
            .then(response => {
                setTodos(response.data)
            }
        )
        .catch(error => console.log(error))
    }

    function deleteTodo(id){
        deleteTodoApi(username,id)
            .then(
                () =>{
                    setMessage(`Delete of todo ${id} successful`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }

    function updateTodo (id){
        navigate(`/todos/${id}`)
    }

    function addNewTodo(){
        navigate(`/todos/-1`)
    }

    return(
        <div>
            <h1>List Todos</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo =>
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-warning" onClick={() => deleteTodo(todo.id)}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={() => updateTodo(todo.id)}>Update</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
            </div>
        </div>
    )
}
export default ListTodosComponent