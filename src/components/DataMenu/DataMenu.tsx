import { Dashboard } from '../../routes';
import { TransactionForm } from '../../routes/TransactionForm';
import { History } from '../../routes';
import { ChartComponent } from '../ChartComponent/ChartComponent';


export const DataMenu = () => {
  return (
    <div className="dashBoard">
      <Dashboard />
      <History />
    </div>
  );
};
