type ToastStatus = "error" | "loading" | "success"

export enum TodoStatus {
  doing,
  done,
}

export interface Todo {
  id: string
  name: string
  description: string
  done: TodoStatus
  due: Number
}

export interface Toast {
  show: boolean
  text: string
  duration: number
  status?: ToastStatus
}
