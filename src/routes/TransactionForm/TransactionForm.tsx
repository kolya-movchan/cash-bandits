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
import { useLocation } from 'react-router-dom';

export function TransactionForm() {
    const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Transaction>();

  const dispatch = useDispatch();
  const onSubmit = (data: Transaction) => {
    // console.log(data);

    reset();
    toast.success('Transaction registered successfully!');

    if (state && data.type === 'income') {
      dispatch(updateIncome({ ...data, amount: parseFloat(data.amount), id: state.id }));

      return
    } else if (state) {
      dispatch(updateExpenses({ ...data, amount: parseFloat(data.amount), id: state.id }));

      return
    }

    if (data.type === 'income') {
      dispatch(increment({ ...data, amount: parseFloat(data.amount) }));
    } else {
      dispatch(decrement({ ...data, amount: parseFloat(data.amount) }));
    }
  };

  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    // console.log(state);
  }, [])

  return (
    <>
      <Container className="container-sm" style={{ maxWidth: '400px' }}>
        <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
          <BootstrapForm.Group controlId="exampleBootstrapForm.ControlInput1">
            <BootstrapForm.Label>Transaction Name</BootstrapForm.Label>
            <BootstrapForm.Control
              className={classNames({ 'error-container': errors.name })}
              type="text"
              placeholder="e.g. Salary or Loan"
              {...register('name', { required: 'Transaction Name is required' })}
              defaultValue={state && state.name}
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
              defaultValue={state && state.type}
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
              defaultValue={state && state.amount}
            />
            <p className='error'>
              {errors && errors.amount?.message}
            </p>
          </BootstrapForm.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" style={{ width: '150px' }}>
              {state ? 'Update' : 'Add'}
            </Button>
          </div>
        </BootstrapForm>
      </Container>

      <ToastContainer position="bottom-right" />
    </>
  );
}
