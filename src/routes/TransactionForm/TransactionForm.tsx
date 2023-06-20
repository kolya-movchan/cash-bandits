import React, { useRef, useState } from 'react';
import { Form as BootstrapForm, Container, Button } from 'react-bootstrap';
import { useForm, useWatch } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../../reducers/balanceReducer';
import { Transaction } from '../../types/Transaction';
import classNames from 'classnames';

export function TransactionForm() {
    const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Transaction>();

  const dispatch = useDispatch();
  const onSubmit = (data: Transaction) => {
    const { amount, type } = data;

    if (type === 'income') {
      dispatch(increment(+amount));
    } else {
      dispatch(decrement(+amount));
    }
    
    reset();
    toast.success('Transaction registered successfully!');

    console.log(data);
  };

  return (
    <>
      <Container className="container-sm" style={{ maxWidth: '400px' }}>
        <BootstrapForm onSubmit={handleSubmit(onSubmit)}>
          <BootstrapForm.Group controlId="exampleBootstrapForm.ControlInput1">
            <BootstrapForm.Label>Transaction Name</BootstrapForm.Label>
            <BootstrapForm.Control
              className={classNames({ 'error-container': errors.name })}
              type="text"
              placeholder="e.g. Salary or Gift"
              {...register('name', { required: 'Transaction Name is required' })}
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
              min={0}
              max={100000000000}
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
                  value: 100000000000,
                  message: 'Amount must be less than or equal to 100000000000',
                },
              })}
            />
            <p className='error'>
              {errors && errors.amount?.message}
            </p>
          </BootstrapForm.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" style={{ width: '150px' }}>
              Add
            </Button>
          </div>
        </BootstrapForm>
      </Container>

      <ToastContainer position="bottom-right" />
    </>
  );
}
