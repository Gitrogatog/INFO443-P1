import React from 'react';

function WordBubble(props){
    const word = props.word;
    const definitions = props.definitions;
    const definitionArray = [];
    for(let i = 0; i < definitions.length; i++){
        definitionArray.push(<p key={i + 1}>{(i + 1) + ". " + definitions[i]}</p>);
    }
    return(
        <div>
            <p className=".chinese">{word}</p>
            {definitionArray}
        </div>
    );
}

export function WordGroup(props){
    const words = props.words;
    const wordArray = words.map((element) => {
        return <WordBubble word={element.simplified} definitions={element.definitions} key={element.simplified} />
    });
    return(
        <div className='results-container text-center definition_holder'>
            {wordArray}
        </div>
    );
}