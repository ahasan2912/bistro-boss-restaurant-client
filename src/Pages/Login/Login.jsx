import React, { useContext, useEffect, useRef, useState } from 'react';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import Image from '../../../src/assets/hardware-device-animation.gif';
import { AuthContext } from '../../Providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import googleLogo from '../../assets/google.png'
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Login = () => {
    const { userSignInEmail, loginWithGoogle } = useContext(AuthContext);
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic()
    const from = location.state?.from?.pathname || "/";
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // userLogin
        userSignInEmail(email, password)
            .then(result => {
                const user = result.user;
                Swal.fire({
                    title: "Logged In!",
                    icon: "success",
                    draggable: true
                });
                navigate(from, { replace: true });
            })
    }
    const hanldeValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value) === true) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }

    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(result => {
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            title: "Logged In!",
                            icon: "success",
                            draggable: true
                        });
                        // console.log(res.data)
                        navigate(from, { replace: true });
                    })
            })
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className='flex flex-col justify-center items-center h-screen'>
                <div className='flex flex-col md:flex-row justify-center '>
                    <div>
                        <img src={Image} alt="" />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body py-0">
                            <h1 className='text-4xl font-bold text-center'>Please LogIn</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <div className='h-16'>
                                    <LoadCanvasTemplate />
                                </div>
                                <input onBlur={hanldeValidateCaptcha} type="text" name='captcha' placeholder="type the text above" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={disabled} type="submit" className='btn w-full btn-primary' value={"LogIn"} />
                            </div>
                        </form>
                        <div className="divider px-8">OR</div>
                        <div className='px-8 pb-5'>
                            <button onClick={handleGoogleLogin} className='btn hover:bg-blue-500 w-full'>
                                <img className='w-10' src={googleLogo} alt="" />
                            </button>
                            <div className='mt-2'>
                                <p>New Here? <Link to="/register">Create an account</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;