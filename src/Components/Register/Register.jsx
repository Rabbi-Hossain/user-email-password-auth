import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.confige";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";




const Register = () => {

    const [loginError, setLoginError] = useState('')
    const [sucess, setSucess] = useState('')
    const [show, setShow] = useState(false)

    const RegisterHandler = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepts = e.target.terms.checked
        console.log(name,email,password,accepts)
        setSucess('')
        setLoginError('')
        // create account 
        if (password.length < 6) {
            setLoginError(' Password should be at least 6 characters')
            return
        } else if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/.test(password)) {
            setLoginError('Password should be at least 6 characters one uppercase one lower case one spaceal crachter or longer')
            return
        }else if(!accepts){
            setLoginError('Accepts terms and conditon')
            return
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSucess('Register sucessfully')
                updateProfile(result.user, {
                    displayName:name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then(res=>{
                    console.log(res)
                })

                // email valid
                sendEmailVerification(result.user)
                .then(res=>{
                    alert('please email valide')
                })
            })
            .catch(error => {
                console.log(error)
                setLoginError(error.message)
            })

    }


    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={RegisterHandler} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name" className="input input-bordered" name="name" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name="email" required />
                            </div>
                            <div className="">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input  type={show ? "text" : "password"} placeholder="password" className="input input-bordered w-full" name="password" required />
                                    <span className="mt-3 absolute right-2" onClick={() => setShow(!show)}>
                                        {
                                            show ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </span>
                                </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>

                                <input type="checkbox" name="terms" id="terms" />
                                <label className="ml-3" htmlFor="terms">Accepts terms and condition</label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        {loginError && <p className="text-red-400">{loginError}</p>}
                        {sucess && <p className="text-green-400">{sucess}</p>}
                        <p>Alrady Have an Account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;