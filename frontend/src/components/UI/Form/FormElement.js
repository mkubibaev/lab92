import React from 'react';

const FormElement = props => {

    const inputClasses = ['form-control'];

    if (props.error) {
        inputClasses.push('is-invalid');
    }

    return (
        <div className="form-group mb-3">
            <input
                type={props.type}
                name={props.propertyName}
                value={props.value}
                onChange={props.onChange}
                required={props.required}
                placeholder={props.placeholder}
                className={inputClasses.join(' ')}
            />
            {props.error && (
                <div className="invalid-feedback">
                    {props.error}
                </div>
            )}
        </div>
    );
};

export default FormElement;
