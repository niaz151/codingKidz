import { TrueFalseQuestion } from "../../../../utils/models";

interface Props {
  question: TrueFalseQuestion
}

const TFQuestionContainer = (props: Props) => {
  const {question} = props;

  return <p>{question.question}</p>

}

export default TFQuestionContainer;