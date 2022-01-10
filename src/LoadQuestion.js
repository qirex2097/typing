import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useQuestion } from "./QuestionProvider";

export default function LoadQuestion() {
  const { loadQuestions } = useQuestion();

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log("acceptedFiles:", acceptedFiles);
      console.log(acceptedFiles[0]);
      const fileReader = new FileReader();
      fileReader.readAsText(acceptedFiles[0]);
      fileReader.onload = () => {
        loadQuestions(JSON.parse(fileReader.result));
      };
    },
    [loadQuestions]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      style={{ width: 200, height: 100, border: "dashed 1px" }}
    >
      <input {...getInputProps()} />
    </div>
  );
}
