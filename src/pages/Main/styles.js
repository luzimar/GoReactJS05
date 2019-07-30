import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid #eee;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

const rotate = keyframes`
   from {
    transform: rotate(0deg);
   }

   to {
    transform: rotate(360deg);
   }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.disabled,
}))`
  background: #2c3384;
  border: 0;
  padding: 0px 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const Error = styled.label`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #dc141c;
  margin-top: 10px;
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }
    a {
      color: #2c3384;
      text-decoration: none;
    }
  }
`;
