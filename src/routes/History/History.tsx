import classNames from 'classnames'
import { useLayoutEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { HistoryTable } from '../../components/HistoryTable/HistoryTable'
import { useAppDispatch, useModalWindow, useSelectorData } from '../../hooks/hooks'
import { EditingTransaction } from '../../types/Transaction'
import { TransactionForm } from '../TransactionForm'
import NoData from './NoData'

export const History = () => {
  const { history, darkMode, add, edit } = useSelectorData()

  const [editingTransaction, setEditingTransaction] = useState<EditingTransaction | undefined>()
  const [isFullMode, setIsFullMode] = useState(false)
  const locationData = useLocation()

  useLayoutEffect(() => {
    if (locationData.pathname.includes('/transaction')) {
      setIsFullMode(false)
    } else {
      setIsFullMode(true)
    }

    document.documentElement.scrollTop = 0
  }, [])

  const dispatch = useAppDispatch()

  return (
    <>
      {!history.length ? (
        <NoData isFullMode={isFullMode} />
      ) : (
        <div
          className={classNames('history-container', {
            'history-container--full': !isFullMode,
            'history-container--animated': isFullMode && history.length === 1,
          })}
        >
          <div className="history-wrapper">
            <div className="history-top">
              <h2
                className={classNames('section-heading', {
                  'section-heading--dark-mode': darkMode,
                })}
              >{`${
                locationData.pathname.includes('/transaction') ? 'All' : 'Recent'
              } Transactions`}</h2>
              {isFullMode && (
                <div className="action-controls">
                  <button
                    className="remove-all"
                    onClick={useModalWindow(dispatch, darkMode)}
                  >
                    Remove all
                  </button>

                  <NavLink className="view-all" to="/transactions">
                    <span style={{ marginRight: '3px' }}>View all </span>
                    <span className="view-all__eagle">&gt;</span>
                  </NavLink>
                </div>
              )}
            </div>
            {history.length > 0 && (
              <HistoryTable
                history={history}
                isFullMode={isFullMode}
                onEditInfo={setEditingTransaction}
              />
            )}
            {!add && edit && editingTransaction && (
              <TransactionForm updateData={{ ...editingTransaction }} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
