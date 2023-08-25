import { PayloadAction } from '@reduxjs/toolkit'
import Decimal from 'decimal.js'
import { WritableDraft } from 'immer/dist/internal'
import { toast } from 'react-toastify'
import { State, TransactionPayload } from '../types/Reducer'

export const loadBankFromLocalStorage = () => {
  try {
    const transactionsFromStorage = localStorage.getItem('bank')
    if (transactionsFromStorage === null) {
      return undefined
    }
    return JSON.parse(transactionsFromStorage)
  } catch (error) {
    return undefined
  }
}

export const saveTransactionInStorage = (state: State) => {
  try {
    const transactionsForStorage = JSON.stringify(state)
    localStorage.setItem('bank', transactionsForStorage)
  } catch {
    toast.error('Failed to Save Transaction')
  }
}

export const incrementBalance = (
  state: State,
  action: PayloadAction<TransactionPayload>
) => {
  const { amount, name, type, id } = action.payload

  const roundedAmount = roundAmount(amount)
  const updatedBalance = updateBalance(roundedAmount, state, true)
  const updatedHistory = updateHistory(roundedAmount, name, type, state, true)

  state.balance += roundedAmount
  state.income = updatedBalance
  state.history.push({ ...updatedHistory, id })
}

export const decrementBalance = (
  state: State,
  action: PayloadAction<TransactionPayload>
) => {
  const { amount, name, type, id } = action.payload

  const roundedAmount = roundAmount(amount)
  const updatedBalance = updateBalance(roundedAmount, state, false)
  const updatedHistory = updateHistory(roundedAmount, name, type, state, false)

  state.balance -= roundedAmount
  state.expenses = updatedBalance
  state.history.push({ ...updatedHistory, id })
}

export const incrementBalanceIncome = (
  state: State,
  action: PayloadAction<TransactionPayload>
) => {
  const { amount, name, type, id } = action.payload

  const targetTransaction = state.history.find((transaction) => transaction.id === id)

  if (targetTransaction && targetTransaction?.type === type) {
    state.balance = new Decimal(state.balance)
      .minus(targetTransaction.amount)
      .plus(amount)
      .toNumber()
    state.income = new Decimal(state.income)
      .minus(targetTransaction.amount)
      .plus(amount)
      .toNumber()
  } else if (targetTransaction) {
    state.balance = new Decimal(state.balance)
      .plus(targetTransaction.amount)
      .plus(amount)
      .toNumber()
    state.expenses = new Decimal(state.expenses)
      .minus(targetTransaction.amount)
      .toNumber()
    state.income = new Decimal(state.income).plus(amount).toNumber()
  }
  state.history = state.history.map((transaction) => {
    if (transaction.id === id) {
      return {
        ...transaction,
        name,
        amount,
        type,
        currentBalance: state.balance,
      }
    }
    return transaction
  })
}

export const decrementBalanceIncome = (
  state: State,
  action: PayloadAction<TransactionPayload>
) => {
  const { amount, name, type, id } = action.payload

  const targetTransaction = state.history.find((transaction) => transaction.id === id)

  if (targetTransaction && targetTransaction?.type === type) {
    state.balance = new Decimal(state.balance)
      .plus(targetTransaction.amount)
      .minus(amount)
      .toNumber()
    state.expenses = new Decimal(state.expenses)
      .minus(targetTransaction.amount)
      .plus(amount)
      .toNumber()
  } else if (targetTransaction) {
    state.balance = new Decimal(state.balance)
      .minus(targetTransaction.amount)
      .minus(amount)
      .toNumber()
    state.expenses = new Decimal(state.expenses).plus(amount).toNumber()
    state.income = new Decimal(state.income).minus(targetTransaction.amount).toNumber()
  }
  state.history = state.history.map((transaction) => {
    if (transaction.id === id) {
      return {
        ...transaction,
        name,
        amount,
        type,
        currentBalance: state.balance,
      }
    }
    return transaction
  })
}

export function roundAmount(amount: number) {
  return +new Decimal(amount).toFixed(2)
}

export function updateBalance(amount: number, state: State, income: boolean) {
  if (income) {
    const roundedIncome = new Decimal(state.income).plus(amount).toNumber()

    return roundedIncome
  } else {
    const roundedExpenses = new Decimal(state.expenses).plus(amount).toNumber()

    return roundedExpenses
  }
}

export function updateHistory(
  rounded: number,
  name: string,
  type: string,
  state: State,
  income: boolean
) {
  return {
    name,
    type,
    currentBalance: income ? state.balance + rounded : state.balance - rounded,
    amount: rounded,
    time: new Date().toISOString(),
  }
}

export function updateBalanceAfterDeletion(
  value: WritableDraft<State>,
  id: string,
  amount: number,
  income: boolean
) {
  value.history = value.history.filter((transaction) => transaction.id !== id)

  const decimalAmount = new Decimal(amount)
  const amountToAddOrSubtract = income ? -decimalAmount : decimalAmount

  value.balance = new Decimal(value.balance).plus(amountToAddOrSubtract).toNumber()

  if (income) {
    value.income = new Decimal(value.income).plus(amountToAddOrSubtract).toNumber()
  } else {
    value.expenses = new Decimal(value.expenses).minus(amountToAddOrSubtract).toNumber()
  }
}

export function removeAllData(state: State, initialData: State) {
  state.balance = 0
  state.income = 0
  state.expenses = 0
  state.history = []

  localStorage.setItem('bank', JSON.stringify(initialData))
}
