import React, { useState } from 'react';

export default function ComposeForm(props) {
    const [typedValue, setTypedValue] = useState("");

    const searchCallback = props.searchCallback;
    const placeholder = props.placeholder;

    const handleChange = (event) => {
        const inputtedValue = event.target.value;
        setTypedValue(inputtedValue);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        searchCallback(typedValue);
    }

    return (
        <form className="my-2 d-flex" onSubmit={handleSubmit}>
        <div className="input-group">
            <textarea className="form-control" rows="2" placeholder={placeholder} onChange={handleChange}></textarea>
            <button className="btn btn-secondary" type="submit">
                <span className="material-icons">Search</span>
            </button>
        </div>
        </form>
    );
}