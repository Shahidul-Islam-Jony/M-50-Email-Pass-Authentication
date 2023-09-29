import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [success,setSuccess] = useState(false);
    const [error,setError] = useState(false);
    const emailRef = useRef(null);

    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email,password);
        // validation er part ta register component er moto kore add kore naw

        setSuccess('');
        setError('');

        // sign in
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            setSuccess('Login successful');
        })
        .catch(error=>{
            console.error(error);
            setError(error.message);
        })
    }

    // handle Forget Password
    const handleForgetPassword = () =>{
        const email = emailRef.current.value;
        if(!email){

            console.log('please provide an email',emailRef.current.value);
            return;
        }
        else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)){
            console.log('please write a valid email');
            return;
        }
        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
           alert('Please check your email');
        })
        .catch(error=>{
            console.log(error);
        })


    }


    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input 
                                    type="email" 
                                    placeholder="email" 
                                    name="email" 
                                    ref={emailRef}
                                    className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" name="password" className="input input-bordered" />
                                    <label className="label">
                                        <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            {
                                success&& <p className="text-green-600">{success}</p>
                            }
                            {
                                error&& <p className="text-red-500">{error}</p>
                            }

                            <p>New to this website ? Please <Link to="/register">Register </Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;