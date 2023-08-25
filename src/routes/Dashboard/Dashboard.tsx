import classNames from 'classnames'

import { useAppDispatch, useSelectorData } from '../../hooks/hooks'
import { control } from '../../reducers/form'

import { ChartComponent } from '../../components/ChartComponent/ChartComponent'
import { FinanceCards } from '../../components/FinanceCards/FinanceCards'
import { History } from '../../routes'
import { TransactionForm } from '../TransactionForm'
import { FormStatus } from '../../types/FormStatus'

export const Dashboard = () => {
  const { balance, income, expenses, darkMode, add, edit } = useSelectorData()
  const dispatch = useAppDispatch()

  return (
    <div className="dashBoard">
      <div className="top-controls">
        <h1
          className={classNames('section-title', {
            'section-title--dark-mode': darkMode,
          })}
        >
          Dashboard
        </h1>
        <button>
          <img
            src="./add.svg"
            alt="add transaction icon"
            className={classNames('add-trans', { 'add-trans--dark-mode': darkMode })}
            onClick={() => dispatch(control(FormStatus.AddIsOn))}
          />
        </button>
      </div>
      <div className="finance-data">
        <FinanceCards total={{ balance, income, expenses }} />
        <ChartComponent />
      </div>
      <History />

      {add && !edit && <TransactionForm />}
    </div>
  )
}
