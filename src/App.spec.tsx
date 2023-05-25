import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import App from "./App";

describe("App", () => {
  test("includes the header", () => {
    const app = render(<App />);
    app.getByText("Meter Readings");
  });
});

describe('FiveDigitInput', () => {
  it('does not display an error message for valid input', () => {
    render(<App />);
    const input = screen.getByTestId('input');
    const submitButton = screen.getByTestId('button');

    // Enter a valid number (5 digits long)
    userEvent.type(input, '99999');
    fireEvent.click(submitButton);

    const errorMessage = screen.queryByText('This is an invalid meter reading.');
    expect(errorMessage).not.toBeInTheDocument();
  });
  it('displays an error message for invalid input', () => {
    render(<App />);
    const input = screen.getByTestId('input');
    const submitButton = screen.getByTestId('button');

    // Enter an invalid number (4 digits long)
    userEvent.type(input, '1234');
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('This is an invalid meter reading.');
    expect(errorMessage).toBeInTheDocument();
  });
});

  describe('Higher than the last inmput', () => {
    it('does not display an error message for valid input', () => {
      render(<App />);
      const input = screen.getByTestId('input');
      const submitButton = screen.getByTestId('button');
  
      // Enter a valid number (5 digits long)
      userEvent.type(input, '99998');
      fireEvent.click(submitButton);

      userEvent.type(input, '99999');
      fireEvent.click(submitButton);
  
      const errorMessage = screen.queryByText('This is an invalid meter reading.');
      expect(errorMessage).not.toBeInTheDocument();
    });
    it('displays an error message for invalid input', () => {
      render(<App />);
      const input = screen.getByTestId('input');
      const submitButton = screen.getByTestId('button');
  
      // Enter an invalid number (4 digits long)
      userEvent.type(input, '99999');
      fireEvent.click(submitButton);

      userEvent.type(input, '99998');
      fireEvent.click(submitButton);
  
      const errorMessage = screen.getByText('This is an invalid meter reading.');
      expect(errorMessage).toBeInTheDocument();
    });
  });
