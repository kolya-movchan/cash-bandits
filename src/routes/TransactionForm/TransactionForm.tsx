import { useEffect } from 'react';
import { Form as BootstrapForm, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import classNames from 'classnames';

import {
  decrement,
  increment,
  saveTransaction,
  updateExpenses,
  updateIncome,
} from '../../reducers/balanceReducer';
import { Transaction } from '../../types/Transaction';
import { nameValidation } from '../../utils/regex';
import { useAppDispatch } from '../../app/hooks';

interface UpdateData {
  id: string;
  name: string;
  amount: number;
  type: string;
  onHide: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = {
  updateData?: UpdateData;
};

export const TransactionForm: React.FC<Props> = ({ updateData }) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Transaction>();

  const hideEditForm = () => {
    if (updateData) {
      updateData.onHide(false);
    }
  };

  const checkIfSameInfo = (dataValue: Transaction, UpdateDataValue: UpdateData) => {
    const duplicateName = dataValue.name === UpdateDataValue.name;
    const duplicateAmount = +dataValue.amount === UpdateDataValue.amount;
    const duplicateType = dataValue.type === UpdateDataValue.type;

    const allDuplicates = duplicateName && duplicateAmount && duplicateType;

    if (allDuplicates) {
      return;
    }
  };

  const onSubmit = (data: Transaction) => {
    if (updateData) {
      hideEditForm();
      checkIfSameInfo(data, updateData);
    }

    const newData = { ...data, amount: parseFloat(data.amount) };

    if (updateData && data.type === 'income') {
      dispatch(updateIncome({ ...newData, id: updateData.id }));
    } else if (updateData) {
      dispatch(updateExpenses({ ...newData, id: updateData.id }));
    }

    if (!updateData && data.type === 'income') {
      dispatch(increment(newData));
    } else if (!updateData) {
      dispatch(decrement(newData));
    }

    dispatch(saveTransaction());
    reset();
    toast.success(`Transaction ${updateData ? 'updated' : 'registered'} successfully!`);
  };

  useEffect(() => {
    if (updateData) {
      reset({
        name: updateData.name,
        type: updateData.type,
        amount: updateData.amount.toString(),
      });
    }
  }, [updateData, reset]);

  return (
    <>
      <Container
        className="container-sm"
        style={updateData ? { maxWidth: '250px' } : { maxWidth: '400px' }}
        hidden
      >
        {updateData?.onHide && (
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => updateData.onHide(false)}
            ></button>
          </div>
        )}

        <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
          <BootstrapForm.Group controlId="TransactionName">
            <BootstrapForm.Label>Transaction Name</BootstrapForm.Label>
            <BootstrapForm.Control
              className={classNames({ 'error-container': errors.name })}
              type="text"
              placeholder="e.g. Salary or Loan"
              {...register('name', {
                required: 'Transaction Name is required',
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

      <ToastContainer position="bottom-right" />
    </>
  );
};
