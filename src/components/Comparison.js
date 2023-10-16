import React, { useState } from 'react';
import { WordGroup } from './WordBubble.js';

export default function CompareSubcharacter(props){

    const dictionary = props.dictionary;
    const comparison = props.comparison;

    const [character, setCharacter] = useState("");
    const [comparisonArray, setComparisonArray] = useState([]);
    function handleCharacterInput(event){
        setCharacter(event.target.value);
        searchComparisons(event.target.value);
    }
    function searchComparisons(chosenCharacter){
        if(chosenCharacter === ""){
            setComparisonArray([]);
            return;
        }
        else{
            for(let i = 0; i < comparison.length; i++){
                if(comparison[i].character === chosenCharacter){
                    setComparisonArray(findSearchResults(dictionary, comparison[i].words));
                    return;
                }
            }
        }
        setComparisonArray([]);
    }

    const optionElems = comparison.map((element) => {
        return <option key={element.character} value={element.character}>{element.character}</option>
    });

    return(
        <div className="container-fluid center">
            <h1 className="">Mandarin Comparison</h1>
            <h2 className="text-center">Select a basic Mandarin word to see a set of more complex words that it is a part of</h2>
            <div className="center-text">
                <div className="dropdown">

                    <div className="col-auto">
                        <select className="form-select" value={character} onChange={handleCharacterInput}>
                        <option value="">Select a chinese character</option>
                        {optionElems}
                        </select>
                    </div>
                </div>
            </div>
            {character !== "" && <WordGroup words={comparisonArray} />}
        </div>
    );
}

function findSearchResults(wordDict, chosenWords){
    const matchingWordArray = wordDict.filter((element) => {
        return chosenWords.includes(element.simplified);
    });
    return matchingWordArray;
}