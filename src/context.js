import axios from "axios";
import { useState, useContext, createContext } from "react";

const table = {
  sports: 21,
  history: 23,
  politics: 24,
  science: 18,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [pagination, setPagination] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({
    amount: 5,
    category: "sports",
  });

  //fetching questions
  const fetchApi = async url => {
    setWaiting(false);
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response) {
        const data = response.data.results;
        if (data.length > 0) {
          setQuestions(data);
          setLoading(false);
          setWaiting(false);
          setError(false);
          setPagination(data);
        } else {
          setWaiting(true);
          setError(true);
        }
      } else {
        setWaiting(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //next question button
  const nextQuestion = () => {
    setIndex(prevIndex => {
      if (prevIndex === questions.length - 1) {
        openModal();
        return questions.length - 1;
      } else {
        return prevIndex + 1;
      }
    });
  };

  // goToQuestion;
  // const goToQuestion = number => {
  //   setPagination(index => {
  //     console.log(index, number);
  //   });
  // };

  //finish questions button function
  const finishQuestions = () => {
    openModal();
    checkLastAnswer();
  };

  // check step by step answer
  const checkAnswer = value => {
    if (value) {
      setCorrect(prev => prev + 1);
    }
    nextQuestion();
  };

  //check lastest answer
  const checkLastAnswer = value => {
    if (value) {
      setCorrect(prev => prev + 1);
    }
  };

  //open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  //close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIndex(0);
    setCorrect(0);
    setWaiting(true);
  };

  // change amount and category
  const handleChange = e => {
    const { value, name } = e.target;
    setQuiz({ ...quiz, [name]: value });
  };

  // form submit
  const handleSubmit = e => {
    e.preventDefault();
    const { amount, category } = quiz;
    let url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}`;
    fetchApi(url);
  };

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        index,
        questions,
        error,
        correct,
        nextQuestion,
        checkAnswer,
        isModalOpen,
        closeModal,
        quiz,
        handleChange,
        handleSubmit,
        finishQuestions,
        // prevQuestion,
        // goToQuestion,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};
