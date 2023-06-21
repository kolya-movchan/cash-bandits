// import React, { useRef, useState } from 'react';
import { Form as BootstrapForm, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { decrement, increment, updateExpenses, updateIncome } from '../../reducers/balanceReducer';
import { Transaction } from '../../types/Transaction';
import classNames from 'classnames';
import { useEffect } from 'react';

type Props = {
  updateData?: {
    id: string,
    name: string,
    amount: number,
    type: string,
    onHide: React.Dispatch<React.SetStateAction<boolean>>,
  },
}

export const TransactionForm: React.FC<Props> = ({ updateData }) => {
    const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Transaction>();
  

  const dispatch = useDispatch();
  const onSubmit = (data: Transaction) => {

    if (updateData) {
      updateData.onHide(false);

      const duplicateName = data.name === updateData.name;
      const duplicateAmount = +data.amount === updateData.amount;
      const duplicateType = data.type === updateData.type;

      const allDuplicates = duplicateName && duplicateAmount && duplicateType;

      if (allDuplicates) {
        return
      }
    }

    reset();
    toast.success(`Transaction ${updateData ? 'updated' : 'registered'} successfully!`);

    if (updateData && data.type === 'income') {
      dispatch(updateIncome({ ...data, amount: parseFloat(data.amount), id: updateData.id }));

      return
    } else if (updateData) {
      dispatch(updateExpenses({ ...data, amount: parseFloat(data.amount), id: updateData.id }));
      return
    }

    if (data.type === 'income') {
      dispatch(increment({ ...data, amount: parseFloat(data.amount) }));
    } else {
      dispatch(decrement({ ...data, amount: parseFloat(data.amount) }));
    }
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
      <Container className="container-sm" style={updateData ? { maxWidth: '250px' } : { maxWidth: '400px' }}
>
        {updateData?.onHide && (
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => updateData.onHide(false)}
            >
            </button>
          </div>
        )}

        <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
          <BootstrapForm.Group controlId="exampleBootstrapForm.ControlInput1">
            <BootstrapForm.Label>Transaction Name</BootstrapForm.Label>
            <BootstrapForm.Control
              className={classNames({ 'error-container': errors.name })}
              type="text"
              placeholder="e.g. Salary or Loan"
              {...register('name', { required: 'Transaction Name is required' })}
              defaultValue={updateData ? updateData.name : ''}
            />
            <p className='error'>
              {errors && errors.name?.message}
            </p>
          </BootstrapForm.Group>

          <BootstrapForm.Group controlId="exampleBootstrapForm.ControlSelect1" className="mb-4">
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

          <BootstrapForm.Group controlId="exampleBootstrapForm.ControlInput2" className="mb-3">
            <BootstrapForm.Label>Amount</BootstrapForm.Label>
            <BootstrapForm.Control
              type="number"
              className={classNames(
                { 'error-container': errors.amount }
              )}
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
              defaultValue={updateData ? updateData.amount : ''}
            />
            <p className={classNames(
              'error',
              {'error--narrow': updateData}
            )}>
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

      <ToastContainer position="bottom-left" />
    </>
  );
}
