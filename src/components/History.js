import { onValue, getDatabase, ref } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function History(props){
    const [sliderValue, setSliderValue] = useState(2);
    const [quizData, setQuizData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();
    const urlParams = useParams();
    const quizType = urlParams.quizType;

    const currentUser = props.currentUser;
    

    useEffect(() => {

        const db = getDatabase();
        const allQuizRef = ref(db, "allQuizs");

        const offFunction = onValue(allQuizRef, (snapshot) => {
            const valueObj = snapshot.val();
            const objKeys = Object.keys(valueObj);
            const objArray = objKeys.map((keyString) => {
                const theQuizObj = valueObj[keyString];
                theQuizObj.key = keyString;
                return theQuizObj;
            })
        setQuizData(objArray);
        setIsLoading(false);
        });

        function cleanup() {
            offFunction();
        }
        return cleanup;
    }, [])
    

    function handleSlider(event){
        const inputtedValue = event.target.value;
        setSliderValue(inputtedValue);
    }

    const handleDifficultySelect = (event) => {
        const newValue = event.target.value;
        applyFilter(newValue);
    }

    const applyFilter = (difficulty) => {
        navigate("/history/" + difficulty);

    }

    
    const filteredData = filterData(quizData, currentUser, quizType);
    return(
        <div>
            <h1>Past performances:</h1>
            <div className="center history-image">
                {filteredData.length > 0 && <Graph data={filteredData}  maxValue={sliderValue} />}
                {isLoading && <p>Loading Graph...</p>}
                {!isLoading && filteredData.length === 0 && <p>You must take at least one quiz{quizType !== "" && quizType !== "mix" && " in this category"} to see your history!</p>}
            </div>
            <div className="center">
                {filteredData.length > 2 && 
                <div>
                    <label className="form-label" for="customRange2">Last 2 quiz trials   ---   Last {filteredData.length} quiz trials</label>
                    <input type="range" className="form-range" value={sliderValue} min="2" max={filteredData.length} onChange={handleSlider} id="customRange2"/>
                </div>}
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <select id="difficultySelect" className="form-select" value={quizType} onChange={handleDifficultySelect}>
                            <option value="mix">All quizzes</option>
                            <option value="all">All difficulties</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

function filterData(data, user, quizType){
    const filteredData = data.filter((element) => {
        return (user.userId === element.userId) && (quizType === "mix" || quizType === "" || quizType === element.difficulty);
    });
    return filteredData;
}

function Graph(props){

    const maxValue = props.maxValue;

    let filteredData = props.data;
    for(let i = 0; i < filteredData.length; i++){
        filteredData[i].index = i + 1;
    }
    if(maxValue <= filteredData.length && maxValue > 1){
        filteredData = filteredData.slice(filteredData.length - maxValue);
    }
    return (
        
        <LineChart
        width={500}
        height={300}
        data={filteredData}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="index" label={{value: "Quiz Number (Higher is more recent)", offset : 2, position: "insideBottom"}} />
        <YAxis label={{ value: 'Quiz Score', angle: -90, position: 'insideLeft' }} />
        <Tooltip content={<CustomTooltip />} dataset={filteredData} />
        <Legend />
        
        <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
        </LineChart>
      );
}

const CustomTooltip = ({ active, payload, label, dataset }) => {
    if (active && payload && payload.length) {
        const index =  Math.min(Math.max(label, 0), dataset.length - 1);
        return (
            <div className="custom-tooltip">
            <p className="label">Quiz Number {(label)}</p> 
            <p className="intro">Difficulty: {dataset[index].difficulty}</p>
            <p className="desc">Score: {Math.round(payload[0].value)}%</p>
            </div>
        );
    }
  
    return null;
  };