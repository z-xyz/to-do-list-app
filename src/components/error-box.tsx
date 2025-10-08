export default function ErrorBox({ref}: {ref: React.Ref<HTMLSpanElement>}) {
  return (
    <span 
      ref={ref} 
      className="absolute min-w-sm text-left rounded-sm text-sm text-red-500 left-1 -top-5 z-10 empty:hidden"
    >
    </span>
  )
}
