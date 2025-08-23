import React from 'react'
import sadImage from '../Assets/am-i-sad-or-depressed.svg'
import { Link } from 'react-router-dom';
import '../Styles/Testpage.css';

const Testpage = () => {
  return (
    <>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col part1left'><img src={sadImage} alt='depressed'/></div>
                <div className='col part1right'>
                    <h3>Am I sad or depressed?</h3>
                    <p>Sadness is a normal human emotion whereas depression is a mental health concern that can affect how you think, feel or behave in many ways. Take this quiz to find out whether you are experiencing signs of depression.</p>
                    <h3>Things to Remember Before You Start the Quiz</h3>
                    <ul>
                        <li>Please consider your thoughts, feelings and actions in the last 2 weeks.</li>
                        <li>Choose the response that you relate with the most.</li>
                        <li>There are no right or wrong answers to the questions.</li>
                        <li>Please answer all questions to get your results.</li>
                    </ul>
                    <button><Link to='/test'>Start Assessment</Link></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Testpage