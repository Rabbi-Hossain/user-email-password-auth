import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.confige";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [loginError, setLoginError] = useState('')
    const [sucess, setSucess] = useState('')
    const emailRef = useRef(null)

    const LoginHandler = (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value
        console.log(email, password)
        setSucess('')
        setLoginError('')
        // login account
        signInWithEmailAndPassword(auth, email, password)
            .then(res => {
                console.log(res.user)
                setSucess('Login sucess fully')
            })
            .catch(error => {
                console.log(error)
                setLoginError(error.message)

            })
    }

    const forgetPassword = ()=>{
        const email = emailRef.current.value
        if(!email){
            console.log('for got password in login form',emailRef.current.value)
            return
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('please write a valid email')
            return
        }

        // send password reset email
        sendPasswordResetEmail(auth, email)
        .then(res=>{
            console.log(res)
        })
        .catch(error=>{
            console.log(error)
        })

    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={LoginHandler} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" 
                                placeholder="email" 
                                ref={emailRef}
                                className="input input-bordered" 
                                name="email" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name="password" required />
                                <label className="label">
                                    <a onClick={forgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>
                        {loginError && <p className="text-red-400">{loginError}</p>}
                        {sucess && <p className="text-green-400">{sucess}</p>}
                        <p>Now to website? please<Link to='/register'> Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;