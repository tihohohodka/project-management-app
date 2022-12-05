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

  const [isWrongLoginLg, isWrongLoginLgChange] = React.useState('')
  const [isWrongPasswordLg, isWrongPasswordLgChange] = React.useState('')

  const [isWrongLogin, isWrongLoginChange] = React.useState(<span>{isWrongLoginLg}</span>);
  const [isWrongPassword, isWrongPasswordChange] = React.useState(<span>{isWrongPasswordLg}</span>);

  React.useEffect(() => {
    if(lang === "English"){
      titleChange('Sign In');
      loginInscriptionChange('Enter login: ');
      loginPlaceholderChange('Login (only letters, no more 6)');
      passowrdInscriptionChange('Enter password: ');
      passowrdPlaceholderChange('Password (no more 3 characters)');
      signInscriptionButtonChange('Sign In');
      registerAskChange('Not registered?   ');
      buttonToSignUpChange('Click here to go to Sign Up page');
      isWrongLoginLgChange('Login can only consist of letters and not be more than 6 letters');
      isWrongPasswordLgChange('Password must be at least 3 characters long');
    } else {
      titleChange('Войти');
      loginInscriptionChange('Введите логин: ');
      loginPlaceholderChange('Логин (только буквы не больше 6)');
      passowrdInscriptionChange('Введите пароль: ');
      passowrdPlaceholderChange('Пароль (не больше 3 символов)');
      signInscriptionButtonChange('Войти');
      registerAskChange('Не зарегестрированы?   ');
      buttonToSignUpChange('Нажмите сюда что бы перейти на старницу регистрации');
      isWrongLoginLgChange('Логин может состоять только из букв, и не должно быть больше 6 букв');
      isWrongPasswordLgChange('Пароль должен состоять не меньше чем из 3 символов');
    }
  }, [lang])

  const dispatch = useAppDispatch();

  function onClickSignIn(evt: Event){
    evt.preventDefault();
    let nobreakSignUp = true;
    if(loginInputVal.length >= 6 || /\W/.test(loginInputVal) || loginInputVal.length === 0 ){
      isWrongLoginChange(<span>{isWrongLoginLg}</span>);
      nobreakSignUp = false;
    } else {
      isWrongLoginChange(<span></span>);
    }
    if(passwordInputVal.length < 3){
      isWrongPasswordChange(<span>{isWrongPasswordLg}</span>);
      nobreakSignUp = false;
    } else {
      isWrongPasswordChange(<span></span>);
    }
    if(nobreakSignUp){
      signInRequest()
    }
  }

  return (
    <div className="authpage">
      <HeaderSignIn />
      <div className="modalsign">
        <h2>{titleVal}</h2>
        <form>
          <div className="loginInp">
            <label>{loginInscriptionVal}</label><input placeholder={loginPlaceholderVal} type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
          </div>
          <div className='wrong-valid'>{isWrongLogin}</div>
          <div className="passwordInp">
            <label>{passwordInscriptionVal}</label><input placeholder={passwordPlaceholderVal} type="password" autoComplete="current-password" value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
          </div>
          <div className='wrong-valid'>{isWrongPassword}</div>
          <button className="narrow-button" onClick={onClickSignIn as unknown as React.MouseEventHandler<HTMLButtonElement>}>{signInscriptionButtonVal}</button>
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