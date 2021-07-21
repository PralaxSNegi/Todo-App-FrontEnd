import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService.js';

class WelcomeComponent extends Component {

    constructor(props){
        super(props)

        // this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: '',
            value: null
        }
    }

    render() {
        return (
            <>
                <h1>Welcome</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. 
                    You can manage your todos <Link to="/todos">here</Link>
                </div>

                <div className="container">
                    Click here to get a customized welcome message.
                    <button className="btn btn-success" onClick={this.retrieveWelcomeMessage}>Get Welcome Message</button>
                </div>
                <div>{this.state.welcomeMessage} </div>
            </>

        );
    }

    retrieveWelcomeMessage = () => {
        // HelloWorldService.executeHelloWorldService()
        // .then( response => this.handleSuccessfulMessage(response) )
        // //.cath()

        // HelloWorldService.executeHelloWorldBeanService()
        // .then( response => this.handleSuccessfulMessage(response) )
        // //.cath()

        HelloWorldService.executeHelloWorldPathVarialbleService(this.props.match.params.name)
        .then( response => this.handleSuccessfulMessage(response) )
        .catch( error => this.handleError(error) )
    }

    handleSuccessfulMessage = (response) => {
        this.setState({value: 1, welcomeMessage: response.data.message})
        
    }

    handleError = (error) => {
        console.log(error.response)

        let errorMessage= ''

        if(error.message)
            errorMessage += error.message

        if(error.response && error.response.data){
            errorMessage += error.response.data.message
        }


        this.setState({welcomeMessage: errorMessage})
        
    }

}

export default WelcomeComponent