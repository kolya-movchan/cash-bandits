export interface Transaction {
  name: string
  type: string
  amount: string
}

export type EditingTransaction = {
  id: string
  name: string
  amount: number
  type: string
}

export interface UpdateData {
  id: string
  name: string
  amount: number
  type: string
}
