import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Offers from './Pages/Offers';
import ForgotPassword from './Pages/ForgotPassword';
import Profile from './Pages/Profile';
import SignIn from './Pages/SignIn';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './Pages/CreateListing';

function App() {
  
  
  return (
    <div className=''>
      {/* <div className='text-4xl text-center  mt-6 font-bold none md:w-[67%]  rounded-sm'></div> */}
      {/* <div className='lg: w-[50%] mb-12 md: md-6 w-full none'></div> */}
      <Router>
        <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile' element={<PrivateRoute/>}>
                   <Route path='/profile' element={<Profile/>}/>
                </Route>
                <Route path='/sign-in' element={<SignIn/>}/>
                <Route path='/sign-up' element={<SignUp/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='/offers' element={<Offers/>}/>
                <Route path='/create-listing' element={<PrivateRoute/>}>
                   <Route path='/create-listing' element={<CreateListing/>}/>
                </Route>
            </Routes>
        </Router>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
         />
   
    </div>
  );
}

export default App;
