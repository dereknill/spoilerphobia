import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LineBreak from "./utils/LineBreak";
import { useState } from "react";

function SignIn(props) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  function handleCreate(event) {
    event.preventDefault();
    navigate("/signup");
  }

  function handleForgotPassword(event) {
    event.preventDefault();
    const auth = getAuth();
    console.log(email);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError("Password reset email has been sent");
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-email")) {
          setError("Invalid email");
        } else {
          setError("An error has occured");
        }
      });
  }
  function startSignIn(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (
          errorMessage.includes("auth/wrong-password") ||
          errorMessage.includes("auth/user-not-found")
        ) {
          setError("Email or password is incorrect");
        } else {
          setError("An error has occured");
        }
      });
  }

  return (
    <div className='w-full absolute rounded-xl h-full bg-slate-600'>
      <section className='mb-10 mt-4 md:mt-10 w-96 mx-auto max-w-[95%] bg-slate-300 p-5 rounded shadow-lg shadow-black/75'>
        <h2 className='text-center mb-4 text-xl font-bold'>Sign In</h2>
        <form onSubmit={startSignIn} className='flex flex-col gap-5'>
          <div className='w-full flex flex-col gap-1'>
            <label htmlFor='email' className='font-bold'>
              Email
            </label>

            <input
              type='email'
              name='email'
              required={true}
              className='w-full px-3 py-1 border-slate-400 rounded border'
              value={email}
              onChange={(event) => {
                setEmail(event.currentTarget.value);
              }}
            ></input>
          </div>
          <div className='w-full flex flex-col gap-1'>
            <div className='flex justify-between items-center'>
              <label htmlFor='password' className='font-bold'>
                Password
              </label>
              <button
                type='button'
                onClick={handleForgotPassword}
                className='text-sm hover:underline'
              >
                Forgot your password?
              </button>
            </div>
            <input
              type='password'
              name='password'
              required={true}
              className='w-full px-3 py-1 border-slate-400 rounded border'
            ></input>
          </div>
          <div>
            <button
              type='submit'
              className='bg-slate-900 text-white w-full rounded mt-5 px-3 py-2 hover:darker-bg'
            >
              Sign-In
            </button>
            {error && <div className='text-red-500'>{error}</div>}
          </div>
        </form>

        <LineBreak type='margin-10'></LineBreak>
        <h3 className='mb-3 text-center'>Don't have an account yet?</h3>

        <button
          onClick={handleCreate}
          className='bg-slate-600 text-white w-full rounded px-3 py-2 hover:darker-bg'
        >
          Create your account
        </button>
      </section>
    </div>
  );
}
export default SignIn;
