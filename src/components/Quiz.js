import React, { useEffect, useState } from "react";
import { getDatabase, ref, push as firebasePush, onValue, update } from "firebase/database";

import DifficultySelectForm from "./DifficultySelectForm";
import Questions from "./Questions";
import { Link } from "react-router-dom";

export function Quiz(props) {
    const [quizQuestion, setQuizQuestion] = useState(props.questions);
    const [go, setGo] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentDifficulty, setCurrentDifficulty] = useState("all");

    const currentUser = props.currentUser;

    useEffect(() => {
        const db = getDatabase();
        const allQuizRef = ref(db, "allQuizs");

        onValue(allQuizRef, (snapshot) => {
            const obj = snapshot.val();
            if (obj != null) {
                const objKeys = Object.keys(obj);
                objKeys.map((keyString) => {
                    const quizObj = obj[keyString];
                    quizObj.key = keyString;
                    return quizObj;
                });
            }
          })
    }, [])
    
    const applyFilter = (difficulty) => {
        setCurrentDifficulty(difficulty);
        if (difficulty === "" || difficulty === "all") {
            setQuizQuestion(props.questions);
        } else {
            let filteredArray = [];
            filteredArray = quizQuestion.filter(question => {
                return question.difficulty === difficulty;
            })
            setQuizQuestion(filteredArray);
        }
    }

    const startQuiz = () => {
        setGo(true);
    }

    const optionClicked = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        let i = 0;
        if (currentQuestion + 1 < quizQuestion.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResults(true);
        }
    };

    const updateDatabase = () => {
        const newQuiz = {
            "userId": currentUser.userId,
            "userName": currentUser.userName,
            "email": currentUser.email,
            "score": score / quizQuestion.length * 100,
            "difficulty": currentDifficulty
        }

        // update the database
        const db = getDatabase();
        const allQuizRef = ref(db, "allQuizs");
        firebasePush(allQuizRef, newQuiz)
            .catch(function(error) {
                console.error(error);
            });
    }

    const restartQuiz = () => {
        updateDatabase();
        setQuizQuestion(props.questions);
        setScore(0);
        setCurrentQuestion(0);
        setGo(false);
        setShowResults(false);
    };

    const stopQuiz = () => {
        updateDatabase();
        setQuizQuestion(props.questions);
        setScore(0);
        setCurrentQuestion(0);
        setGo(false);
        setShowResults(false);
    }


    let renderDom;
    if (!go) {
        renderDom = <DifficultySelectForm difficultyCallback={applyFilter} goCallback={startQuiz} />;
    } else {
        if (showResults) {
            renderDom = (
                <div className="final-results">
                    <h1>Final Results</h1>
                    <h2>
                    {score} out of {quizQuestion.length} correct - (
                    {(Math.round((score / quizQuestion.length) * 100))}%)
                    </h2>
                    <button onClick={restartQuiz} className="btn btn-danger mx-2">Restart Quiz</button>
                    <button onClick={stopQuiz} className="btn btn-danger mx-2">
                        <Link className="nav-link" to="/history/mix">View History</Link>
                    </button>
                </div>
            )
        } else {
            renderDom = <Questions currentQuestion={quizQuestion[currentQuestion]} optionCallback={optionClicked} />
        }
    }

    return (
        <div id="quiz" className="container-fluid text-center">
            <h1 className="pt-4">English-Mandrian Quiz</h1>
            {renderDom}
        </div>
    );
}