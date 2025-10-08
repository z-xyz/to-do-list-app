export default function Loading() {
  return (
    <div className="min-h-28 bg-slate-200 mt-2 space-y-2 animate-pulse rounded-md p-2">
      {
        Array.from({length: 3}, (_, i) => (
          <div key={i} className="bg-slate-300 w-full rounded-md" style={{height: (i+1)*30}}/>
        ) )
      }
    </div>
  )
}
