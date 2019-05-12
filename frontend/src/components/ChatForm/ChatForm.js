import React, {Component} from 'react';
import FormElement from "../UI/Form/FormElement";

class ChatForm extends Component {
    state = {
        message: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
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
                <form>
                    <div className="row">
                        <div className="col-10 mb-n3">
                            <FormElement
                                propertyName="message"
                                type="text"
                                value={this.state.password}
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
