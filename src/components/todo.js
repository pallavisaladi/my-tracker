import { useState } from "react";
import InputComponent from "./inputComponent";
import StatusChange from "./statusChange";
import "../components/todo.css";
import "../components/inputComponent.css";
import Modal from "../components/modal";
import CompleteStatusChange from "./completeStatusChange";
import Accordion from "./accordion";
import Sort from "./sort";

const Todo = () => {
  const [todoitems, setTodoItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
  const status = ["Todo", "InProgess", "Completed"];
  const [updatingInProgressEntry, setUpdatingInProgressEntry] = useState(null);
  const editTodo = (ele) => {
    setUpdatingInProgressEntry(ele);
    setShowModal(true);
  };
  const deleteTodo = (ele) => {
    let filteredTodos = todoitems.filter((todoElement) => {
      return (
        ele.todoValue !== todoElement.todoValue ||
        ele.completeDate !== todoElement.completeDate ||
        ele.status !== todoElement.status
      );
    });
    setTodoItems(filteredTodos);
  };

  const addTodo = (todoValue, dateValue) => {
    if (todoValue !== "" && dateValue !== "") {
      // let todos = [];
      // for (let i = 0; i < todoitems.length; i++) {
      //   todos[i] = todoitems[i];
      // }
      if (
        !todoitems.some(
          (ele) => todoValue === ele.todoValue && dateValue === ele.completeDate
        )
      ) {
        let todos = [...todoitems];
        todos.push({
          todoValue: todoValue,
          completeDate: dateValue,
          status: "Todo",
        });
        setTodoItems(todos);
      } else {
        setErrorMessage("This todo is already present");
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } else {
      setErrorMessage("Please enter all the fields");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const updateTodo = (todoValue, dateValue) => {
    //no change in values
    if (
      todoValue === updatingInProgressEntry.todoValue &&
      dateValue === updatingInProgressEntry.completeDate
    ) {
      closeModalHandler();
    } else {
      const existingTodos = [...todoitems];
      const updatedItems = existingTodos.map((existingItem) => {
        if (
          existingItem.todoValue === updatingInProgressEntry.todoValue &&
          existingItem.completeDate === updatingInProgressEntry.completeDate
        ) {
          const newItem = {
            ...existingItem,
            todoValue: todoValue,
            completeDate: dateValue,
          };
          closeModalHandler();
          return newItem;
        } else {
          return existingItem;
        }
      });
      setTodoItems(updatedItems);
    }
  };

  const onSort = (e, data, setSortedData) => {
    console.log(e.target.value);

    const newData = [...data];
    newData.sort((a, b) => {
      let calculation =
        new Date(a.completeDate).getDate() - new Date(b.completeDate).getDate();
      if (e.target.value === "DESC") {
        calculation = calculation * -1;
      }
      return calculation;
    });
    console.log("New Data", newData);
    setSortedData(newData);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };
  return (
    <div className="mainContainer">
      <h1 className="titleContent">Daily Tracker</h1>
      {showModal ? (
        <Modal
          isOpen={showModal}
          onClose={closeModalHandler}
          headerText="Edit Todo"
        >
          <InputComponent
            actionType="Update Todo"
            buttonAction={updateTodo}
            initialDateValue={updatingInProgressEntry.completeDate}
            initialInputValue={updatingInProgressEntry.todoValue}
          />
        </Modal>
      ) : null}
      <InputComponent
        errorMessage={errorMessage}
        actionType="Add Todo"
        buttonAction={addTodo}
      />
      <Accordion
        header="Pending Todos"
        className="pendingAccordion"
        initialAccordionClose
      >
        <div className="sortContainer">
          {todoitems.length > 1 && (
            <Sort onSort={(e) => onSort(e, todoitems, setTodoItems)} />
          )}
          <ul className="todoItems">
            {todoitems.map((ele, index) => {
              return (
                <div
                  className="items"
                  key={ele.todoValue + ele.completeDate + ele.status}
                >
                  <li>{ele.todoValue}</li>
                  <div className="rightContainer">
                    <span className="goalDate">{ele.completeDate}</span>
                    <select
                      className="statusDropdown"
                      onChange={(e) =>
                        StatusChange(
                          e,
                          ele,
                          todoitems,
                          setTodoItems,
                          completedTodos,
                          setCompletedTodos
                        )
                      }
                    >
                      {status.map((stat, index) => (
                        <option key={stat} value={stat}>
                          {stat}
                        </option>
                      ))}
                    </select>
                    <button
                      className="buttonAction"
                      onClick={() => editTodo(ele, index)}
                    >
                      Edit
                    </button>
                    <button
                      className="buttonAction"
                      onClick={() => deleteTodo(ele, index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </Accordion>
      <Accordion header="Completed Todos" className="pendingAccordion">
        <div className="sortContainer">
          {completedTodos.length > 1 && (
            <Sort
              onSort={(e) => onSort(e, completedTodos, setCompletedTodos)}
            />
          )}
          <ul className="todoItems">
            {completedTodos.map((completedTodoItem, index) => {
              return (
                <div
                  className="items"
                  key={
                    completedTodoItem.todoValue + completedTodoItem.completeDate
                  }
                >
                  {completedTodoItem.todoValue +
                    " " +
                    completedTodoItem.completeDate}
                  <button
                    className="buttonAction"
                    onClick={() =>
                      CompleteStatusChange(
                        completedTodoItem,
                        todoitems,
                        setTodoItems,
                        completedTodos,
                        setCompletedTodos
                      )
                    }
                  >
                    Move to pending tasks
                  </button>
                </div>
              );
            })}
          </ul>
        </div>
      </Accordion>
    </div>
  );
};
export default Todo;
