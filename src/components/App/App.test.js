import ReactModal from 'react-modal';
import {render, screen, fireEvent, waitFor, findByRole} from '../../test-utils';
import App from '.';

// This set of tests follow the principles of the Testing Library: https://testing-library.com/docs/guiding-principles

test('renders users list title', async () => {
  // Arrange
  const {container} = render(<App />);
  ReactModal.setAppElement(container);

  // Act
  const title = await screen.findByText(/Users List/i);

  // Assert
  expect(title).toBeInTheDocument();
});

test('setting page is rendered and can be accessible and can navigate back', async () => {
  // Arrange
  const {container} = render(<App />);
  ReactModal.setAppElement(container);

  // Act
  const settingLink = await screen.findByLabelText(/go to settings/i);
  fireEvent.click(settingLink);

  // Assert
  let settingsTitle = await screen.findByText(/Settings/i);
  let mainTitle = screen.queryByText(/Users List/i);
  expect(settingsTitle).toBeInTheDocument();
  expect(mainTitle).not.toBeInTheDocument();

  // Act
  const homeLink = await screen.findByLabelText(/go to home/i);
  fireEvent.click(homeLink);

  // Assert
  mainTitle = await screen.findByText(/Users List/i);
  settingsTitle = screen.queryByText(/Settings/i);
  expect(mainTitle).toBeInTheDocument();
  expect(settingsTitle).not.toBeInTheDocument();
});

test('modal is opened when use card is clicked', async () => {
  // Arrange
  const {container} = render(<App />);
  ReactModal.setAppElement(container);

  // Act
  const userCard = (await screen.findAllByTestId('user-card'))[0];
  fireEvent.click(userCard);
  const modalNode = await screen.findByRole('dialog');

  // Assert
  expect(modalNode).toHaveAttribute('aria-label', 'User Information');
});

test('modal is closed when close button is clicked', async () => {
  // Arrange
  const {container} = render(<App />);
  ReactModal.setAppElement(container);

  // Act
  const userCard = (await screen.findAllByTestId('user-card'))[0];
  fireEvent.click(userCard);
  const modalNode = await screen.findByRole('dialog');
  const closeButton = await findByRole(modalNode, 'button');
  fireEvent.click(closeButton);

  // Assert
  expect(modalNode).not.toBeInTheDocument();
});

test('when search text is introduced list is empty', async () => {
  // Arrange
  const {container} = render(<App />);
  ReactModal.setAppElement(container);

  // Act
  const searchInput = await screen.findByLabelText('search-input');
  fireEvent.change(searchInput, {target: {value: 'longstringthatdoesntmatch'}});

  // Assert
  expect(searchInput.value).toBe('longstringthatdoesntmatch');
  const gridNode = await screen.findByRole('grid');
  waitFor(() => expect(gridNode).toBeEmptyDOMElement());
});

test('when search text is introduced banner is showing', async () => {
  // Arrange
  const {container} = render(<App />);
  ReactModal.setAppElement(container);

  // Act
  const searchInput = await screen.findByLabelText('search-input');
  fireEvent.change(searchInput, {target: {value: 'longstringthatdoesntmatch'}});

  // Assert
  const alertBanner = await screen.findByRole('alert');
  waitFor(() => expect(alertBanner).toBeInTheDocument());
});
