import { MoneyCard } from '../MoneyCard/MoneyCard'

interface Total {
  balance: number
  income: number
  expenses: number
}

type Props = {
  total: Total
}

export const FinanceCards: React.FC<Props> = ({ total }) => {
  const { balance, income, expenses } = total

  return (
    <div className="finance-cards">
      <MoneyCard title="Total balance" amount={balance} icon="./wallet-total.svg" />
      <MoneyCard title="Total income" amount={income} icon="./wallet-plus.svg" />
      <MoneyCard title="Total expenses" amount={expenses} icon="./wallet-minus.svg" />
    </div>
  )
}
