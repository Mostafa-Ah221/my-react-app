import React from 'react'
import { useQuery } from 'react-query';
import axios from 'axios'
import { GridLoader } from 'react-spinners';

function Categories() {
    async function getCategories() { 
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    let { isLoading: isCategoryLoading, isError: isCategoryError, data: categoryData } = useQuery('getCategories', getCategories);

   
    // console.log(categoryData);

    return (
        <>
            {isCategoryLoading ?
                <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-50 bg-black opacity-50">
                    <GridLoader color="#0fa215" />
                </div>
                :
                <div className='container mx-auto'>
                    <div className='grid grid-cols-12 gap-6 my-14'>
                        {categoryData?.data?.data && Array.isArray(categoryData.data.data) ? (
                            categoryData.data.data.map((category) => (
                                <div key={category._id} className='lg:col-span-4 md:col-span-6 col-span-12 border text-center p-4 hover:shadow-2xl hover:scale-105 duration-500'>
                                    <div className="brand h-72">
                                        <img className='w-full h-64 object-contain' src={category.image} alt={category.name} />
                                        <h3 className='my-2 text-green-700 sm:text-sm lg:text-2xl '>{category.name}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No categories found.</div>
                        )}
                    </div>
                </div>
            }
        </>
    )
}

export default Categories;
