import Decimal from "decimal.js";
import { WritableDraft } from "immer/dist/internal";
import uniqid from "uniqid";
import { useAppDispatch } from "../app/hooks";
import { State } from "../types/Reducer";

export function roundAmount (amount: number) {
  return +new Decimal(amount).toFixed(2);
}

export function updateBalance (amount: number, state: State, income: boolean) {
  if (income) {
    const roundedIncome = new Decimal(state.income).plus(amount).toNumber();

   return roundedIncome;
  } else {
    const roundedExpenses = new Decimal(state.expenses).plus(amount).toNumber();

    return roundedExpenses;
  }
}

export function updateHistory (rounded: number, name: string, type: string, state: State, income: boolean) {
  return {
    // id: uniqid(),
    name,
    type,
    currentBalance: income ? state.balance + rounded : state.balance - rounded,
    amount: rounded,
    time: new Date().toISOString(),
  };
}

export function updateBalanceAfterDeletion (value: WritableDraft<State>, id: string, amount: number, income: boolean) {
  value.history = value.history.filter(transaction => transaction.id !== id);

  const decimalAmount = new Decimal(amount);

  if (income) {
    value.balance = new Decimal(value.balance).minus(decimalAmount).toNumber();
    value.income = new Decimal(value.income).minus(decimalAmount).toNumber();
  } else {
    value.balance = new Decimal(value.balance).plus(decimalAmount).toNumber();
    value.expenses = new Decimal(value.expenses).minus(decimalAmount).toNumber();
  }
}
