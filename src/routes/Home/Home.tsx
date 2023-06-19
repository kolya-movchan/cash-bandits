import React from 'react';
import { Button, Form } from 'react-bootstrap';

export function Home() {
  return (
    <div className="home">
      <div className="balance">
        Current Balance: 1000
      </div>

      <div className="controls">
        <Button variant="primary" type="submit">
          Add Income
        </Button>

        <Button variant="primary" type="submit">
          Add Expense
        </Button>

        {/* <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select> */}
      </div>
    </div>
  );
}
