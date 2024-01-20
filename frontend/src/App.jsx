import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { LoginPage, SignupPage, ActivationPage } from './Routes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignupPage />}/>
        <Route path='/activation/:activation_token' element={<ActivationPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
