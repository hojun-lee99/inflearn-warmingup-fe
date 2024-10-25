import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('the counter starts at 0', () => {
  // App 컴포넌트 랜더
  render(<App />);
  // screen object를 이용해 원하는 엘레멘트에 접근
  const counterElement = screen.getByTestId('counter');
  // counterElemnet가 0인지 테스트
  expect(counterElement).toHaveTextContent(0);
});

test('minus button has correct text', () => {
  // App 컴포넌트 랜더
  render(<App />);
  // screen object를 이용해 원하는 엘레멘트에 접근
  const minusButtonElement = screen.getByTestId('minus-button');
  // minusButtonElemnet가 -인지 테스트
  expect(minusButtonElement).toHaveTextContent('-');
});

test('plus button has correct text', () => {
  // App 컴포넌트 랜더
  render(<App />);
  // screen object를 이용해 원하는 엘레멘트에 접근
  const plusButtonElement = screen.getByTestId('plus-button');
  // plusButtonElemnet가 +인지 테스트
  expect(plusButtonElement).toHaveTextContent('+');
});

test('When the + button is pressed, the counter changes to 1', () => {});

test('When the - button is pressed, the counter changes to -1', () => {});

test('on/off button has blue color', () => {
  // App 컴포넌트 랜더
  render(<App />);
  // screen object를 이용해 원하는 엘레멘트에 접근
  const onOffButtonElement = screen.getByTestId('on/off-button');
  // onOffButtonElemnet의 색이 blue 인지 체크
  expect(onOffButtonElement).toHaveStyle({ backgroundColor: 'blue' });
});

test('Prevent the -,+ button from being pressed when the on/off button is clicked', () => {
  // App 컴포넌트 랜더
  render(<App />);
  // screen object를 이용해 원하는 엘레멘트에 접근
  const onOffButtonElement = screen.getByTestId('on/off-button');
  // click onOffButtonElement button
  fireEvent.click(onOffButtonElement);
  const plusButtonElement = screen.getByTestId('plus-button');
  expect(plusButtonElement).toBeDisabled();
});
