import { useRef } from "react";
import ErrorBox from "./error-box";
import { validateInput } from "@/utils";
import { type TTodo } from "./todo";

type TAddTodo = {
  todoList: TTodo[],
  updateTodoList: (newTodoList: TTodo[]) => void
}

export default function AddTodo({ todoList, updateTodoList }: TAddTodo) {
  const errorRef = useRef<HTMLSpanElement>(null);

  function addTodo(formData: FormData) {
    const todo = (formData.get("todo") as string).trim();
    const validate = validateInput(todo);
    if (validate.message !== "success") {
      if (errorRef?.current) {
        errorRef.current.innerHTML = validate.message;
        setTimeout(() => errorRef.current!.innerHTML = "", 3000);
      }
    }
    else {
      const id = todoList.length ? todoList[todoList.length - 1].id + 1 : 0;
      const newTodoList = [...todoList, { id, todo: todo.trim(), done: false }];
      updateTodoList(newTodoList);
    }
  }

  return (
    <form action={addTodo} className="flex gap-2 justify-center w-full px-1">
      <label htmlFor="todo" className="w-full relative">
        <input type="text" id="todo" name="todo" placeholder="Enter To-Do..."
          className="border p-2 rounded-md w-full"
        />
        <ErrorBox ref={errorRef} />
      </label>
      <button type="submit"
        className="text-background shrink-0 cursor-pointer font-medium bg-green-500 hover:bg-green-600 transition-colors px-4 py-2 rounded-md"
      >
        + Add
      </button>
    </form>
  )
}
