import axios from "axios"
import { API_URL, JPA_API_URL } from '../../Constants.js' 

class TodoDataService{

    retrieveAllTodos(name){
        console.log('retrieveAllTodos executed')
        return axios.get(`${JPA_API_URL}/users/${name}/todos`)
        
    }

    retrieveTodos(name, id){
        console.log('retrieveAllTodos executed')
        return axios.get(`${JPA_API_URL}/users/${name}/todos/${id}`)
        
    }

    deleteTodos(name,id){
        console.log('retrieveAllTodos executed')
        return axios.delete(`${JPA_API_URL}/users/${name}/todos/${id}`)
        
    }

    updateTodos(name,id, todo){
        console.log('retrieveAllTodos executed')
        return axios.put(`${JPA_API_URL}/users/${name}/todos/${id}`, todo)
        
    }

    createTodos(name, todo){
        console.log('retrieveAllTodos executed')
        return axios.post(`${JPA_API_URL}/users/${name}/todos`, todo)
        
    }
}

export default new TodoDataService()
