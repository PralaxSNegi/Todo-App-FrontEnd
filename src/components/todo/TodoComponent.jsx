import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { Component } from 'react'
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';

class TodoComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: '',
            targetDate: moment(new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.retrieveTodos(username, this.state.id)
            .then(response => this.setState({
                description: response.data.description,
                targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
            }))

    }

    validate = (values) => {
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a description'
        }
        else if (values.description.length < 5) {
            errors.description = 'Enter at least 5 Characters in Description'
        }
    
        if (!moment(values.targetDate).isValid) {
            errors.targetDate = 'Enter a valid target date'
        }
    
        return errors
    }
    
    onSubmit = (values) => {
    
        let username = AuthenticationService.getLoggedInUser()

        let todo = {
            id: this.state.id,
            description: values.description,
            targetDate: values.targetDate
        }
    
        if (this.state.id === -1) {
    
            TodoDataService.createTodos(username, todo )
                .then(() => this.props.history.push('/todos'))
    
        } else {
    
            TodoDataService.updateTodos(username, this.state.id, todo)
                .then(() => this.props.history.push('/todos'))
    
        }
    
        console.log(values)
    }
    
    render() {
    
        let { description, targetDate } = this.state
        // let targetDate = this.state.targetDate
    
        return (
            <>
                <h1>Todo</h1>
                <div className="container">
                    <Formik
                        initialValues={{ description, targetDate }}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}
                    >
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"></Field>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"></Field>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </>
        );
    }

}



export default TodoComponent