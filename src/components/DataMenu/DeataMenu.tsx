import { Dashboard } from '../../routes';
import { TransactionForm } from '../../routes/TransactionForm';
import {  History } from '../../routes';


export const DeataMenu = () => {
  return (
    <div className="dashBoard">
      <Dashboard />
      <TransactionForm />
      <History />
    </div>
  );
};
