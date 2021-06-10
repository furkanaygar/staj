import React, { useContext } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton
} from './common';
import { Marginer } from '../marginer';
import { AccountContext } from './accountContext';
import { auth } from './auth';

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);
  return (
    <BoxContainer>
      <FormContainer>
        <Input type='email' placeholder='Email' />
        <Input type='password' placeholder='Password' />
      </FormContainer>
      <Marginer direction='vertical' margin={10} />
      <MutedLink href='#'>Forget your password?</MutedLink>
      <Marginer direction='vertical' margin='1.6em' />
      <SubmitButton type='submit' onClick={auth('metehan.danaci', 'mete')}>
        Signin
      </SubmitButton>
      <Marginer direction='vertical' margin='1em' />
      <MutedLink href='#'>
        Don't have an account?{' '}
        <BoldLink href='#' onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
