import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Image from '../../../src/assets/hardware-device-animation.gif';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import googleLogo from '../../assets/google.png'
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const Register = () => {
    const axiosPublic = useAxiosPublic();
    const { userRegisterInEmail, updateUserProfile, loginWithGoogle } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = data => {
        userRegisterInEmail(data.email, data.password)
            .then(result => {
                const loggerUser = result?.user;
                updateUserProfile(data.name, data.photo)
                    .then(() => {
                        // user data save in server
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: data.photo
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        title: "Register Successfully!",
                                        icon: "success",
                                        draggable: true
                                    });
                                }
                            })
                        navigate(from, { replace: true });
                    })
            })
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
                <title>Bistro Boss | Register</title>
            </Helmet>
            <div className='flex flex-col justify-center items-center h-screen'>
                <div className='flex flex-col md:flex-row justify-center '>
                    <div>
                        <img src={Image} alt="" />
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body py-0">
                            <h1 className='text-4xl font-bold text-center'>Please Register</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="Enter Your Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Photo</span>
                                </label>
                                <input type="url" {...register("photo", { required: true })} placeholder="Enter photo Url" className="input input-bordered" />
                                {errors.photo && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" required />
                                {errors.email && <span className='text-red-500'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 100,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 10 characters</p>}
                                {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must be 1 upper case 1 lower case 1 number and 1 special character</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className='btn w-full btn-primary' value={"Register"} />
                            </div>
                        </form>
                        <div className="divider px-8">OR</div>
                        <div className='px-8 pb-5'>
                            <button onClick={handleGoogleLogin} className='btn hover:bg-blue-500 w-full'>
                                <img className='w-10' src={googleLogo} alt="" />
                            </button>
                            <div className='mt-2'>
                                <p>New Here? <Link to="/login">Create an account</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Register;
