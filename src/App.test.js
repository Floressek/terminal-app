import {render, screen} from '@testing-library/react';
import App from './App';
import Terminal from './Terminal';
import React from 'react';


// Mock the Terminal component to isolate App testing
jest.mock('./Terminal', () => {
    return function MockTerminal() {
        return <div data-testid="terminal-component">Terminal Component</div>;
    };
});

describe('App Component', () => {
    test('renders Terminal component', () => {
        render(<App/>);
        // Sprawdź, czy Terminal się renderuje szukając jego charakterystycznego elementu
        const welcomeElement = screen.getByText(/Welcome to Szymon Florek's Portfolio Terminal/i);
        expect(welcomeElement).toBeInTheDocument();
    });

});

// Remove the mock to test the actual Terminal component
jest.unmock('./Terminal');

describe('Terminal Component', () => {
    test('renders welcome message', () => {
        render(<Terminal/>);
        const welcomeElement = screen.getByText(/Welcome to Szymon Florek's Portfolio Terminal/i);
        expect(welcomeElement).toBeInTheDocument();
    });

    test('renders help instruction', () => {
        render(<Terminal/>);
        const helpElement = screen.getByText(/help/i);
        expect(helpElement).toBeInTheDocument();
    });

    test('renders command input', () => {
        render(<Terminal/>);
        const inputElement = screen.getByRole('textbox');
        expect(inputElement).toBeInTheDocument();
    });
});