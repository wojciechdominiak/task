import "./TaskDone.scss";

const TaskDone = (props) => {
  return (
    <li
      className="taskDone"
      onClick={(e) => props.onClickDeleteDoneHandler(props.index)}
    >
      <div className="taskToDone_title">{props.children}</div>
      <div className="taskList__sign">✔</div>
    </li>
  );
};

export default TaskDone;
