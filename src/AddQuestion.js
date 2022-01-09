import { useInput } from "./hooks";
import { useQuestion } from "./QuestionProvider";

export default function AddQuestion({
  default_question = "",
  default_answer = "",
  id,
}) {
  const [question, setQuestion] = useInput(default_question);
  const [answer, setAnswer] = useInput(default_answer);
  const { addQuestion } = useQuestion();

  const submit = (e) => {
    e.preventDefault();
    console.log("submit:", question.value, answer.value, id);
    addQuestion({ question: question.value, answer: answer.value, id: id });
    setQuestion();
    setAnswer();
  };

  return (
    <form onSubmit={submit}>
      <div>
        問題：
        <input {...question} type="text" size="80" />
      </div>
      <div>
        答え：
        <input {...answer} type="text" size="80" />
      </div>
      <button>EDIT</button>
    </form>
  );
}
