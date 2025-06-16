import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);
  }, []);

  const handleBooking = (e) => {
    e.preventDefault();

    if (!email || !date) {
      alert("Kérlek, adj meg egy érvényes e-mail címet és dátumot!");
      return;
    }

    const newBooking = { email, date };
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    alert(`Foglalás rögzítve: ${date} - ${email}`);
    setEmail("");
    setDate("");
  };

  const handleClearBookings = () => {
    if (window.confirm("Biztosan törölni szeretnéd az összes foglalást?")) {
      localStorage.removeItem("bookings");
      setBookings([]);
    }
  };

  return (
    <div className="background">
    <div className="container">
      <h1>Vendégház foglalás</h1>

      <form onSubmit={handleBooking} className="form">
        <input
          type="email"
          placeholder="Email cím"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button">
          Foglalás
        </button>
      </form>

      <button onClick={handleClearBookings} className="button delete-button">
        Összes foglalás törlése
      </button>

      <h2>Foglalások:</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {booking.date} – {booking.email}
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
