import axios from "axios";

export const CheckIn = () => {
    const handleCheckIn = async () => {
        try {
            const token = localStorage.getItem("token");
            console.log("TOKEN:", token);
            const res = await axios.post("http://localhost:3100/api/attendance/check-in",{},{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(res.data)
        } catch (error) {
            console.error(error.response?.data);
        };
    };
    return (
        <div>
            <button onClick = {handleCheckIn}>
                出勤
            </button>
        </div>
    )
}