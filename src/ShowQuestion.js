import { useState } from "react";
import AddQuestion from "./AddQuestion";
import LoadQuestion from "./LoadQuestion"
import { useQuestion } from "./QuestionProvider";

export default function ShowQuestion() {
  const { getQuestion } = useQuestion();

  const [text, setText] = useState("");
  const [position, setPosition] = useState(0);
  const [question, setQuestion] = useState(getQuestion());

  const question_text = question.question;
  const answer_text = question.answer;
  const id = question.id;
  const answer_output =
    answer_text.slice(0, position) +
    answer_text.slice(position).replace(/[^ .,?"-]/g, "_");

  const clearText = () => setText("");
  const nextQuestion = () => {
    const next_question = getQuestion();
    setQuestion(next_question);
    nextWord(next_question.answer.slice(0).replace(/[^ .,?"-]/g, "_"));
  };
  const nextWord = (answer) => {
    const next_position = answer.search(/[_]/);
    setPosition(next_position);
    setText("");
    return next_position;
  };
  const flushAnswer = () => {
    setPosition(answer_text.length);
    setText("");
  };

  const handleChange = (e) => {
    const input = e.target.value;
    const current_position = answer_output.search(/[_]/);
    const next_position =
      answer_output.slice(current_position).search(/[^_]/) + current_position;
    const last_letter_regexp = /[ .,?]$/;

    if (input.match(last_letter_regexp)) {
      const next_answer_output =
        answer_text.slice(0, next_position) +
        answer_text.slice(next_position).replace(/[^ .,?\-"]/g, "_");
      if (current_position < 0) {
        nextQuestion();
      } else if (input.match(/^[?]/)) {
        if (input.match(/^[?][?][ ]/)) {
          flushAnswer();
        } else if (input.match(/^[?][ ]/)) {
          if (nextWord(next_answer_output) < 0) {
            flushAnswer();
          }
        } else {
          setText(input);
        }
      } else {
        const correct_word = answer_text
          .slice(current_position, next_position)
          .replace(last_letter_regexp, "")
          .toLocaleLowerCase();
        const input_word = input
          .replace(last_letter_regexp, "")
          .toLocaleLowerCase();

        if (
          input_word.length === correct_word.length &&
          input_word.indexOf(correct_word) === 0
        ) {
          if (nextWord(next_answer_output) < 0) {
            flushAnswer();
          }
        } else {
          console.log(
            `wrong: >${input}<, >${input_word}<, answer>${correct_word}<, position=${current_position}, next=${next_position}`
          );
        }
        clearText();
      }
    } else {
      setText(input);
    }
  };

  const componentList = [];
  componentList.push(<LoadQuestion key={1}/>);
  if (position === answer_text.length) {
    componentList.push(
      <AddQuestion
        key={2}
        default_question={question_text}
        default_answer={answer_text}
        id={id}
      />
    );
  }

  return (
    <div>
      <div>
        {question_text}
        <br />
        {answer_output}
        <br />
      </div>
      <div>
        <input type="text" value={text} onChange={handleChange} />
      </div>
      <div>{componentList}</div>
    </div>
  );
}
