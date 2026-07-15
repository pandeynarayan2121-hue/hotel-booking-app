import { useEffect, useState } from "react";

function App() {
  const [hotels, setHotels] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  // Agar localStorage me pehle se 'user' ka data hai toh seedha Login screen dikhegi
  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem("user") ? true : false
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hotels ka data API se fetch karne ke liye
  useEffect(() => {
    fetch("https://demohotelsapi.pythonanywhere.com/hotels/")
      .then((res) => res.json())
      .then((data) => setHotels(data.data))
      .catch((err) => console.log("API Error:", err));
  }, []);

  // Register function
  const register = () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ name, email, password })
    );

    alert("Registration Successful");
    setIsRegistered(true);
    setName("");
    setEmail("");
    setPassword("");
  };

  // Login function
  const login = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (
      user &&
      user.email === email &&
      user.password === password
    ) {
      setIsLogin(true);
      // Login hone ke baad inputs ko clear karne ke liye
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid Email or Password");
    }
  };

  // Agar user login nahi hai, toh Register/Login form dikhao
  if (!isLogin) {
    return (
      <div
        style={{
          background: "#111827",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <div
          style={{
            background: "#1f2937",
            padding: "30px",
            borderRadius: "10px",
            width: "320px",
          }}
        >
          {!isRegistered ? (
            <>
              <h2>Register</h2>

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #4b5563", background: "#374151", color: "white" }}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #4b5563", background: "#374151", color: "white" }}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #4b5563", background: "#374151", color: "white" }}
              />

              <button
                onClick={register}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#0ea5e9",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Register
              </button>
              
              <p style={{ fontSize: "14px", marginTop: "10px", textAlign: "center", cursor: "pointer", color: "#38bdf8" }} onClick={() => setIsRegistered(true)}>
                Already registered? Login here
              </p>
            </>
          ) : (
            <>
              <h2>Login</h2>

              <input
                type="email"
                placeholder="Email"
                value={email} // Fixed: added value
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #4b5563", background: "#374151", color: "white" }}
              />

              <input
                type="password"
                placeholder="Password"
                value={password} // Fixed: added value
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #4b5563", background: "#374151", color: "white" }}
              />

              <button
                onClick={login}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}
              >
                Login
              </button>

              <p style={{ fontSize: "14px", marginTop: "10px", textAlign: "center", cursor: "pointer", color: "#38bdf8" }} onClick={() => setIsRegistered(false)}>
                Don't have an account? Register here
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Agar user successfully login ho jata hai, toh Hotels Dashboard dikhao
  return (
    <div
      style={{
        background: "#111827",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1>Hotel Booking App</h1>
        <button 
          onClick={() => setIsLogin(false)} 
          style={{ background: "#ef4444", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {hotels.slice(0, 12).map((hotel) => (
          <div
            key={hotel.id}
            style={{
              background: "#1f2937",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              border: "1px solid #374151"
            }}
          >
            <h2>{hotel.name}</h2>
            <p><b>Location:</b> {hotel.location}</p>
            <p><b>Price:</b> ₹{hotel.price}</p>
            <button
              style={{
                background: "#0ea5e9",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;