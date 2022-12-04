import React from 'react';
import './toast-window.css';
import closePicture from '../../pictures/close-win.png';
import { useAppSelector, closeToast } from '../../globalStore/globalStore';

function ToastWindow() {
  const { hideToastVal, descriptionToastVal } = useAppSelector((state) => state.toast)
  return (
    <div className={hideToastVal}>
      <div className='message-toast'><span>{descriptionToastVal}</span></div>
      <div className="close-toast" onClick={closeToast}><img src={closePicture} alt="close picture"></img></div>
    </div>
  );
}

export default ToastWindow;