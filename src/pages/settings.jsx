import { Link, useNavigate } from "react-router-dom";
import logoIcon from "../assets/image/logo-icon.png";
import Button from "../components/button";

import {
  FaToolbox,
  FaEnvelope,
  FaKey,
  FaUser,
  FaPowerOff,
  FaInfoCircle,
  FaQuestionCircle,
  FaLongArrowAltLeft,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthenticationService } from "../libs/services/AuthenticationService";
import useAuth from "../hooks/useAuth";

const Settings = () => {
  const navigate = useNavigate();
  const { signUserOutOfApp } = useAuth();

  async function handleLogOut() {
    try {
      await AuthenticationService.logout();
      signUserOutOfApp();
      toast.success("Signed Out");
      navigate("/login");
    } catch (error) {
      const errorCode = error.code;
      toast.error(errorCode);
    }
  }

  return (
    <div className="flex justify-center items-center text-white bg-gradient-to-r from-[rgb(167,49,167)] from-25% to-[#7a4cc4]">
      <div className="bg-[#250933] flex flex-col justify-center items-center gap-8 p-4 sm:p-10 my-4 rounded-2xl w-[90%] max-w-3xl">
        <div>
          <img src={logoIcon} alt="" />
        </div>
        <h1 className="text-4xl">Settings</h1>
        <div className="border-b-2 border-[rgb(142,28,177)] flex flex-col pb-6 text-center">
          <Button className={"w-[90%] sm:w-full"}>
            <div className="flex justify-center gap-3 items-center">
              View Archived Answers <FaToolbox />
            </div>
          </Button>
          <Link to="/change-email">
            <Button className={"w-[90%] sm:w-full"}>
              <div className="flex justify-center gap-3 items-center">
                Change Email <FaEnvelope />
              </div>
            </Button>
          </Link>
          <Link to="/change-password">
            <Button className={"w-[90%] sm:w-full"}>
              <div className="flex justify-center gap-3 items-center">
                Change Password <FaKey />
              </div>
            </Button>
          </Link>

          <Link to="/change-username">
            <Button className={"w-[90%] sm:w-full"}>
              <div className="flex justify-center gap-3 items-center">
                Change Username <FaUser />
              </div>
            </Button>
          </Link>
          <Link to="/disclaimer">
            <Button className={"w-[90%] sm:w-full"}>
              <div className="flex justify-center gap-3 items-center">
                Disclaimer <FaInfoCircle />
              </div>
            </Button>
          </Link>
          <Button className={"w-[90%] sm:w-full"}>
            <div className="flex justify-center gap-3 items-center">
              Contact Us <FaQuestionCircle />
            </div>
          </Button>

          <Button onClick={handleLogOut}>
            <div className="flex justify-center gap-3 items-center">
              Log Out <FaPowerOff />
            </div>
          </Button>
        </div>
        <Link to="/home">
          <Button>
            <div className="flex w-full justify-center gap-3 items-center">
              <FaLongArrowAltLeft /> Go Back
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;
