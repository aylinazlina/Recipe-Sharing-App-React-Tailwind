import React from "react";
import {useContext} from "react"
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import {Link} from "react-router";
const Login = () => {

const {user,setUser}=useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loginForm = (data) => {
    console.log(data);
    setUser(()=>{
      return data

    })
  };

    //useContext
    console.log("user",user);

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(loginForm)}
            action="#"
            method="POST"
          >
            <div>
              <label
                for="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="your@email.com"
                  autocomplete="email"
                  {...register("email", {
                    required: {value:true,message:"Email is required"},
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address",
                    },
                    minLength: {
                      value: 5,
                      message: "Email must be at least 5 characters long",
                    },
                    maxLength: {
                      value: 50,
                      message: "Email must be at most 50 characters long",
                    },
                  })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.email && (
                  <span className="text-red-400 font-bold">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  autocomplete="current-password"
                  placeholder="••••••••"
                  {...register(
                    "password",{
                     required:{value:true,message:"Pasword is required"} ,
                      minLength: {
                      value: 6,
                      message: "Password must be at least 6 character long",
                    },
                    maxLength:{
                      value: 20,
                      message: "Password must be at most 20 character long",
                    },
                    // pattern:{
                    //  value:
                    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/,
                    //     message:
                    //     "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                    // },
                  })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {errors.password && (
                  <span className="text-red-400 font-bold">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary_color px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-hover_color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Don't have an account?{" "}
            <Link to="/" 
              
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
