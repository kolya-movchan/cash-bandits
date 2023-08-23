import classNames from 'classnames'
import React from 'react'
import { formatNumber } from '../../utils/calculations'

type Props = {
  title: string,
  amount: number,
  icon: string,
}

export const MoneyCard:React.FC<Props> = ({ title, amount, icon }) => {
  return (
    <div className={classNames(
      'money-card',
      {'money-card--total': title.includes('balance'.toLowerCase())}
    )}>      <div className="money-card__icon-container">
        <img
          src={icon}
          alt="wallet total balance icon"
          className="money-card__icon"
        />
      </div>

      <div className='money-card__balance'>
        <span className="money-card__title">{title}</span>
        <span className="money-card__sum">
          {amount >= 0
            ? `$${formatNumber(amount)}`
            : `-$${formatNumber(amount).slice(1)}`}
        </span>
      </div>
  </div>
  )
}
