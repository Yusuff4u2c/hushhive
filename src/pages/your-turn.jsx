import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import logoIcon from "../assets/image/logo-icon.png";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/input";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../libs/firebase";
import { AuthenticationService } from "../libs/services/AuthenticationService";

const regSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(5, "password must be at least 5 characters")
    .required("password is required"),
});

const YourTurn = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(regSchema),
  });

  async function onSubmit(data) {
    try {
      await AuthenticationService.register({
        username: data.username,
        password: data.password,
      });

      toast.success("User Registration Complete. Proceed to Login");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(199,53,199)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-10 my-4 rounded-2xl">
        <div>
          <img src={logoIcon} alt="" />
        </div>

        <h1 className="text-4xl">Register</h1>
        <div className="bg-[#c1bca9] text-center px-8 py-3 rounded-lg">
          <h1 className="text-xl pb-3 border-b text-[#61562a]">How to Play?</h1>
          <div className="text-green-700  pt-3">
            <p>
              ►<span className="font-bold">Register your Account</span> NOW!!
              👇👇👇
            </p>
            <p>
              ► Share your <span className="font-bold">Dare Link</span> with
              others
            </p>
            <p>
              ► Recieve{" "}
              <span className="font-bold">
                anonymous compliments and secret <br />
                messages
              </span>{" "}
              from your friends.
            </p>
          </div>
        </div>
        <p className="text-green-600">
          {" "}
          Now it's your turn to create an account and dare <br /> your friends
          to tell you what they think about you!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label htmlFor="user-name" className="block mb-2  ">
              Your Username
            </label>
            <Input
              type="text"
              id="user-name"
              placeholder="Enter your username"
              {...register("username")}
              error={errors.username?.message}
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2" htmlFor="password">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button type="submit">Register Account</Button>
        </form>
        <Link to="/login" className="text-gray-500">
          Already Have an Account? Log in
        </Link>

        <p className="text-sm">
          By using this service, you agree to our Privacy Policy, Terms of
          Service and any <br />
          related policies. <Link to="/disclaimer">(Check Disclaimer)</Link>
        </p>
      </div>
    </div>
  );
};

export default YourTurn;