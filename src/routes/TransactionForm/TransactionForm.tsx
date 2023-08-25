import { useEffect, useRef } from 'react'
import { Form as BootstrapForm, Container, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import classNames from 'classnames'

import {
  decrement,
  increment,
  saveTransaction,
  updateExpenses,
  updateIncome,
} from '../../reducers/balance'
import { Transaction } from '../../types/Transaction'
import { nameValidation } from '../../utils/regex'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { control } from '../../reducers/form'
import { FormMode } from '../../types/Reducer'
import { NewTransaction, setNewTranscationId } from '../../reducers/newTransaction'
import uniqid from 'uniqid'

interface UpdateData {
  id: string
  name: string
  amount: number
  type: string
}

type Props = {
  updateData?: UpdateData
}

export const TransactionForm: React.FC<Props> = ({ updateData }) => {
  const { darkMode } = useAppSelector((state) => state.darkMode)
  const dispatch = useAppDispatch()
  const { add, edit } = useAppSelector<FormMode>((state) => state.form)
  const { newTransactionId } = useAppSelector<NewTransaction>(
    (state) => state.NewTransaction
  )

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Transaction>()

  const hideEditForm = () => {
    if (updateData) {
      dispatch(control('editIsOff'))
    } else {
      dispatch(control('addIsOff'))
    }
  }

  const checkIfSameInfo = (dataValue: Transaction, UpdateDataValue: UpdateData) => {
    const duplicateName = dataValue.name === UpdateDataValue.name
    const duplicateAmount = +dataValue.amount === UpdateDataValue.amount
    const duplicateType = dataValue.type === UpdateDataValue.type

    const allDuplicates = duplicateName && duplicateAmount && duplicateType

    if (allDuplicates) {
      return true
    }

    return false
  }

  const onSubmit = (data: Transaction) => {
    if (updateData) {
      hideEditForm()
      const sameData = checkIfSameInfo(data, updateData)

      if (sameData) {
        return
      }
    }

    const newTransactionId = uniqid()

    const newData = { ...data, amount: parseFloat(data.amount), id: newTransactionId }

    if (updateData && data.type === 'income') {
      dispatch(updateIncome({ ...newData, id: updateData.id }))
    } else if (updateData) {
      dispatch(updateExpenses({ ...newData, id: updateData.id }))
    }

    if (!updateData && data.type === 'income') {
      dispatch(increment(newData))
    } else if (!updateData) {
      dispatch(decrement(newData))
    }

    dispatch(saveTransaction())
    reset()
    const message = `Transaction ${updateData ? 'updated' : 'registered'} successfully!`

    toast.success(message, {
      autoClose: 1500,
    })

    dispatch(control('addIsOff'))
    dispatch(setNewTranscationId(updateData ? updateData?.id : newTransactionId))
  }

  useEffect(() => {
    if (updateData) {
      reset({
        name: updateData.name,
        type: updateData.type,
        amount: updateData.amount.toString(),
      })
    }

    setTimeout(() => {
      setFocus('name')
    }, 150)
  }, [updateData, reset])

  // const nameInput: React.MutableRefObject<null | HTMLInputElement> = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setFocus('name')
    }, 150)
  }, [setFocus])

  return (
    <div className={classNames('editForm', { 'editForm--dark-mode': darkMode })}>
      <Container
        className={classNames({ 'payment-form-container--dark-mode': darkMode })}
      >
        {/* {onFormShow && ( */}
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => dispatch(control(updateData ? 'editIsOff' : 'addIsOff'))}
          ></button>
        </div>
        {/* )} */}

        <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
          <BootstrapForm.Group
            controlId="TransactionName"
            className="payment-form-section"
          >
            <BootstrapForm.Label>Transaction Name</BootstrapForm.Label>
            <BootstrapForm.Control
              className={classNames({ 'error-container': errors.name }, 'ff', {
                ff: darkMode,
              })}
              type="text"
              placeholder="e.g. Salary or Loan"
              {...register('name', {
                required: 'Transaction Name is required',
                validate: {
                  noOnlySpaces: (v) => {
                    const trimmedValue = v.trim()
                    if (trimmedValue.length === 0) {
                      return 'Name cannot be only spaces'
                    }
                    return true
                  },
                  minLength: (v) => v.trim().length >= 1,
                },
                pattern: {
                  value: nameValidation,
                  message: 'Invalid Transaction Name',
                },
                maxLength: {
                  value: 30,
                  message: 'Name cannot be longer than 30 characters',
                },
              })}
              defaultValue={updateData ? updateData.name : ''}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  dispatch(control('addIsOff'))
                }
              }}
            />
            <p className="error">{errors && errors.name?.message}</p>
          </BootstrapForm.Group>

          <BootstrapForm.Group controlId="TransactionType" className="mb-4">
            <BootstrapForm.Label>Type</BootstrapForm.Label>
            <BootstrapForm.Select
              as="select"
              {...register('type', { required: 'Transaction Type is required' })}
              defaultValue={updateData ? updateData.type : ''}
            >
              <option disabled>Choose Transaction Type</option>
              <option value="income">Income</option>
              <option value="expenses">Expenses</option>
            </BootstrapForm.Select>
          </BootstrapForm.Group>

          <BootstrapForm.Group controlId="TransactionAmount" className="mb-3">
            <BootstrapForm.Label>Amount</BootstrapForm.Label>
            <BootstrapForm.Control
              step={0.01}
              type="number"
              className={classNames({ 'error-container': errors.amount })}
              {...register('amount', {
                required: 'Amount is required',
                min: {
                  value: 0,
                  message: 'Amount must be greater than or equal to 0',
                },
                max: {
                  value: 10000000000,
                  message: 'Amount must be less than or equal to 100.000.000.000',
                },
              })}
              maxLength={11}
              defaultValue={updateData ? updateData.amount : ''}
            />
            <p className={classNames('error', { 'error--narrow': updateData })}>
              {errors && errors.amount?.message}
            </p>
          </BootstrapForm.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" style={{ width: '150px' }}>
              {updateData ? 'Update' : 'Add'}
            </Button>
          </div>
        </BootstrapForm>
      </Container>
    </div>
  )
}
