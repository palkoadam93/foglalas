import { useState, useEffect } from "react";

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

  return (
    <div style={styles.container}>
      <h1>Vendégház Foglalás</h1>

      <form onSubmit={handleBooking} style={styles.form}>
        <input
          type="email"
          placeholder="Email cím"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Foglalás
        </button>
      </form>

      <h2>Foglalások:</h2>
      <ul>
        {bookings.map((booking, index) => (
          <li key={index}>
            {booking.date} – {booking.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;
