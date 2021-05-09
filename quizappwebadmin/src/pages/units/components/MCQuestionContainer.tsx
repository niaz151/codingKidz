import { MultipleChoiceQuestion } from "../../../utils/models";

interface Props {
  question: MultipleChoiceQuestion
}

const MCQuestionContainer = (props: Props) => {
  const {question} = props;

  return <p>Question: {question.question}</p>

}

export default MCQuestionContainer;