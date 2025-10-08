export default function TodoWrapper({ children } : { children: React.ReactNode }) {
  if (Object(children).length) {
    return children;
  }
  return <div className="text-center text-slate-700 py-5">No To-Dos found!</div>
}
