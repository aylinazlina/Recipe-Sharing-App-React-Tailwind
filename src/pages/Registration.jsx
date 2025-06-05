import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set,push } from "firebase/database";

const Registration = () => {
  const auth = getAuth();
  const database = getDatabase();

  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SignUpForm = (data) => {
    console.log(data);
    setUser(() => {
      return data;
    });
    // navigate("/login");

    createUserWithEmailAndPassword(auth,data.email,data.password)
      .then((userinfo) => {
        console.log("usercreated successfully", userinfo);

        updateProfile(auth.currentUser, {
          displayName: data.username || "Jane Q. User",
          photoURL:
            "https://images.pexels.com/photos/1833343/pexels-photo-1833343.jpeg?auto=compress&cs=tinysrgb&w=600",
        })
          .then(() => {
            return sendEmailVerification(auth.currentUser);
          })
          .then(() => {
            // todo:Create a new user in the firebase database
            
            const userRef = push(ref(database, "users/"));
            set(userRef, {
              username: auth.currentUser.displayName || username,
              email: auth.currentUser.email || email,
              profile_picture:
                "https://images.pexels.com/photos/1833343/pexels-photo-1833343.jpeg?auto=compress&cs=tinysrgb&w=600",
              userUid: auth.currentUser.uid,
            });
          })
          .then(() => {
            alert("verification email sent to your email address");
            navigate("/login");
          })
          .then(() => {
            alert("account created succfully");
          })
      })
      .catch((error) => {
        console.log(
          `error from createUserWithEmailAndPassword function  ${error.code} `
        );
      });
  };

  console.log("user", user);
  return (
    <div>
      <div>
        <div className="text-center bg-gradient-to-r from-blue-800 to-blue-400 min-h-[180px] sm:p-6 p-4">
          <h4 className="sm:text-3xl text-2xl text-white font-medium mt-3">
            Create your free account
          </h4>
        </div>

        <div className="mx-4 mb-4 -mt-20">
          <form
            onSubmit={handleSubmit(SignUpForm)}
            className="max-w-4xl mx-auto bg-white [box-shadow:0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md"
          >
           

            

            <div className="grid sm:grid-cols-1 gap-8">
              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  User Name
                </label>
                <input
                  name="username"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "username is required",
                    },
                    minLength: {
                      value: 5,
                      message: "username must be at least 5 character long",
                    },
                    maxLength: {
                      value: 20,
                      message: "username must be at most 20 character long",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores",
                    },
                  })}
                  type="text"
                  className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-800 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                  placeholder="enter username"
                />
                {errors.username && (
                  <span className="font-bold text-red-500">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Email Id
                </label>
                <input
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email is required",
                    },
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
                  type="text"
                  className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-800 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                  placeholder="youremail@email.com"
                />
                {errors.email && (
                  <span className="text-red-400 font-bold">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div>
                <label className="text-slate-800 text-sm font-medium mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-800 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                  placeholder="Enter password"
                  {...register("password", {
                    required: { value: true, message: "password is required" },

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
                />
                {errors.password && (
                  <span className="text-red-400 font-bold">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="py-2.5 px-5 text-sm font-medium tracking-wider rounded-sm cursor-pointer text-white bg-primary_color hover:bg-hover_color focus:outline-0"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
