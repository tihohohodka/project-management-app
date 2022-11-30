import React from 'react';
import { Link } from 'react-router-dom';
import {
  loginInputValChange,
  passwordInputValChange,
  signInRequest,
  useAppSelector,
  useAppDispatch,
} from '../../globalStore/globalStore';
import './signIn-signUp.css';
import HeaderSignIn from './headerSignIn';
import { Footer } from '../site-parts/footer';



function SignIn() {
  const [ loginInputVal, passwordInputVal, lang ] = useAppSelector((state) => [state.registrwindw.loginInputVal, state.registrwindw.passwordInputVal, state.lang.lang]);
  const [titleVal, titleChange] = React.useState('');
  const [loginInscriptionVal, loginInscriptionChange] = React.useState('');
  const [loginPlaceholderVal, loginPlaceholderChange] = React.useState('');
  const [passwordInscriptionVal, passowrdInscriptionChange] = React.useState('');
  const [passwordPlaceholderVal, passowrdPlaceholderChange] = React.useState('');
  const [signInscriptionButtonVal, signInscriptionButtonChange] = React.useState('');
  const [registerAskVal, registerAskChange] = React.useState('');
  const [buttonToSignUpVal, buttonToSignUpChange] = React.useState('');

  React.useEffect(() => {
    if(lang === "English"){
      titleChange('Sign In');
      loginInscriptionChange('Enter login: ');
      loginPlaceholderChange('Login');
      passowrdInscriptionChange('Enter password: ');
      passowrdPlaceholderChange('Password');
      signInscriptionButtonChange('Sign In');
      registerAskChange('Not registered?   ');
      buttonToSignUpChange('Click here to go to Sign Up page');
    } else {
      titleChange('Войти');
      loginInscriptionChange('Введите логин: ');
      loginPlaceholderChange('Логин');
      passowrdInscriptionChange('Введите пароль: ');
      passowrdPlaceholderChange('Пароль');
      signInscriptionButtonChange('Войти');
      registerAskChange('Не зарегестрированы?   ');
      buttonToSignUpChange('Нажмите сюда что бы перейти на старницу регистрации');
    }
  }, [lang])

  const dispatch = useAppDispatch();

  return (
    <div className="authpage">
      <HeaderSignIn />
      <div className="modalsign">
        <h2>{titleVal}</h2>
        <form>
          <div className="loginInp">
            <label>{loginInscriptionVal}</label><input placeholder={loginPlaceholderVal} type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
          </div>
          <div className="passwordInp">
            <label>{passwordInscriptionVal}</label><input placeholder={passwordPlaceholderVal} type="password" autoComplete="current-password" value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
          </div>
          <button className="narrow-button" onClick={signInRequest as unknown as React.MouseEventHandler<HTMLButtonElement>}>{signInscriptionButtonVal}</button>
          <div className="go-sign-up-tab"><span>{registerAskVal}</span>
          <Link to="/SignUp">
            <span className="href-sign-up">{buttonToSignUpVal}</span>
          </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>

  );
}

export default SignIn;