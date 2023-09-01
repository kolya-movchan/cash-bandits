import classNames from 'classnames'
import React from 'react'
import { useSelectorData } from '../../hooks/hooks'
import { formatNumber } from '../../utils/calculations'

type Props = {
  title: string
  amount: number
  icon: string
}

export const MoneyCard: React.FC<Props> = ({ title, amount, icon }) => {
  const { darkMode } = useSelectorData()

  return (
    <div
      className={classNames('money-card', {
        'money-card--total': title.includes('balance'.toLowerCase()),
        'money-card--income': title.includes('income'.toLowerCase()),
        'money-card--expense': title.includes('expense'.toLowerCase()),
        'money-card--total--dark-mode': darkMode,
        'money-card--income--dark-mode': darkMode,
        'money-card--expense--dark-mode': darkMode,
        'money-card--dark-mode': darkMode,

      })}
    >
      {' '}
      <div
        className={classNames('money-card__icon-container', {
          'money-card__icon-container--dark-mode': darkMode,
        })}
      >
        <img src={icon} alt="wallet total balance icon" className="money-card__icon" />
      </div>
      <div className="money-card__balance">
        <span
          className={classNames('money-card__title', {
            'money-card__title--dark-mode': darkMode,
          })}
        >
          {title}
        </span>
        <span
          className={classNames('money-card__sum', {
            'money-card__sum--dark-mode': darkMode,
          })}
        >
          {amount >= 0
            ? `$${formatNumber(amount)}`
            : `-$${formatNumber(amount).slice(1)}`}
        </span>
      </div>
    </div>
  )
}
