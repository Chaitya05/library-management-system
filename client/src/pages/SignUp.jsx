import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignUp({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", { name, email, password });
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        toast.success("Signed up");
        navigate("/");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong during signup");
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Sign Up</h2>
      <form onSubmit={submit}>
        <div><label>Name</label><br/>
          <input value={name} onChange={e=>setName(e.target.value)} required/></div>
        <div style={{marginTop:8}}><label>Email</label><br/>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div style={{marginTop:8}}><label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <button style={{marginTop:12}} type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
