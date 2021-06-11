import styled from 'styled-components';

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
// forget password button
export const MutedLink = styled.a`
  font-size: 12px;
  color: #092a61;
  text-decoration: none;
  font-weight: 600;
  padding: 2px 1%;
`;
// sign up link
export const BoldLink = styled.a`
  font-size: 12px;
  color: #092a61;
  font-weight: 600;
  text-decoration: none;
  padding: 2px 1%;
`;

export const Input = styled.input`
  width: 70%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
`;

export const SubmitButton = styled.button`
  width: 70%;
  padding: 8px 30%;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: #90ee90;
  background: linear-gradient(58deg);
  align-items: center;
`;
export const TokenContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;
