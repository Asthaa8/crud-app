// import {useState} from "react"
// import {useLocation,useNavigate} from "react-router-dom"
// import {authService} from "../services/auth"



// export default function TwoFactorLogin({onAuth}){


// const location=useLocation()

// const navigate=useNavigate()


// const user=location.state?.user


// const [token,setToken]=useState("")
// const [message,setMessage]=useState("")



// const verify=async()=>{


// try{


// const res=await fetch(

// `http://localhost:3000/api/2fa/verify/${user._id}`,

// {

// method:"POST",

// headers:{
// "Content-Type":"application/json"
// },

// body:JSON.stringify({

// token

// })

// }

// )



// const data=await res.json()



// if(data.success){


// authService.setCurrentUser(user)


// onAuth(user)


// navigate("/")


// }
// else{


// setMessage("Invalid OTP")


// }


// }
// catch(err){

// setMessage("Verification failed")

// }


// }



// return (

// <div>


// <h2>
// Enter OTP
// </h2>


// <input

// value={token}

// onChange={
// e=>setToken(e.target.value)
// }

// placeholder="6 digit OTP"

// />


// <button onClick={verify}>

// Verify

// </button>


// <p>
// {message}
// </p>


// </div>

// )


// }