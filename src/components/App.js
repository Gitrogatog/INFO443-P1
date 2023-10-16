import React, { useEffect, useState } from 'react'; //import React Component
import { Route, Routes, Outlet, Navigate, useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import NavBar from "./NavBar.js";
import {Dictionary} from "./Dictionary.js"
import CompareSubcharacter from './Comparison.js';
import History from './History.js';
import About from './About.js';
import LogInPage from './SignInPage.js';
import { Quiz } from './Quiz.js';

import SAMPLE_COMPARISON from '../data/sample-comparisons.json';
import SAMPLE_QUESTION from '../data/questions.json';
import SAMPLE_USER from '../data/users.json'
import ACTUAL_DICT from "../data/cedict.json";


export default function App(props){
    const [currentUser, setCurrentUser] = useState(SAMPLE_USER[0]);
    const navigateTo = useNavigate();
    
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                firebaseUser.userId = firebaseUser.uid;
                firebaseUser.userName = firebaseUser.displayName;
                setCurrentUser(firebaseUser);
                navigateTo('/dictionary');
            } else {
                setCurrentUser(SAMPLE_USER[0]);
            }   
        })
    }, [])

    const loginUser = (userObj) => {
        setCurrentUser(userObj);
        if(userObj.userId !== null){
            navigateTo('/dictionary');
        }
    }

    return(
        <div>
            <header>
                <NavBar currentUser={currentUser} />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={ <About /> } />
                    <Route path="/dictionary" element={ <Dictionary dictionary={ACTUAL_DICT}/> } />
                    <Route path="/compare" element={ <CompareSubcharacter dictionary={ACTUAL_DICT} comparison={SAMPLE_COMPARISON} /> } />
                    <Route path="/signin" element={ <LogInPage currentUser={currentUser} loginCallback={loginUser} /> } />
                    

                    <Route element={<ProtectedPage currentUser={currentUser} />}>
                        <Route path="/history/:quizType" element={ <History currentUser={currentUser} /> } />
                        <Route path="/quiz" element={ <Quiz questions={SAMPLE_QUESTION} currentUser={currentUser} /> } />
                        <Route path="history" element={<Navigate to="/history/mix" />} />
                    </Route>
                    <Route path="*" element={ <Dictionary dictionary={ACTUAL_DICT}/> } />
                </Routes>
            </main>
            <footer>
                <p>&copy; 2022 Marina & Roberto</p>
            </footer>
        </div>
        
    );
}

function ProtectedPage(props) {
    //...determine if user is logged in
    if(props.currentUser.userId === null) { //if no user, send to sign in
      return <Navigate to="/signin" />
    }
    else { //otherwise, show the child route content
      return <Outlet />
    }
  } 
