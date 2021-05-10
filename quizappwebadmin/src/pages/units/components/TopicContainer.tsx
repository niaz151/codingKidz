import { MCQuestionContainer, TFQuestionContainer } from ".";
import { Topic } from "../../../utils/models";

interface Props {
  topic: Topic;
}

const TopicContainer = (props: Props) => {
  const { topic } = props;
  return (
    <div>
      <div>
        <p>{topic.name}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <p>Multiple Choice Questions</p>
      {topic.multipleChoiceQuestions?.map((question) => {
        return <MCQuestionContainer question={question} key={question.id} />;
      })}
      <button>Add Multiple Choice Question</button>
      <p>True False Questions</p>
      {topic.trueFalseQuestions?.map((question) => {
        return <TFQuestionContainer question={question} key={question.id} />;
      })}
      <button>Add True False Question</button>
    </div>
  );
};

export default TopicContainer;
