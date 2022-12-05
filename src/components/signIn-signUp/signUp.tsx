import React from 'react';
import { Link } from 'react-router-dom';
import {
  nameInputValChange,
  loginInputValChange,
  passwordInputValChange,
  signUpRequest,
  useAppSelector,
  useAppDispatch,
} from '../../globalStore/globalStore';
import './signIn-signUp.css';
import HeaderSignUp from './headerSignUp';
import { Footer } from '../site-parts/footer';



function SignUp() {
  const [nameInputVal, loginInputVal, passwordInputVal, lang] = useAppSelector((state) => [state.registrwindw.nameInputVal, state.registrwindw.loginInputVal, state.registrwindw.passwordInputVal, state.lang.lang])

  const dispatch = useAppDispatch();

  const [titleVal, titleChange] = React.useState('');
  const [nameInscriptionVal, nameInscriptionChange] = React.useState('');
  const [namePlaceholderVal, namePlaceholderChange] = React.useState('');
  const [loginInscriptionVal, loginInscriptionChange] = React.useState('');
  const [loginPlaceholderVal, loginPlaceholderChange] = React.useState('');
  const [passwordInscriptionVal, passowrdInscriptionChange] = React.useState('');
  const [passwordPlaceholderVal, passowrdPlaceholderChange] = React.useState('');
  const [signInscriptionButtonVal, signInscriptionButtonChange] = React.useState('');
  const [signInAskVal, signInAskChange] = React.useState('');
  const [buttonToSignInVal, buttonToSignInChange] = React.useState('');
  const [classOfButtonSignUp, classOfButtonSignUpChange] = React.useState('');

  const [isWrongNameLg, isWrongNameLgChange] = React.useState('')
  const [isWrongLoginLg, isWrongLoginLgChange] = React.useState('')
  const [isWrongPasswordLg, isWrongPasswordLgChange] = React.useState('')

  const [isWrongName, isWrongNameChange] = React.useState(<div><span>{isWrongNameLg}</span></div>);
  const [isWrongLogin, isWrongLoginChange] = React.useState(<div><span>{isWrongLoginLg}</span></div>);
  const [isWrongPassword, isWrongPasswordChange] = React.useState(<div><span>{isWrongPasswordLg}</span></div>);

  React.useEffect(() => {
    if(lang === "English"){
      console.log('klkl');
      titleChange('Sign Up');
      nameInscriptionChange('Enter name: ');
      namePlaceholderChange('Name (only letters, no more 6)');
      loginInscriptionChange('Enter login: ');
      loginPlaceholderChange('Login (only letters, no more 6)');
      passowrdInscriptionChange('Enter password: ');
      passowrdPlaceholderChange('Password (no more 3 characters)');
      signInscriptionButtonChange('Sign Up');
      signInAskChange('Already registered?  ');
      buttonToSignInChange('Click here to go to Sign In page');
      classOfButtonSignUpChange('narrow-button');
      isWrongNameLgChange('Name can only consist of letters and not be more than 6 letters');
      isWrongLoginLgChange('Login can only consist of letters and not be more than 6 letters');
      isWrongPasswordLgChange('Password must be at least 3 characters long');
    } else {
      titleChange('Зарегестрироваться');
      nameInscriptionChange('');
      nameInscriptionChange('Введите имя: ');
      namePlaceholderChange('Имя (только буквы не больше 6)');
      loginInscriptionChange('Введите логин: ');
      loginPlaceholderChange('Логин (только буквы не больше 6)');
      passowrdInscriptionChange('Введите пароль: ');
      passowrdPlaceholderChange('Пароль (не больше 3 символов)');
      signInscriptionButtonChange('Зарегестрироваться');
      signInAskChange('Уже зарегестрированы?   ');
      buttonToSignInChange('Нажмите сюда что бы перейти на старницу входа');
      classOfButtonSignUpChange('wide-button');
      isWrongNameLgChange('Имя может состоять только из букв, и не должно быть больше 6 букв');
      isWrongLoginLgChange('Логин может состоять только из букв, и не должно быть больше 6 букв');
      isWrongPasswordLgChange('Пароль должен состоять не меньше чем из 3 символов');
    }
  }, [lang])

  function onClickSignUp(evt: Event){
    evt.preventDefault();
    let nobreakSignUp = true;
    if(nameInputVal.length >= 6 || /\W/.test(nameInputVal) || nameInputVal.length === 0){
      isWrongNameChange(<span>{isWrongNameLg}</span>);
      nobreakSignUp = false;
    } else {
      isWrongNameChange(<span></span>);
    }
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
      signUpRequest()
    }
  }

  return (
    <div className="authpage">
      <HeaderSignUp />
      <div className="modalsign">
        <h2>{titleVal}</h2>
        <form>
          <div className="nameInp">
            <label>{nameInscriptionVal}</label>
            <input placeholder={namePlaceholderVal} type="text" autoComplete="username" value={nameInputVal} onChange={(e) => dispatch(nameInputValChange(e.target.value))}></input>
          </div>
          <div className='wrong-valid'>{isWrongName}</div>
          <div className="loginInp">
            <label>{loginInscriptionVal}</label><input placeholder={loginPlaceholderVal} type="text" autoComplete="username" value={loginInputVal} onChange={(e) => dispatch(loginInputValChange(e.target.value))}></input>
          </div>
          <div className='wrong-valid'>{isWrongLogin}</div>
          <div className="passwordInp">
            <label>{passwordInscriptionVal}</label><input placeholder={passwordPlaceholderVal} type="password" autoComplete="new-password" value={passwordInputVal} onChange={(e) => dispatch(passwordInputValChange(e.target.value))}></input>
          </div>
          <div className='wrong-valid'>{isWrongPassword}</div>
          <button className={classOfButtonSignUp} onClick={onClickSignUp as unknown as React.MouseEventHandler<HTMLButtonElement>}>{signInscriptionButtonVal}</button>
          <div className="go-sign-up-tab"><span>{signInAskVal}</span>
            <Link to="/SignIn">
              <span className="href-sign-up">{buttonToSignInVal}</span>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>

  );
}

export default SignUp;
