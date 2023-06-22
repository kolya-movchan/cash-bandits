import { Container } from 'react-bootstrap';

export function NotFound() {
  return (
    <Container>
       <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Oops... Error 404. Page not found.</h1>
      </div>
    </Container>
  );
}
