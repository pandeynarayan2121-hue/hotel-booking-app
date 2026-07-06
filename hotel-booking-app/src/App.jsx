import { useEffect, useState } from "react";

function App() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("https://demohotelsapi.pythonanywhere.com/hotels/")
      .then((res) => res.json())
      .then((data) => setHotels(data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        background: "#111827",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Hotel Booking App</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))",
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
              boxShadow: "0 0 10px gray",
            }}
          >
            <h2>{hotel.name}</h2>

            <p>
              <b>Location:</b> {hotel.location}
            </p>

            <p>
              <b>Price:</b> ₹{hotel.price}
            </p>

            <button
              style={{
                background: "#0ea5e9",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
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