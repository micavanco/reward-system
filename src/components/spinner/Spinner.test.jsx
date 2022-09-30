import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
    it('should render component properly', () => {
        render(<Spinner/>);
        const spinner = screen.getByText('Loading...');
        expect(spinner).toBeInTheDocument();
    });
});
