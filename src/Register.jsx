import axios from "axios"

export const Register = () => {
    const handleRegister = async () => {
        try {
            const res = await axios.post("http://localhost:3100/api/auth/register", {
                email: "test@test.gmail.com",
                password: "123456"
            });
            console.log(res.data);
        } catch (error) {
            console.error(error.response?.data);
        };
    };
    return (
        <div>
            <button onClick = {handleRegister}>
                登録テスト
            </button>
        </div>
    )
}