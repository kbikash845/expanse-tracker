import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import AuthForm from './components/Auth/AuthForm';
import ProfileForm from './components/Profile/ProfileForm';
import StartingPageContent from './components/StartingPage/StartingPageContent';
import HomePage from './pages/HomePage';
import Forgetpassword from './components/Auth/ForgetPassword/Forgetpassword';

function App() {
  return (
  <div>
    <Layout/>
    <Routes>
    {/* <Route path='/' exact element={<HomePage/>}/> */}
      <Route path='auth' element={<AuthForm/>}/>
      <Route path='profile' element={<ProfileForm/>}/>
      <Route path='forgotpassword' element={<Forgetpassword/>}/>
      <Route path='/' element={<StartingPageContent/>}/>
    </Routes>
  </div>
  );
}

export default App;
