import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectorData = () => {
  return useAppSelector((state) => {
    return {
      balance: state.balance.balance,
      income: state.balance.income,
      expenses: state.balance.expenses,
      darkMode: state.darkMode.darkMode,
      add: state.form.add,
      edit: state.form.edit,
      history: state.balance.history,
      newTransactionId: state.NewTransaction.newTransactionId,
    }
  })
}
