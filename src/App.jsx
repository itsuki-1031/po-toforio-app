import './App.css'
import axios from 'axios'

function App() {
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
    </div>
  )
}

export default App;
