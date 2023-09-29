import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEyeSlash, FaEye } from 'react-icons/fa';


const Register = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    const handleRegister = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        // console.log(email,password);

        setRegisterError(''); // notun account toirer khetre error take ui thele sorate
        setSuccess(''); // protibar success take reset korte (ui theke sorate)

        // password length verify
        if (password.length < 6) {
            setRegisterError(' Password should be at least 6 characters or longer');
            return; //return na dile error dewar por o niche jabe ebon account toire korbe
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have at least one upper case characters.');
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('User created successfully.');
            })
            .catch(error => {
                console.error(error);
                // user already thakle ui te error dekhate
                setRegisterError(error.message);
            })
    }

    return (
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8 text-center">Please Register</h2>
                <form onSubmit={handleRegister} className=" text-center">
                    <input className="mb-4 w-3/4 py-2 px-4" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <div className="relative">
                        <input
                            className="mb-4 w-3/4 py-2 px-4"
                            type={showPassword ? "text" : "password"}   //For showing password
                            placeholder="Password"
                            name="password"
                            id="" required />
                        <span className=" absolute right-16 lg:right-28 top-2 text-2xl" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    <br />
                    <input className="btn btn-secondary mb-4 w-3/4" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-500">{registerError}</p>
                }
                {
                    success && <p className="text-green-500">{success}</p>
                }
            </div>
        </div>
    );
};

export default Register;