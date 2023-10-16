import React, { useState } from 'react';
import ComposeForm from './ComposeForm.js';
import { WordGroup } from './WordBubble.js';

export function Dictionary(props){
    const dictionary = props.dictionary;
    const featureArray = [{sectionName:"Quiz", buttonName:"Quizzes", imgLink:"Quiz-image.png", description:"Ready for a quiz? Come to see how many Chinese Words you have mastered!", pageLink:"/quiz"},
        {sectionName:"History", buttonName:"Your History", imgLink:"history-image", description:"How did you do on your past quizzes? Is there any progress? Check your past records here!", pageLink:"/history"},
        {sectionName:"Comparison", buttonName:"Character Comparison", imgLink:"Comparison-image", description:"A little bit confusing of similar characters? Comparison will help you keep clear!", pageLink:"/history"}];

    

    const [searchChinese, setSearchChinese] = useState(false);
    const [searchResultsArray, setSearchResultsArray] = useState([]);

    

    function SearchDictionary(wordToSearch){
        const foundArray = findSearchResults(dictionary, wordToSearch, searchChinese);
        setSearchResultsArray(foundArray);
    }

    function ToggleChinese(){
        setSearchChinese(!searchChinese);
    }
  
    return(
        <div className="container-fluid center">
            <h1>English-Mandrian Dictionary</h1>
            <ComposeForm searchCallback={SearchDictionary} placeholder={searchChinese ? "Input Chinese word" : "Input English word"} />

            <div className="container">
                <div className="row row-padding">
                <ToggleButton buttonText={"Swap to search " + (searchChinese ? "English" : "Chinese")} buttonCallback={ToggleChinese} key={"Swap Language"} />
                </div>
            </div>
            
            {searchResultsArray.length > 0 && <WordGroup words={searchResultsArray} />}
            <FeatureList featureArray={featureArray} />


        </div>
    );
}

function FeatureList(props){
    const featureArray = props.featureArray;
    const features = featureArray.map((element) => {
        return <FeatureBox elementObj={element} key={element.sectionName}/>
    });
    return(
        <div>
            {features}
        </div>
    );
}

function FeatureBox(props){
    const elementObj = props.elementObj;
    const sectionName = elementObj.sectionName;
    const buttonName = elementObj.buttonName;
    const imgLink = elementObj.imgLink;
    const description = elementObj.description;
    const pageLink = elementObj.pageLink;

    return(
        <div className="center">
            <h2 className="center">{sectionName} section</h2>
            <section>
            <div className="center">
                <img src={"img/" + imgLink} alt={sectionName} className="home_img"/>
                <p>{description}</p >
                <a href={pageLink}><button type="button" className="btn btn-outline-danger">{buttonName}</button></a>
            </div>
            </section>
        </div>
    );
}

function findSearchResults(wordArray, chosenWord, searchChinese){
    const matchingWordArray = wordArray.filter((element) => {
        if(searchChinese){
            return element.simplified.includes(chosenWord);
        }
        for(let i = 0; i < element.definitions.length; i++){
            if(element.definitions[i].includes(chosenWord)){
                return true;
            }
        }
        return false;
    });
    return matchingWordArray;
}

function ToggleButton(props){
    return(
        <div className="card-container col d-flex col-md-5 col-12 m-2">
        <div>
            <div className="card-body btn btn-dark dict-button" onClick={props.buttonCallback}>
                <p className="card-text">{props.buttonText}</p>
            </div>
        </div>
        </div>
    );
}