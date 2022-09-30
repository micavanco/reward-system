import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage', () => {
    it('should render component properly', () => {
        render(<ErrorMessage/>);
        const button = screen.getByText('Try again');
        expect(button).toBeInTheDocument();
    });
});
