interface Payload {
  amount: number;
  name: string;
  type: string;
}

export interface TransactionPayload extends Payload {
  id?: string,
}

export interface DeletePayload {
  id: string,
  amount: number,
}

export interface History extends Payload {
  id: string,
  currentBalance: number,
  time: string,
}

export interface State {
  balance: number,
  income: number,
  expenses: number,
  history: History[],
}
