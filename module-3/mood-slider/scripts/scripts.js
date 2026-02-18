const slider = document.getElementById("moodSlider");
const rangeFill = document.getElementById("rangeFill");
const statusEmoji = document.getElementById("statusEmoji");
const statusText = document.getElementById("statusText");
const statusValue = document.getElementById("statusValue");
const resetBtn = document.getElementById("resetBtn");
const saveBtn = document.getElementById("saveBtn");

const COOKIE_NAME = "moodValue";
const DEFAULT_VALUE = 50;

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
  const decoded = decodeURIComponent(document.cookie || "");
  const parts = decoded.split(";").map(p => p.trim());

  for (const part of parts) {
    if (part.startsWith(name + "=")) {
      return part.substring(name.length + 1);
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`;
}

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function moodForValue(value) {
  if (value <= 20) return { emoji: "☹️", label: "Not great" };
  if (value <= 40) return { emoji: "😕", label: "Low" };
  if (value <= 60) return { emoji: "😐", label: "Neutral" };
  if (value <= 80) return { emoji: "🙂", label: "Good" };
  return { emoji: "😊", label: "Great" };
}

function updateUI(value) {
  const v = clamp(Number(value), 0, 100);
  slider.value = String(v);

  rangeFill.style.width = `${v}%`;

  const mood = moodForValue(v);
  statusEmoji.textContent = mood.emoji;
  statusText.textContent = mood.label;
  statusValue.textContent = String(v);

  saveBtn.textContent = "Saved";
  saveBtn.classList.add("saved");
  window.setTimeout(() => {
    saveBtn.classList.remove("saved");
  }, 350);
}

function saveValue(value) {
  setCookie(COOKIE_NAME, value, 1);
}

function loadValue() {
  const saved = getCookie(COOKIE_NAME);
  if (saved === null || saved === "") return DEFAULT_VALUE;

  const num = Number(saved);
  if (Number.isNaN(num)) return DEFAULT_VALUE;

  return clamp(num, 0, 100);
}

slider.addEventListener("input", () => {
  updateUI(slider.value);
  saveValue(slider.value);
});

resetBtn.addEventListener("click", () => {
  deleteCookie(COOKIE_NAME);
  updateUI(DEFAULT_VALUE);
});

saveBtn.addEventListener("click", () => {
  updateUI(slider.value);
  saveValue(slider.value);
});

window.addEventListener("DOMContentLoaded", () => {
  const initial = loadValue();
  updateUI(initial);
});
