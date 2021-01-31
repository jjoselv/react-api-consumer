import {render, screen} from '../../test-utils';
import Banner from './Banner';

// This set of tests follow the principles of the Testing Library: https://testing-library.com/docs/guiding-principles

describe('<Banner />', () => {
  // Arrange
  render(<Banner message />);
    
  // Act
  const element = screen.getByTestId('banner-test-id');

  // Assert
  expect(element).toBeInTheDocument();
  expect(element).toHaveClass('banner')

  it('renders the message', async () => {
    // Arrange
    render(<Banner message='Hello' />);
  
    // Act
    const message = screen.getByText(/Hello/i);
  
    // Assert
    expect(message).toBeInTheDocument();
  });
  
  it('renders a loading spinner', async () => {
    // Arrange
    render(<Banner showLoading message='Hello' />);
  
    // Act
    const element = screen.getByTestId('banner-spinner-test-id');
  
    // Assert
    expect(element).toBeInTheDocument();
  });

  it('renders a warning banner', async () => {
    // Arrange
    render(<Banner warning message='Hello' />);

    // Act
    const element = screen.getByTestId('banner-test-id');
  
    // Assert
    expect(element).toHaveClass('warning');
    expect(element).toHaveAttribute('role', 'alert');
  });
});
