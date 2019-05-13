import React, {Component} from 'react';
import FormElement from "../UI/Form/FormElement";
import {sendMessage} from "../../store/actions/chatFunctions";

class ChatForm extends Component {
    state = {
        message: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    submitFormHandler = async event => {
        event.preventDefault();
        const state = {...this.state};
        const text = this.props.user + ': ' + state.message;

        await sendMessage(this.props.ws, text);
        this.setState({message: ''});
    };

    getFieldHasError = fieldName => {
        return (
            this.props.error &&
            this.props.error.errors &&
            this.props.error.errors[fieldName] &&
            this.props.error.errors[fieldName].message
        );
    };

    render() {
        return (
            <div className="box p-3">
                <form onSubmit={this.submitFormHandler}>
                    <div className="row">
                        <div className="col-10 mb-n3">
                            <FormElement
                                propertyName="message"
                                type="text"
                                value={this.state.message}
                                onChange={this.inputChangeHandler}
                                error={this.getFieldHasError('message')}
                                placeholder="Enter message"
                            />
                        </div>
                        <div className="col-2 mb-n3">
                            <div className="form-group">
                                <button type="submit" className="btn btn-success">Send</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ChatForm;
