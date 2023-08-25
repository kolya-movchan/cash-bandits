import classNames from 'classnames'
import { useEffect } from 'react'
import { Button, Container, Form as BootstrapForm } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import uniqid from 'uniqid'
import { useAppDispatch, useSelectorData } from '../../hooks/hooks'
import { control } from '../../reducers/form'
import { FormStatus } from '../../types/FormStatus'
import { Transaction, UpdateData } from '../../types/Transaction'
import { focusInput, processSubmit, processSuccess } from '../../utils/logic'
import { nameValidation } from '../../utils/regex'

type Props = {
  updateData?: UpdateData
}

export const TransactionForm: React.FC<Props> = ({ updateData }) => {
  const { darkMode } = useSelectorData()
  const dispatch = useAppDispatch()

  const { name, type, amount } = updateData ?? {}

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Transaction>()

  const onSubmit = (data: Transaction) => {
    const newTransactionId = uniqid()

    processSubmit(dispatch, updateData, data, newTransactionId)
    processSuccess(reset, dispatch, updateData, newTransactionId)
  }

  useEffect(() => {
    if (updateData) {
      reset({
        name,
        type,
        amount: amount?.toString(),
      })
    }

    focusInput(setFocus)
  }, [updateData])

  useEffect(() => focusInput(setFocus), [setFocus])

  return (
    <div className={classNames('editForm', { 'editForm--dark-mode': darkMode })}>
      <Container
        className={classNames({ 'payment-form-container--dark-mode': darkMode })}
      >
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className={classNames('btn-close', { 'btn-close-white': darkMode })}
            aria-label="Close"
            onClick={() =>
              dispatch(control(updateData ? FormStatus.EditIsOff : FormStatus.AddIsOff))
            }
          ></button>
        </div>

        <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
          <BootstrapForm.Group
            controlId="TransactionName"
            className="payment-form-section"
          >
            <BootstrapForm.Label>Transaction Name</BootstrapForm.Label>
            <BootstrapForm.Control
              className={classNames({ 'error-container': errors.name })}
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
              defaultValue={updateData ? name : ''}
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  dispatch(control(FormStatus.AddIsOff))
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
              defaultValue={updateData ? type : ''}
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
                  value: 0.01,
                  message: 'Amount must be more than 0',
                },
                max: {
                  value: 1000000,
                  message: 'Amount must be less than or equal to 1.000.000',
                },
              })}
              maxLength={11}
              defaultValue={updateData ? amount : ''}
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
