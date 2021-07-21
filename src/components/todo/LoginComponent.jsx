import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'Username',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        // this.handleUserNameChange = this.handleUserNameChange.bind(this)
        // this.handlePasswordChange = this.handlePasswordChange.bind(this)
        // this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)

    }

    handleChange = (event) => {
        console.log(event.target.name)
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        // if (this.state.username === 'Pralax' && this.state.password === 'dummy') {
        //     AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //     this.props.history.push(`/welcome/${this.state.username}`)
        //     // this.setState({ showSuccessMessage: true })
        //     // this.setState({ hasLoginFailed: false })
        // }
        // else {
        //     console.log('Failed')
        //     this.setState({ showSuccessMessage: false })
        //     this.setState({ hasLoginFailed: true })
        // }

        // AuthenticationService
        //     .executeBasicAutheticationService(this.state.username, this.state.password)
        //     .then(() => {
        //         AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
        //         this.props.history.push(`/welcome/${this.state.username}`)
        //     }).catch(() => {
        //         this.setState({ showSuccessMessage: false })
        //         this.setState({ hasLoginFailed: true })
        //     })

        AuthenticationService
            .executeJwtAutheticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
                this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }


    //         handleUserNameChange(event){
    //             console.log(event.target.value)
    //             this.setState(
    //                 {
    //                     username: event.target.value
    //                 }
    //             )
    //     }

    //     handlePasswordChange(event){
    //         console.log(event.target.value)
    //         this.setState(
    //             {
    //                 password: event.target.value
    //             }
    //         )
    // }



    render() {
        return (
            <div>
                <h1>Login</h1>
                <div className="container">
                    {/*<ShowInvalidCreds hasLoginFailed={this.state.hasLoginFailed}></ShowInvalidCreds>
                <ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}></ShowLoginSuccessMessage>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-danger">Invalid Creds</div>}
                    {this.state.showSuccessMessage && <div>Login Successful</div>}
                    Username: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
        );
    }
}

export default LoginComponent