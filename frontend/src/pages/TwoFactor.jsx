import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";

export default function TwoFactor({ user, loginMode = false, onVerified }) {

  const navigate = useNavigate();

  const [qr, setQr] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpReady, setOtpReady] = useState(false);

  useEffect(() => {
    console.log("TwoFactor mounted/updated - loginMode:", loginMode, "user:", user)
    setMessage("")
    setToken("")
    setQr("")
    setOtpReady(false)
  }, [user, loginMode])


  const userId = user?._id || user?.id;



  const generateQR = async () => {

    if(!userId){
      setMessage("User missing");
      return;
    }


    try{

      setLoading(true);


      const res = await fetch(
        `http://localhost:3000/api/2fa/setup/${userId}`
      );


      const data = await res.json();


      if(data.qrCode){
        setQr(data.qrCode)
        setMessage("QR Generated. Scan with Google Authenticator and enter the 6-digit code below.")
        setOtpReady(true)
      }
      else{
        setMessage(data.message)
      }


    }
    catch(err){

      setMessage("Server error");

    }
    finally{

      setLoading(false);

    }

  };





  const verifyOTP = async()=>{
    if(token.length !== 6){
      setMessage("Please enter all 6 digits of the OTP")
      return
    }



    try{


      setLoading(true);



      const res = await fetch(

        `http://localhost:3000/api/2fa/verify/${userId}`,

        {

          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            token
          })

        }

      );



      const data = await res.json();



      if (data.success) {
        setMessage("OTP Verified! Logging you in...")
        if (data.user) {
          authService.setCurrentUser(data.user)
        }
        if (onVerified) {
          onVerified()
        }
        setTimeout(() => navigate("/"), 500)
        return
      }

      setMessage("Invalid OTP. Please check and try again.")



    }
    catch(err){
      console.error("OTP verification error:", err)
      setMessage("Verification failed. Please try again.")
    }
    finally{

      setLoading(false);

    }


  };






return (

<div>


<h2>
{
loginMode 
? "Enter Two Factor Code"
: "Enable Two Factor Authentication"
}
</h2>



{
!otpReady &&
<button
  onClick={generateQR}
  disabled={loading}
  style={{
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '16px',
    marginBottom: '20px'
  }}
>
  {loading ? 'Generating...' : 'Generate QR Code'}
</button>
}



{
message &&
<p>{message}</p>
}




{
qr &&

<>

<h3>
Scan Google Authenticator
</h3>


<img
src={qr}
width="250"
/>


</>

}




<div>


<h3>
OTP
</h3>


<input

value={token}

maxLength="6"

onChange={
e =>
setToken(
e.target.value.replace(/\D/g,"")
)
}

/>



<button

onClick={verifyOTP}

disabled={loading}

>

Verify OTP

</button>


</div>



</div>

);


}