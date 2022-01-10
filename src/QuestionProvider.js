import React, { createContext, useState, useContext } from "react";
import questionData from "./questions.json";
import { v4 } from "uuid";

const QuestionContext = createContext();
export const useQuestion = () => useContext(QuestionContext);

export default function QuestionProvider({ children }) {
  const [questions, setQuestion] = useState(questionData);

  const getQuestion = (id="") => {
    let question = questions.find((v) => v.id === id);
    if (!question) {
      question = questions[Math.floor(Math.random() * questions.length)];
      if (!question["id"]) question["id"] = v4();
    }
    return question;
  };

  const addQuestion = ({ question = "", answer = "", id = "" }) => {
    const result = questions.find((v) => v.id === id);
    if (result) {
      result["question"] = question;
      result["answer"] = answer;
      setQuestion([...questions]);
    } else {
      setQuestion([
        ...questions,
        {
          id: v4(),
          question: question,
          answer: answer,
        },
      ]);
    }
  };

  const saveQuestions = (filename = 'questions.json') => {
    const new_questions = [...questions];
    for (const q of new_questions) {
      if (!q["id"]) {
        q["id"] = v4();
      }
    }

    const data = new Blob([JSON.stringify(questions)], {type: 'type/json'});
    const jsonURL = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = jsonURL;
    link.setAttribute('download', filename);
    link.click();
    document.body.removeChild(link);

    console.log(`saveQuestions:${filename}`)
  };

  const loadQuestions = (buff) => {
    setQuestion(buff);
  }

  return (
    <QuestionContext.Provider
      value={{ getQuestion, addQuestion, saveQuestions, loadQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
