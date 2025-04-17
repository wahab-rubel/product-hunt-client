import { useContext, useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isCaptchaFilled, setIsCaptchaFilled] = useState(false);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    setIsCaptchaFilled(!!captchaValue);
  }, [captchaValue]);

  const onSubmit = async (data) => {
    if (!captchaValue) {
      return Swal.fire({
        icon: "warning",
        title: "Please verify that you are not a robot.",
      });
    }

    try {
      // Create user with email and password
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;
      console.log("User Registered:", loggedUser);

      // Update user profile
      await updateUserProfile(data.name, data.photoURL);

      // Store user data in the database
      const userInfo = { name: data.name, email: data.email };
      const res = await axios.post("http://localhost:5000/signup", userInfo);

      if (res.data.message === "Registered" && res.data.token) {
        console.log("User added to database and token received");
        localStorage.setItem("user-token", res.data.token); // Store token
        reset();
        setCaptchaValue(null); // Reset captcha
        setIsCaptchaFilled(false);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/"); // Redirect to home after successful registration
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: res.data.message || "Something went wrong during registration.",
        });
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setCaptchaValue(null); // Reset captcha on error
      setIsCaptchaFilled(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      if (error.response?.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: "The signup endpoint could not be found on the server.",
        });
      } else if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email is already in use. Please log in instead.",
        });
        navigate("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: error.message || "An unexpected error occurred during signup.",
        });
      }
    }
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <>
      <Helmet>
        <title>Product Hunt | Sign Up</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6">
              Create an account to unlock all the features.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">{errors.name.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", {
                    required: "Photo URL is required",
                  })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">
                    {errors.photoURL.message}
                  </span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be at most 20 characters",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      message:
                        "Password must contain uppercase, lowercase, number, and special character.",
                    },
                  })}
                  placeholder="Password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Verify</span>
                </label>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                  className="mx-auto"
                />
              </div>

              <div className="form-control mt-6">
                <input
                  className={`btn ${
                    isCaptchaFilled
                      ? "btn-primary"
                      : "border-t-orange-500 disabled:bg-gray-500"
                  }`}
                  type="submit"
                  value="Sign Up"
                  disabled={!isCaptchaFilled}
                />
              </div>
            </form>
            <p className="px-6">
              <small>
                Already have an account? <Link to="/login">Login</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
