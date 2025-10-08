"use client";

import AddTodo from "@/components/add-todo";
import EmptyTodoList from "@/components/empty-todo-list";
import Filters, { type TFilter } from "@/components/filters";
import Loading from "@/components/loading";
import Todo, { type TTodo } from "@/components/todo";
import TodoWrapper from "@/components/todo-wrapper";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ToDoApp() {
  const [todoList, setTodoList] = useState<TTodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TFilter>("all");
  const [search, setSearch] = useState("");


  useEffect(() => {
    const localTodos = window.localStorage.getItem("todo-list");
    if (localTodos) {
      setTodoList(JSON.parse(localTodos));
    }
    setLoading(false);
  }, [])


  function updateTodoList(newTodoList: TTodo[]) {
    newTodoList.sort((todo1, todo2) => todo1.id - todo2.id);
    window.localStorage.setItem("todo-list", JSON.stringify(newTodoList));
    setTodoList(newTodoList);
  }


  return (
    <section className="max-w-lg mx-auto px-2">
      <h1 className="text-2xl leading-loose font-bold text-center text-slate-800 font-sans">
        To-Do List App
        <Image src="/file.svg" alt="file icon" width={20} height={20} className="inline-block ml-1" />
      </h1>
      <main className="mt-3">
        <AddTodo
          todoList={todoList}
          updateTodoList={updateTodoList}
        />

        {
          loading ?
            <Loading />
            :
            todoList.length ?
              (
                <section className="bg-slate-300 rounded-md mt-2 max-h-[calc(100dvh-120px)] overflow-auto transition-all">
                  <Filters
                    search={search}
                    totalTodos={todoList.length}
                    completedTodos={todoList.filter(todo => todo.done).length}
                    setSearch={setSearch}
                    setFilter={setFilter}
                  />

                  <div className="flex flex-col gap-2 p-2">
                    <TodoWrapper>
                      {
                        todoList
                          .filter(todo => filter === "completed" ? todo.done : filter === "active" ? !todo.done : true)
                          .filter(todo => search !== "" ? todo.todo.trim().toLowerCase().includes(search.trim().toLowerCase()) : true)
                          .map(todo => (
                            <Todo
                              key={todo.id}
                              {...todo}
                              todoList={todoList}
                              updateTodoList={updateTodoList}
                            />
                          ))
                      }
                    </TodoWrapper>
                  </div>
                </section>
              )
              :
              <EmptyTodoList />
        }

      </main>
    </section>
  );
}
