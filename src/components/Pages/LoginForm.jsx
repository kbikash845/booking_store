import { useState, useRef, Fragment} from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";



const LoginForm = () => {
  const authCtx=useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setisLoading]=useState(false);
  
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const confirmPassword=confirmPasswordInputRef.current.value;
    console.log(enteredEmail, enteredPassword,confirmPassword);

    localStorage.setItem("email",enteredEmail);


    if(enteredPassword===confirmPassword){
    setisLoading(true)
    let url;
    if (isLogin) {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJ3iLrq9zQ5XM18baafg0Nrlg9IZ0N0KI"
    } else {
      url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJ3iLrq9zQ5XM18baafg0Nrlg9IZ0N0KI"

    }
    fetch(url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      setisLoading(false)
      if (response.ok) {
        return response.json()
      } else {
        //The response holds error
        return response.json().then((data) => {
          console.log(data);
          let errorMessage="Authencation failed!";
          // if(data && data.error && data.error.message){
          //   errorMessage=data.error.message 
          // }
          // alert(errorMessage);
          throw new Error(errorMessage)
        });
      }
    }).then(data=>{
      console.log(data)
      authCtx.login(data.idToken);

      // dispatch(authActions.islogin(data.idToken))
     
        console.log("successfully sign up")
        navigate("/home");
    //   authCtx.autoLogout();
      
    }).catch(err=>{
      alert(err.message);
    })
  }
  else{
    alert("Password is wrong")
    
  }
  }

  

  return (
    <Fragment>
      <section className={`bg-gradient-to-b from-pink-400 to-violet-900  wd-full  max-w-xl rounded-6 shadow-md py-3 text-center text-white mx-auto  rounded-4`} style={{marginTop:"10%",marginBottom:"70px"}}>
          <h1 className="text-white text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler} className="px-4">
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-bold mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                ref={emailInputRef}
                required
                className="bg-purple-100 text-purple-900 rounded-3 border border-white w-full  py-2 px-4 "
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white font-bold mb-2">
                Your Password
              </label>
              <input
                type="password"
                id="password"
                ref={passwordInputRef}
                required
                className="bg-purple-100 text-purple-900 rounded-3 border w-full  border-white py-2 px-4"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-white font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                ref={confirmPasswordInputRef}
                required
                className="bg-purple-100 text-purple-900 rounded-3 border border-white w-full py-2 px-4"
              />
            </div>
            <div className="mb-2">
              {!isLoading ? (
              
                <button
                  type="submit"
                  className="bg-red-600 text-white rounded-2 px-4 py-2"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </button>
              ) : (
                <p>Sending request...</p>
              )}
            </div>
            <div>
              <button
                type="button"
                className="bg-transparent text-white underline mb-2"
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>

          
          </form>
        </section>
</Fragment>
  );
};

export default LoginForm;