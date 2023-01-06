import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Offers from './Pages/Offers';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';

function App() {
  return (
    <>
      <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='/offers' element={<Offers/>}/>
            </Routes>
        </Router>
   
    </>
  );
}

export default App;
