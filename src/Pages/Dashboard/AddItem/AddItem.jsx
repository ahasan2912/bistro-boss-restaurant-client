import React from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Category from '../../Home/Category/Category';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItem = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        // image upload to imgbb and then get url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // data send server
            const menuRes = await axiosSecure.post('/menu', menuItem);
            // console.log(menuRes.data);
            if (menuRes.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} is added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            }
        }
        // console.log('with image url', res.data);
    }
    return (
        <div >
            <SectionTitle heading="add an item" subHeading="What's new?"></SectionTitle>
            <div className='flex flex-col items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-red-500 p-5 rounded-2xl'>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Type Name here" className="input input-bordered w-full" />
                    </div>
                    <div className='flex gap-5'>
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                                <option value="offered">Offered</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input type="number" {...register("price", { required: true })} placeholder="Type Name here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control w-full my-2 flex flex-col">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea {...register('recipe', { required: true })} className="textarea textarea-bordered h-24 w-full" placeholder="Bio"></textarea>
                    </div>
                    <div>
                        <input type="file" {...register('image', { required: true })} className="file-input file-input-bordered w-full my-4" />
                    </div>
                    <button type='submit' className='btn w-full'>Add Item <FaUtensils></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;