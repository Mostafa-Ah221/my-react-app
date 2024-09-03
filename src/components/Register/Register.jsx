import axios from 'axios';
import { Formik, useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ClipLoader from 'react-spinners/ClipLoader';
export default function Register() {
  //Yup
    let validationSchema=Yup.object().shape({
      name:Yup.string().min(3,"name minlingth is 3").max(10,"name maxlingth is 10").required("name is required"),
      email:Yup.string().email("email is invaild").required("email is required"),
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/ , "phone must be vaild egyption number").required("phone is required"),
      password:Yup.string().matches(/^[A-Z][a-z]{5,10}$/ , "password must start uppercase ").required("password is required"),
      rePassword:Yup.string().oneOf([Yup.ref('password')],"password and repassword must be same shap").required("password is required"),

    })
const [errorMas,setErrorMas]=useState("");
const [loading, setLoading] = useState(false);
  let navigate=useNavigate()
   function handlRegisetr(values) {
    setLoading(true);
   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).then((apiResponse)=>{
    setLoading(false)
    navigate('/')

  }).catch((apiResponse)=>{
    setLoading(false)
setErrorMas(apiResponse.response.data.message);

  })
  // console.log(data);
  // if(data.message === "success"){
  //   navigate('/')
  // }else{
  //   // ! ????????????
  // }
  
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: handlRegisetr
  });

  return (
    <>
    
      <div className="py-6 max-x-xl mx-auto max-w-xl">
        {errorMas?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {errorMas}
            </div>:null}
         
        <h2 className="text-green-800 font-bold text-2xl">Register Now</h2>
        <form onSubmit={formik.handleSubmit} className="my-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {formik.errors.name && formik.touched.name ? (

            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.name}
            </div>
           ) : null}
            
            <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
             {formik.errors.email && formik.touched.email ? (

            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
           ) : null}
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="phone"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.phone}
              type="tel"
               name="phone"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
             {formik.errors.phone && formik.touched.phone ? (

            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div>
           ) : null}
            <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {formik.errors.password && formik.touched.password ? (

            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>
           ) : null}
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
          </div>
          
          <div className="relative z-0 w-full mb-5 group">
            <input
              id="rePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              name="rePassword"
              className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (

            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.rePassword}
            </div>
           ) : null}
            <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-enter Your Password</label>
          </div>
          
          <button type="submit" className="text-white mt-7 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            {loading?<ClipLoader color="#36d7b7" size={15} />:"Submit"}
            </button>
        </form>
      </div>
    </>
  );
}
