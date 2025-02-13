import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { FaUtensils } from 'react-icons/fa';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, recipe, image, price, _id} = useLoaderData();
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
                const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
                // console.log(menuRes.data);
                if (menuRes.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${data.name} is updated to the menu`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // reset();
                }
            }
            // console.log('with image url', res.data);
        }
    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Refresh Inof"></SectionTitle>
            <div className='flex flex-col items-center justify-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='border border-red-500 p-5 rounded-2xl'>
                    <div className="form-control w-full my-2">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input type="text" defaultValue={name} {...register("name", { required: true })} placeholder="Type Name here" className="input input-bordered w-full" />
                    </div>
                    <div className='flex gap-5'>
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
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
                            <input type="number" defaultValue={price} {...register("price", { required: true })} placeholder="Type Name here" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className="form-control w-full my-2 flex flex-col">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe', { required: true })} className="textarea textarea-bordered h-24 w-full" placeholder="Bio"></textarea>
                    </div>
                    <div>
                        <input type="file" {...register('image', { required: true })} className="file-input file-input-bordered w-full my-4" />
                    </div>
                    <button type='submit' className='btn w-full'>Update Item <FaUtensils></FaUtensils> </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
