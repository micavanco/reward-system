import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    it('should render component properly', () => {
        render(<Header/>);
        const logo = screen.getByText('REWARD SYSTEM');
        expect(logo).toBeInTheDocument();
    });
});
