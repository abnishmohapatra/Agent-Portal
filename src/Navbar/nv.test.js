import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './nv';

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  it('renders logo and greeting text', () => {
    const greetingElement = screen.getByText('Inssure');
    expect(greetingElement).toBeInTheDocument();

    const logoElement = screen.getByAltText('userlogo');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders user profile information', () => {
    const nameElement = screen.getByText('Name');
    expect(nameElement).toBeInTheDocument();

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();

    const profileImage = screen.getByAltText('userloginlogo');
    expect(profileImage).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Navbar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
