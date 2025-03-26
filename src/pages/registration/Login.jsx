/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import {
  signInWithEmailAndPassword,
  auth,
  query,
  fireDB,
  collection,
  where,
  onSnapshot,
} from "../../firebase/FirebaseConfig";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  // navigate
  const navigate = useNavigate();

  // User Signup State
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  /**========================================================================
   *                          USER LOGIN FUNCTION
   *========================================================================**/

  const userLoginFunction = async () => {
    // validation
    if (userLogin.email.trim() === "" || userLogin.password.trim() === "") {
      return toast.error("All Feild are Required");
    }

    setLoading(true);

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      // console.log(users, "<<< login user");

      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );

        console.log(q,"<<>..,,,,<<")

        const data = onSnapshot(q, (querySnapshot) => {
          let user;

          querySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserLogin({
            email: "",
            password: "",
          });

          toast.success("Login Successfully");
          setLoading(false);

          if (user.role === "user") {
            navigate("/user-dashboard");
          } else {
            navigate("/admin-dashboard");
          }
        });

        return () => data;
      } catch (error) {
        console.log("err >>>", error);
        setLoading(false);
        toast.error("Login Catch Error");
      }

      // -------======================*******************-================
    } catch (error) {
      console.log("error >>", error);
      setLoading(false);
      toast.error("catch error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Loading Component */}
      {loading && <Loader />}
      {/* Login Form  */}
      <div className="login_Form bg-pink-50 !px-1 lg:!px-8 !py-6 border border-pink-100 rounded-xl shadow-md">
        {/* Top Heading  */}
        <div className="!mb-5">
          <h2 className="text-center text-2xl font-bold text-pink-500 ">
            Login
          </h2>
        </div>

        {/* Input one  */}
        <div className="!mb-3">
          <input
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({
                ...userLogin,
                email: e.target.value,
              })
            }
            type="email"
            placeholder="Email Address"
            className="bg-pink-50 border border-pink-200 !px-2 !py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Input two  */}
        <div className="!mb-5">
          <input
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({
                ...userLogin,
                password: e.target.value,
              })
            }
            type="password"
            placeholder="Password"
            className="bg-pink-50 border border-pink-200 !px-2 !py-2 w-96 rounded-md outline-none placeholder-pink-200"
          />
        </div>

        {/* Signup Button  */}
        <div className="!mb-5">
          <button
            onClick={() => userLoginFunction()}
            type="button"
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center !py-2 font-bold rounded-md "
          >
            Login
          </button>
        </div>

        <div>
          <h2 className="text-black">
            Don't Have an account{" "}
            <Link className=" text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
