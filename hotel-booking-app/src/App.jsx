import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dummy Hotels Data with Images
  const hotels = [
    {
      id: 1,
      name: 'Hotel Bliss Luxeon',
      location: 'Mumbai',
      price: '3017.74',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 2,
      name: 'Hotel Marina Nebula',
      location: 'Mumbai',
      price: '2873.51',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 3,
      name: 'Hotel Blissful Cascade',
      location: 'Delhi',
      price: '9765.25',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 4,
      name: 'Hotel Haven Cascade',
      location: 'Ahmedabad',
      price: '7049.34',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 5,
      name: 'Hotel Bliss Zephyr',
      location: 'Jaipur',
      price: '8222.63',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=500&auto=format&fit=crop&q=60'
    },
    {
      id: 6,
      name: 'Hotel Sky Utopia',
      location: 'Hyderabad',
      price: '8371.84',
      image: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=500&auto=format&fit=crop&q=60'
    }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    } else {
      alert('Please fill all fields');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // 1. LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#1e293b',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '24px' }}>Login</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #475569',
                backgroundColor: '#334155',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #475569',
                backgroundColor: '#334155',
                color: '#fff',
                fontSize: '16px'
              }}
            />
            <button type="submit" style={{
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#22c55e',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Login</button>
          </form>
          <p style={{ color: '#38bdf8', textAlign: 'center', marginTop: '16px', cursor: 'pointer' }}>
            Don't have an account? Register here
          </p>
        </div>
      </div>
    );
  }

  // 2. HOTEL BOOKING HOME SCREEN
  return (
    <div style={{
      backgroundColor: '#0f172a',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'between',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #334155',
        paddingBottom: '20px',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: 0 }}>Hotel Booking App</h1>
        <button onClick={handleLogout} style={{
          backgroundColor: '#ef4444',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>Logout</button>
      </div>

      {/* Grid Grid Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {hotels.map((hotel) => (
          <div key={hotel.id} style={{
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Hotel Image Tag */}
            <img 
              src={hotel.image} 
              alt={hotel.name} 
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover'
              }}
            />
            {/* Card Content */}
            <div style={{ padding: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>{hotel.name}</h3>
              <p style={{ color: '#94a3b8', margin: '5px 0' }}><strong>Location:</strong> {hotel.location}</p>
              <p style={{ color: '#38bdf8', fontSize: '18px', margin: '10px 0', fontWeight: 'bold' }}>
                Price: ₹{hotel.price}
              </p>
              <button style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0284c7',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                marginTop: '10px'
              }}>Book Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;