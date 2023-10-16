import React, { useState } from "react";

export default function DifficultySelectForm(props) {
    let [selectedValue, setSelectedValue] = useState('all');

    const handleSelect = (event) => {
        let newValue = event.target.value;
        setSelectedValue(newValue);
    }

    const handleClick = (event) => {
        event.preventDefault();
        props.difficultyCallback(selectedValue);
        props.goCallback();
    }
    
    return (
        <div id="difficulties" className="container-fluid text-center pb-4">
            <div className="row py-3">
                <div>
                    <h2>Select your preferred quiz difficulty level:</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <select id="difficultySelect" className="form-select" value={selectedValue} onChange={handleSelect}>
                        <option value="all">All difficulties</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div className="col-auto">
                    <button id="submitButtom" type="submit" className="btn btn-danger" onClick={handleClick}>Go!</button>
                </div>
            </div>
        </div>
    )
}