import "./TaskToDo.scss";

const TaskToDo = (props) => {
  return (
    <li
      className="taskToDo"
      onClick={(e) => props.onClickDeleteHandler(props.index)}
    >
      <div className="taskToDo_title">{props.children}</div>
      <button
        className="taskToDo__button"
        onClick={(e) => props.onClickDoneHandler(props.item)}
      >
        DONE
      </button>
    </li>
  );
};

export default TaskToDo;
