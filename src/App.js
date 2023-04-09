import { useGlobalContext } from "./context";
import { useState } from "react";
import Form from "./Components/Form";
import Loading from "./Components/Loading";
import Modal from "./Components/Modal";
import "./App.css";
import { Button } from "@material-tailwind/react";

const App = () => {
  const {
    waiting,
    loading,
    index,
    questions,
    nextQuestion,
    checkAnswer,
    finishQuestions,
    goToQuestion,
  } = useGlobalContext();

  if (waiting) {
    return <Form />;
  }
  if (loading) {
    return <Loading />;
  }

  const { incorrect_answers, correct_answer, question } = questions[index];
  const answers = [...incorrect_answers];
  if (incorrect_answers.length > 1) {
    let num = Math.floor(Math.random() * 4);
    if (num === 3) {
      answers.push(correct_answer);
    } else {
      answers.push(answers[num]);
      answers[num] = correct_answer;
    }
  } else {
    let num = Math.floor(Math.random() * 2);
    answers.push(answers[num]);
    answers[num] = correct_answer;
  }

  return (
    <>
      <main className="min-h-screen  questions-section flex items-center justify-center">
        <Modal />
        <div className="p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px]">
          <p className="text-right pb-2 text-green-600">
            Number:{" "}
            <span>
              {index + 1}/{questions.length}
            </span>
          </p>
          <div className="mt-3">
            <p
              className="text-center font-medium text-2xl lg:text-3xl leading-loose"
              dangerouslySetInnerHTML={{ __html: question }}
            />
            <div className="grid grid-cols-1 my-5 space-y-2 place-content-center">
              {answers.map((answer, index) => {
                return (
                  <button
                    onClick={() => checkAnswer(answer === correct_answer)}
                    key={index}
                    className="bg-blue-500 w-4/5 rounded-lg mx-auto text-white p-2 hover:bg-blue-400"
                    dangerouslySetInnerHTML={{
                      __html: answer,
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="flex justify-center pt-4">
            <button
              onClick={nextQuestion}
              className="py-2 px-7 text-medium flex rounded-lg text-white bg-yellow-600 hover:bg-yellow-700"
            >
              Next question
            </button>
            <button
              onClick={finishQuestions}
              className=" ml-4 py-2 px-7 text-medium flex rounded-lg text-white bg-red-600 hover:bg-red-700"
            >
              Finish
            </button>
          </div>

          <div className="block p-1 mb-6 flex mx-auto buttonss flex-wrap   md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 ">
            {questions.map((question, index) => {
              return (
                <Button
                  // onClick={() => {
                  //   goToQuestion(index + 1);
                  // }}
                  key={index}
                  className=" mx-auto p-4 button-number  m-2"
                >
                  {index + 1}
                </Button>
              );
            })}
          </div>
        </div>
      </main>

      {/* ================================================================================== */}
    </>
  );
};

export default App;
