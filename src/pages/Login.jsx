import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { getDatabase, ref, set, push } from "firebase/database";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const db = getDatabase();

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const loginForm = (data) => {
    console.log(data);

    //todo:initially if everything is working fine

    // if(user.email === data.email  && user.password === data.password){
    //   navigate("/home");
    // }else{
    //   alert("Invalid email or password");
    // }
    //todo:inital checking if login form is working
    // setUser(()=>{
    //   return data

    // })

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userinfo) => {
        console.log("user logged in successfully", userinfo);
        navigate("/home");
        // ...
      })
      .catch((error) => {
        console.log(
          `error in from SignInWithEmailAndPassword function ${error.code}`
        );
      });
  };

  //useContext
  console.log("user", user);

  //todo:LoginWithGoogle function for the google button

  const LogInWithGoogle = () => {
    // todo:button checking
    // alert("hi mern2403!")

    const Provider = new GoogleAuthProvider();

    signInWithPopup(auth, Provider)
      .then((userinfo) => {
        console.log("log in with google successfully", userinfo);
        
        
        const user=userinfo.user
        
        
        
        //todo:user data is stored in the realtime database firebase

        const userRef = push(ref(db, "users/"));
        set(userRef, {
          username: user.displayName || "username is missing",
          email: user.email || "email is missing",
          profile_picture:user.photoURL||"image is missing",
          userUid: user.uid,
        })


      }).then(()=>{
        navigate("/home")
      })
      .catch((error) => {
        console.log(`error in from SignInWithPopup function ${error.code}`)
      });
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 pb-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Login
          </h2>
        </div>

        <div className="grid sm:grid-cols-1 gap-6">
          <button
            onClick={LogInWithGoogle}
            type="button"
            className="w-[25dvw] ml-[37%] px-4 py-2.5 flex items-center justify-center rounded-md text-slate-900 text-sm font-medium tracking-wider cursor-pointer border-0 outline-0 bg-slate-100 hover:bg-slate-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22px"
              fill="#fff"
              className="inline shrink-0 mr-4"
              viewBox="0 0 512 512"
            >
              <path
                fill="#fbbd00"
                d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                data-original="#fbbd00"
              />
              <path
                fill="#0f9d58"
                d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                data-original="#0f9d58"
              />
              <path
                fill="#31aa52"
                d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                data-original="#31aa52"
              />
              <path
                fill="#3c79e6"
                d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                data-original="#3c79e6"
              />
              <path
                fill="#cf2d48"
                d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                data-original="#cf2d48"
              />
              <path
                fill="#eb4132"
                d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                data-original="#eb4132"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <p className="ml-[50%] mt-4 text-red-500 font-bold">Or </p>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    required: { value: true, message: "Email is required" },
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
                  {...register("password", {
                    required: { value: true, message: "Pasword is required" },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 character long",
                    },
                    maxLength: {
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
            <Link
              to="/"
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
