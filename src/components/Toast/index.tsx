import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
  return (
    <ToastContainer
      className={'toast'}
      position="top-center"
      autoClose={2000}
      hideProgressBar={true}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      icon={() => <></>}
      closeButton={() => <></>}
    />
  );
}
