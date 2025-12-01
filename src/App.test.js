import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from "react-router-dom";

test('renders Pokédex title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const title = screen.getByText(/Pokédex Mejorada/i);
  expect(title).toBeInTheDocument();
});
