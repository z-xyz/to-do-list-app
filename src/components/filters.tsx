import { Dispatch, SetStateAction } from "react";

export type TFilter = "all" | "completed" | "active";

type TFilters = {
  search: string,
  totalTodos: number,
  completedTodos: number,
  setSearch: Dispatch<SetStateAction<string>>,
  setFilter: Dispatch<SetStateAction<TFilter>>
}

export default function Filters({search, totalTodos, completedTodos, setSearch, setFilter}: TFilters) {
  return (
    <div className="flex gap-2 bg-inherit p-2 sticky top-0 shadow shadow-foreground/20 mb-2 z-10 flex-wrap">
      <h1 className="font-bold text-xl flex justify-between w-full items-center px-1 text-slate-800">
        To-Do List
        <span className="block text-foreground/90 text-base">{completedTodos}/{totalTodos}</span>
      </h1>
      <div className="flex gap-2 w-full">
        <label htmlFor="search" className="w-full">
          <input 
            type="search" name="search" id="search" placeholder="Search ..." 
            value={search} onChange={(e) => setSearch(e.target.value)} 
            className="border w-full p-2 rounded-md bg-slate-100" 
          />
        </label>
        <select 
          className="border rounded-md p-2 bg-slate-100" 
          onChange={(e) => setFilter(e.target.value as TFilter)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>
    </div>
  )
}
