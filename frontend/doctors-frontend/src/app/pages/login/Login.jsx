import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [details, setDetails] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const newDetails = { email, password };
      console.log("newDetails", newDetails);
      toast.success("Login successful");

      setDetails([...details, newDetails]);
      console.log("details", details);

      setEmail("");
      setPassword("");
    } else {
      toast.error("Please enter your email and password");
    }
  };
  return (
    <>
      <div>Login</div>

      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Login
        </h2>
        <p>please login to book the appointment</p>

        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="email"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            name="email"
            id="email"
            required
          />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
          <label htmlFor="password"></label>
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          Login
        </button>
        <p className="text-center mt-4">
          dont have an account?{" "}
          <Link to="/create-account" className="text-blue-500 underline">
            sign up
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
