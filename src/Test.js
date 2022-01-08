import React from "react";
import { useEffect, useState } from "react";


export const Test = () => {
    const [data, setData] = useState(null),
          [index, setIndex] = useState(0);

    let buttons = [], question = "", page;

    function cleanAnswers() {
        var answer, j = 0;
    
        for (j=0; j<4; j++) {
            answer = document.getElementById("answer" + j)
            if (answer && answer.classList.contains("red")) {
                answer.classList.remove("red");  
            }
            if (answer && answer.classList.contains("green")) {
                answer.classList.remove("green");  
            }
        }
    }
        
    const checkAnswer = (e, data) => {
        if (e.target.innerText ==  data[index].correctAnswer) {
            e.target.classList.toggle("green");
            setIndex(index + 1);
        } else {
            e.target.classList.toggle("red");
        }
    }
        
        const getAnswers = (data) => {
            let answers = [];
        
            answers.push(data[index].correctAnswer);
            for (let j=0; j<3; j++) {
                answers.push(data[index].incorrectAnswers[j]);
            }
            answers.sort();
        
            return answers;
        }
        
        const getButtons = (data) => {
            let buttons = [],
                answers = getAnswers(data);
        
            for (let i=0; i<answers.length; i++) {
                buttons.push(<button className="answer" id={"answer" + i} key={i} onClick={(e) => checkAnswer(e, data)}>{answers[i]}</button>);
            }
            
            return buttons;
        }
        
        const getQuestion = (data) => {
            return data[index].question;
        }
        

    useEffect(()=>{
        fetch('https://api.trivia.willfry.co.uk/questions?categories=geography&limit=10')
             .then(res => {
                 return res.json();
             })
             .then(data => {
                 setData(data);
             })
    }, []);

    if (data && index < 10) {
        buttons = getButtons(data);
        question = getQuestion(data);
    }

    if (index >= 10) {
        page = <h1 className="tests textColor">Congratulations! You did it!</h1>;
    } else {
        cleanAnswers();
        page = (<div className="tests">
            <h1 className="textColor">{question}</h1>
            {buttons}
        </div>
    );
    }

    return page;
}