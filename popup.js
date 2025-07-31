const params = new URLSearchParams(window.location.search);
const action = params.get("action");
const method = params.get("method");
const data = params.get("data");

document.getElementById("formAction").textContent = action || "Unknown";
document.getElementById("formMethod").textContent = method || "POST";

let parsed = {};
try {
  parsed = JSON.parse(data);
} catch (e) {
  parsed = {};
}


const ignoredKeys = ["_token", "__csrf", "submit", "g-recaptcha-response"];

let display = "";
for (let key in parsed) {
  const value = parsed[key];
  if (!ignoredKeys.includes(key) && value.trim() !== "") {
    display += `${key}: ${value}\n`;
  }
}

document.getElementById("formValues").textContent = display || "No visible user inputs.";

document.getElementById("submitBtn").onclick = () => {
  chrome.runtime.sendMessage({ type: "submitForm" });
  //  window.close(); 
};

document.getElementById("cancelBtn").onclick = () => {
  chrome.runtime.sendMessage({ type: "cancelForm" });
  window.close();
};


if (action) {
  fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: action })
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("aiResult").textContent = data.analysis || "No AI response.";
    })
    .catch((err) => {
      document.getElementById("aiResult").textContent = "AI request failed.";
      console.error("AI Error:", err);
    });
}