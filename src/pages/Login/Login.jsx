import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../context/AuthContext";


const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = "/dashboard";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      Swal.fire({
        title: "Validation Failed!",
        text: "Please fill in both email and password.",
        icon: "warning",
      });
      return;
    }

    setLoading(true);

    try {
      const result = await signIn(email, password);
      const user = result.user;

      Swal.fire({
        title: "User Login Successful.",
        icon: "success",
      });

      form.reset();

      // Navigate to dashboard after successful login
      navigate(redirectPath, { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Login Failed!",
        text: error.message,
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    setDisabled(!validateCaptcha(user_captcha_value));
  };

  return (
    <>
      <Helmet>
        <title>Product Hunt | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidateCaptcha}
                  type="text"
                  name="captcha"
                  placeholder="type the captcha above"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  disabled={disabled || loading}
                  className="btn btn-primary"
                  type="submit"
                  value={loading ? "Logging In..." : "Login"}
                />
              </div>
            </form>
            <p className="px-6">
              <small>
                New Here? <Link to="/signup">Create an account</Link>
              </small>
            </p>
            <SocialLogin />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
