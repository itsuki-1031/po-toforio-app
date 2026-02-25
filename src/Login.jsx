import axios from "axios";

export const Login = () => {
    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:3100/api/auth/login", {
                email: "abc@test.gmail.com",
                password: "123456"
            });

            localStorage.setItem("token", res.data.token);
            console.log(res.data);
        } catch (error)  {
            console.error(error.response?.data);
        };
    };
    return (
        <div>
            <button onClick = {handleLogin}>
                ログインテスト
            </button>
        </div>
    );
};

