const CompleteStatusChange = (
  completedTodoItem,
  todoitems,
  setTodoItems,
  completedTodos,
  setCompletedTodos
) => {
  // status change completeTodoitem and push to todoitems
  completedTodoItem.status = "Todo";
  setTodoItems([...todoitems, completedTodoItem]);

  // filter completeTodoItem from completedToddos
  const filteredCompletedItems = completedTodos.filter((item) => {
    return (
      item.todoValue !== completedTodoItem.todoValue ||
      item.completeDate !== completedTodoItem.completeDate
    );
  });

  setCompletedTodos(filteredCompletedItems);
};

export default CompleteStatusChange;
