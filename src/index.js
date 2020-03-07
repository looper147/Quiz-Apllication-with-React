import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import questions from "./api/questions";

//fetch question
function getQuestion(questionIndex) {
  return questions[questionIndex].question;
}
//fetch answer
function getAnswer(questionIndex, answerIndex) {
  return questions[questionIndex].answers[answerIndex];
}
//validate answer
function validateAnswer(questionIndex, answer) {
  if (questions[questionIndex].correctAnswer === answer) {
    return true;
  }
}

//Header component
function Header(props) {
  return (
    <>
      <h2>Quiz!</h2>
      {/*current question*/}
      <h5>Question {props.stage}/5</h5>
      {/*progress feedback*/}
      <h6>
        {props.correctAnswer || props.incorrectAnswer > 0
          ? `Correct: ${props.correctAnswer} Incorrect: ${props.incorrectAnswer}`
          : ""}
      </h6>
      <h3>
        {/*actual question */}
        <i>{props.question}</i>
      </h3>
    </>
  );
}
//answer component
function Answer(props) {
  //handle the answer on click
  function handleClick() {
    //validate the answer
    if (validateAnswer(props.stage, props.answerOption)) {
      props.setStage(props.stage + 1);
      props.setCorrectAnswer(props.correctAnswer + 1);
    } else {
      props.setStage(props.stage + 1);
      props.setIncorrectAnswer(props.incorrectAnswer + 1);
    }
  }
  return <button onClick={() => handleClick()}>{props.answerOption}</button>;
}
//quiz component
function Quiz() {
  const [stage, setStage] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [incorrectAnswer, setIcorrectAnswer] = useState(0);

  if (stage === 5) {
    return (
      <>
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <h1>
            {correctAnswer || incorrectAnswer > 0
              ? `Correct: ${correctAnswer} Incorrect: ${incorrectAnswer}`
              : ""}
          </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container">
        <Header
          stage={stage}
          question={getQuestion(stage)}
          correctAnswer={correctAnswer}
          incorrectAnswer={incorrectAnswer}
        />
        {/*the quiz always have 4 options */}
        {/*First option*/}
        <Answer
          answerOption={getAnswer(stage, 0)}
          stage={stage}
          setStage={setStage}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          incorrectAnswer={incorrectAnswer}
          setIncorrectAnswer={setIcorrectAnswer}
        />
        {/*second option*/}
        <Answer
          answerOption={getAnswer(stage, 1)}
          stage={stage}
          setStage={setStage}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          incorrectAnswer={incorrectAnswer}
          setIncorrectAnswer={setIcorrectAnswer}
        />
        {/*third option*/}
        <Answer
          answerOption={getAnswer(stage, 2)}
          stage={stage}
          setStage={setStage}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          incorrectAnswer={incorrectAnswer}
          setIncorrectAnswer={setIcorrectAnswer}
        />
        {/*fourth option*/}
        <Answer
          answerOption={getAnswer(stage, 3)}
          stage={stage}
          setStage={setStage}
          correctAnswer={correctAnswer}
          setCorrectAnswer={setCorrectAnswer}
          incorrectAnswer={incorrectAnswer}
          setIncorrectAnswer={setIcorrectAnswer}
        />
      </div>
    </>
  );
}

ReactDOM.render(<Quiz />, document.getElementById("root"));
