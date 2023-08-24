import { Container } from 'react-bootstrap';
import { useAppSelector } from '../../hooks/hooks';

export function NotFound() {
  const { darkMode } = useAppSelector((state) => state.darkMode);

  return (
    <Container className="vh-100">
      <div
        className={`d-flex flex-column justify-content-center align-items-center h-100 ${
          darkMode ? 'text-white' : ''
        }`}
      >
        <h1>Oops... Error 404. Page not found.</h1>
      </div>
    </Container>
  );
}
