export type TTodo = {
  id: number,
  todo: string,
  done: boolean
}

type TTodoList = TTodo & {
  todoList: TTodo[],
  updateTodoList: (newTodoList: TTodo[]) => void
}

export default function Todo({ id, done, todo, todoList, updateTodoList }: TTodoList) {

  function updateTodoStatus(id: number) {
    const [todo] = todoList.filter(todo => todo.id === id);
    const otherTodos = todoList.filter(todo => todo.id !== id);
    const newTodoList = [...otherTodos, { ...todo, done: !todo.done }];
    updateTodoList(newTodoList);
  }

  function deleteTodo(id: number) {
    const newTodoList = todoList.filter(todo => todo.id !== id);
    updateTodoList(newTodoList);
  }

  return (
    <div className={`${done ? "bg-slate-100/90" : "bg-slate-100"} flex gap-2 items-center min-h-10 rounded-md`}>
      <label htmlFor={`${id}`} className="min-h-full peer #bg-blue-500 self-stretch px-1 grid place-items-center pl-2">
        <input type="checkbox" id={`${id}`} name={`${id}`}
          className="size-5 peer accent-green-500"
          checked={done}
          onChange={() => updateTodoStatus(id)}
        />
      </label>
      <p className={`w-full ${done ? "line-through text-slate-600" : "text-slate-800"} hyphens-auto text-wrap overflow-hidden text-ellipsis`}>{todo}</p>
      <button
        type="button"
        className="bg-slate-500 min-h-full self-stretch block hover:bg-red-500 select-none focus:bg-red-500 active:bg-red-500 transition-all rounded-r-md text-background text-sm px-2 cursor-pointer"
        onClick={() => deleteTodo(id)}
      >
        Delete
      </button>
    </div>
  )
}
