import React, { useState, useEffect } from 'react';
import '../Styles/Test.css';
import questions from '../Scripts/test.js';
import result from '../Scripts/testResult.js';

const Test = () => {
  const [data, setData] = useState({ category: "", explanation: "", Recommendation: "",emoji:"" });

  const [userScores, setUserScores] = useState(Array(questions.length).fill(0));
  useEffect(() => {
    const userScore = sumOfDigits(userScores);
    const resultData = check_result(userScore);
    setData(resultData);
  }, [userScores]); 

  const check_result = (ans) => {
    if (ans <= 35) {
      return {
        category: result[0].category,
        explanation: result[0].explanation,
        Recommendation: result[0].Recommendation,
        emoji: result[0].emoji,
      };
    } else if (ans <= 40) {
      return {
        category: result[1].category,
        explanation: result[1].explanation,
        Recommendation: result[1].Recommendation,
        emoji: result[1].emoji,
      };
    } else if (ans <= 45) {
      return {
        category: result[2].category,
        explanation: result[2].explanation,
        Recommendation: result[2].Recommendation,
        emoji: result[2].emoji,
      };
    } else if (ans <= 50) {
      return {
        category: result[3].category,
        explanation: result[3].explanation,
        Recommendation: result[3].Recommendation,
        emoji: result[3].emoji,
      };
    } else {
      return {
        category: result[4].category,
        explanation: result[4].explanation,
        Recommendation: result[4].Recommendation,
        emoji: result[4].emoji,
      };
    }
  }


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Initialize scores with zeros
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleNextClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option when moving to the next question
    } else {
      //   // Calculate total score
      //   const totalScore = userScores.reduce((acc, score) => acc + parseInt(score), 0);
      //   setUserScores([...userScores,totalScore]); // Store the total score for display
    }
  };

  const handleOptionSelect = (optionIndex) => {
    const updatedScores = [...userScores]; // Create a copy of userScores array
    updatedScores[currentQuestionIndex] = optionIndex + 1; // Update the score for the current question
    setUserScores(updatedScores); // Update userScores state with the new array
    setSelectedOption(optionIndex); // Update selected option
  };

  const sumOfDigits = (str) => {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      const digit = parseInt(str[i]);
      if (!isNaN(digit)) {
        sum += digit;
      }
    }
    return sum;
  };
  return (
    <div className='container-fluid d-flex align-items-center justify-content-center mb-5'>
      <div className='card card1 p-4'>
        {isLastQuestion ? '' : <div className='d-flex align-items-center justify-content-center'><h1 className=''>Your Test</h1></div>}
        <br />
        {isLastQuestion ? (
          <div>
            <div className='d-flex justify-content-center text-success'><h2>Your test is completed!</h2></div>
            <div className='Info_Result d-flex flex-column justify-content-center align-items-center'>
              <h1 className='mt-2'>Am I sad or depressed?</h1>
              <p style={{ opacity: '0.5' }}>Here are your score: {sumOfDigits(userScores)}</p>
              <h3 style={{color:"brown",opacity:"0.7"}}>{data.category}</h3>
              <h1>{data.emoji}</h1>
              <div className='Suggestion card p-2'>
                <div className='Explanation'>
                  <p className='para'><strong>Here is explanation for you : </strong>{data.explanation}</p>
                </div>
                <div className='Recommendation'>
                  <p className='para'><strong>Here is recommendation for you : </strong>{data.Recommendation}</p>
                </div>
              </div>
            </div>
            {/* {updatingScore(data.category,sumOfDigits(userScores))} */}
          </div>
        )
         : (
            <div>
              <div className='Ques_Head d-flex gap-2'>
                <p className='text-success'>Ques.</p>
                <p>{currentQuestion.question}</p>
                <p>?</p>
              </div>
              <form>
                {currentQuestion.options.map((option, index) => (
                  <div className='d-flex align-items-center mt-2' key={index}>
                    <input
                      id={`${index}ans`}
                      type='radio'
                      name='ques'
                      checked={index === selectedOption}
                      onChange={() => handleOptionSelect(index)}
                    />
                    <label htmlFor={`${index}ans`}>{Object.values(option)}</label> {/* Assuming options are objects with a single key-value pair */}
                  </div>
                ))}
              </form>
              <div className='btn_div'>
                <button className='p-2 rounded-pill mt-5 btn_submit' onClick={handleNextClick}>Next</button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Test;
