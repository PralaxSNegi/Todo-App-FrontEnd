import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import moment from 'moment';

class ListTodosComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            todos: [],
            message : null

        }
    }

    componentDidMount(){
        
        this.refreshTodos()
        console.log(this.state)
    }

    refreshTodos = () => {

        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.retrieveAllTodos(username)
        .then( 
            response => {
                //console.log(response)
                this.setState({
                    todos: response.data
                })
            }
            )

    }

    deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUser()
        console.log('deleteTodoClicked')
        // console.log(id + ", " + username)
        TodoDataService.deleteTodos(username,id)
        .then( 
            reponse => {
                this.setState({message: `Deletion of Todo with id ${id} Successful.`})
                this.refreshTodos()
            }
            )
            
    }

    updateTodoClicked = (id) => {
        console.log('update ' +  id)
        this.props.history.push(`/todos/${id}`)
        // let username = AuthenticationService.getLoggedInUser()
        // console.log('deleteTodoClicked')
        // // console.log(id + ", " + username)
        // TodoDataService.deleteTodos(username,id)
        // .then( 
        //     reponse => {
        //         this.setState({message: `Delete of Todo ${id} Successful.`})
        //         this.refreshTodos()
        //     }
        //     )
            
    }

    addTodoClicked = () => {
        this.props.history.push(`/todos/-1`)
    } 



    render() {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
                                <th>Update</th>  
                                <th>Delete</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map(
                                    todo =>
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td><button className="btn btn-success" onClick={ () => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={ () => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )

                            }

                        </tbody>
                    </table>
                    <div>
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListTodosComponent