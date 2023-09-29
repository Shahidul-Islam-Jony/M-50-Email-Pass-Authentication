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
        const accepted = e.target.terms.checked; // terms and condition check kora ace kina jante
        // console.log(email,password,accepted);

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
        else if(!accepted){
            setRegisterError('Please accepted our terms and conditions !');
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
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister} className=" ">
                    <input className="mb-4 w-full py-2 px-4" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <div className="mb-4 relative">
                        <input
                            className="w-full py-2 px-4"
                            type={showPassword ? "text" : "password"}   //For showing password
                            placeholder="Password"
                            name="password"
                            id="" required />
                        <span className=" absolute top-2 right-2 text-2xl" onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </span>
                    </div>
                    {/* terms and conditions er checkbox deekhate */}
                    <div className="my-2">
                        <input type="checkbox" name="terms" id="terms" className="text-left" /> {/*id ebong htmlFor er name same hobe */}
                        <label className="ml-2" htmlFor="terms">Accept our <a href="#">Terms and Conditions</a></label>
                    </div>

                    <br />
                    <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />
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