import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Medicine = {
  id: number;
  name: string;
  time: string;
  foodInstruction: "Before Food" | "After Food";
};

const MedicineReminder: React.FC = () => {
  const [medications, setMedications] = useState<Medicine[]>([]);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [foodInstruction, setFoodInstruction] = useState<"Before Food" | "After Food">("Before Food");

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const addMedicine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !time) {
      toast.error("Please enter medicine name and time.");
      return;
    }

    const newMed: Medicine = { id: Date.now(), name, time, foodInstruction };
    setMedications((prev) => [...prev, newMed]);
    setName("");
    setTime("");
    setFoodInstruction("Before Food");
  };

  const addToGoogleCalendar = (med: Medicine) => {
    const now = new Date();
    const [hours, minutes] = med.time.split(":").map(Number);
    now.setHours(hours, minutes, 0, 0);

    const startDate = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"; // Google Calendar format

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Medicine Reminder: ${encodeURIComponent(
      med.name
    )}&details=Take ${encodeURIComponent(med.name)} (${med.foodInstruction})&dates=${startDate}/${startDate}&recur=RRULE:FREQ=DAILY`;

    window.open(googleCalendarUrl, "_blank");

    toast.success("Redirecting to Google Calendar...");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", maxWidth: "400px", margin: "auto", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2>💊 Medicine Reminder</h2>
      <form onSubmit={addMedicine} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Medicine Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <select value={foodInstruction} onChange={(e) => setFoodInstruction(e.target.value as "Before Food" | "After Food")}>
          <option value="Before Food">Before Food</option>
          <option value="After Food">After Food</option>
        </select>
        <button type="submit">➕ Add Reminder</button>
      </form>

      <h3>📌 Reminders</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {medications.map((med) => (
          <li key={med.id} style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <strong>{med.name}</strong> - 🕒 {med.time} - {med.foodInstruction} 
            <br />
            <button onClick={() => addToGoogleCalendar(med)} style={{ marginTop: "5px", padding: "5px 10px", background: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
              📅 Add to Google Calendar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineReminder;
