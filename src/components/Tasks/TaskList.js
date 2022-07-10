import TaskDone from "./TaskDone";
import TaskToDo from "./TaskToDo";
import "./TaskList.scss";

const TaskList = (props) => {
  return (
    <ul className="taskList">
      <h1 className="taskList__title">{props.type.toUpperCase()}</h1>
      {props.type === "todo" &&
        props.items.map((item, index) => (
          <TaskToDo
            item={item.name}
            onClickDeleteHandler={(e) => props.onClickDeleteHandler(index)}
            key={item.id}
            onClickDoneHandler={props.onClickDoneHandler}
          >
            {item.name}
          </TaskToDo>
        ))}
      {props.type === "done" &&
        props.items.map((item, index) => (
          <TaskDone
            data-testid="TaskDone-1"
            item={item}
            onClickDeleteDoneHandler={(e) =>
              props.onClickDeleteDoneHandler(index)
            }
            key={index}
          >
            {item}
          </TaskDone>
        ))}
    </ul>
  );
};

export default TaskList;
