const StatusChange = (
  e,
  todoItemChanged,
  todoitems,
  setTodoItems,
  completedTodos,
  setCompletedTodos
) => {
  let modifiedTodos = [];
  let existingTodos = [...todoitems];
  const updatedCompletedTodos = [...completedTodos];
  existingTodos.forEach((existingTodoItem, index) => {
    if (
      todoItemChanged.todoValue === existingTodoItem.todoValue &&
      todoItemChanged.completeDate === existingTodoItem.completeDate
    ) {
      const tempData = { ...existingTodoItem, status: e.target.value };
      if (tempData.status === "Completed") {
        updatedCompletedTodos.push(tempData);
      } else {
        modifiedTodos.push(tempData);
      }
    } else {
      modifiedTodos.push(existingTodoItem);
    }
  });
  setTodoItems(modifiedTodos);
  setCompletedTodos(updatedCompletedTodos);
};
export default StatusChange;
