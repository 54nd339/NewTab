
const bodyEl = document.body;
const links = document.getElementsByTagName("a");
const dateEl = document.getElementById("date");
const clockEl = document.getElementById("clock");
const greetingEl = document.getElementById("greeting");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Update the clock every second
const updateClock = () => {
  clockEl.textContent = new Date().toLocaleTimeString();
};
updateClock(); // Initial call
setInterval(updateClock, 1000);

// Get today's date
const today = new Date();
const formattedToday = `${months[today.getMonth()]} ${String(today.getDate()).padStart(2, '0')}, ${today.getFullYear()}`;
dateEl.textContent = formattedToday;

// Set greeting based on the current hour
const hours = today.getHours();
const greetingMessage = hours < 6 || hours >= 18
  ? "Good evening, "
  : hours < 12
    ? "Good morning, "
    : "Good afternoon, ";
greetingEl.textContent = greetingMessage;
