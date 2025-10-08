export function validateInput(input: string) {
  switch (input) {
    case "":
      return {message: "Input can't be empty!"}
    default:
      return {message: "success"}
  }
}