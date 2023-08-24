import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';

import { Dashboard, History, NotFound } from '../routes';
import { useAppSelector } from '../hooks/hooks';
import { Sidebar } from '../components/Sidebar/Sidebar';

export function App() {
  const { darkMode } = useAppSelector((state) => state.darkMode);

  return (
    <div className={classNames('app', { 'app--dark-mode': darkMode })}>
      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<History />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>

      <ToastContainer position="bottom-left" />
    </div>
  );
}
