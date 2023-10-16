import React from "react";

export default function Questions(props) {
    let currentQuestion = props.currentQuestion;

    let optionElems = currentQuestion.options.map(option => {
        return <li key={option.id} onClick={() => props.optionCallback(option.isCorrect)}>{option.text}</li>
    })

    return (
        <div id="questions" className="question-card">
            <h2>Select the Chinese word that corresponds to the image</h2>
            <img src={currentQuestion.img} />
            <ul>
                {optionElems}
            </ul>
        </div>
    )
}