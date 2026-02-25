import './App.css'
import axios from 'axios'
import { Login } from './Login.jsx';
import { CheckIn } from './CheckIn.jsx';
import { Register } from './Register.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const App = () => {
  const register = async () => {
    try {
      const res = await axios.post("http://localhost:3100/api/auth/register",{
        email: "test@test.email.com",
        password: "123456"
      }
    );
      console.log(res.data);

    } catch (error) {
      console.error(error.response?.data);
    }
  }
  return (
    <div>
      <button onClick = {register}>
        APIテスト
      </button>
      <Login/>
      <CheckIn/>
      <Register/>
      
    </div>
  )
}

export default App;
