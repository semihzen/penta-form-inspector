# PentaMate Form Interceptor Extension (with Gemini AI Integration)

![WhatsApp Görsel 2025-07-31 saat 18 11 22_cca53669](https://github.com/user-attachments/assets/5f96f54e-d023-4415-8ebe-95ac0cfca0af)


This is a custom form inspector extension developed using Node.js. Its main purpose is to intercept and analyze form submissions **before** they are sent to a remote server. It shows the user the form data, action URL, and also uses Gemini AI to assess the safety of the destination.

---

## ✅ Key Features

- Intercepts HTML form submissions in real time  
- Displays full form content including `action`, `method`, and form data  
- Integrated with **Gemini AI** to evaluate the trustworthiness of the submission URL  
- Shows warnings before submitting to potentially suspicious services  
- Lightweight and easy to run locally or as a side-loaded Chrome extension  

---

## Gemini AI Integration

The extension uses **Gemini AI** to analyze the URL to which the form is being submitted. The AI provides helpful insight into the legitimacy and risk level of the external endpoint — helping users avoid phishing and malicious data collection.

---

## Technologies Used

| Stack                | Description                               |
|----------------------|-------------------------------------------|
| Node.js              | Core backend logic                        |
| Gemini API           | For AI-powered link analysis              |
| JavaScript/HTML/CSS  | Chrome extension frontend                 |
| Chrome Extensions API| Used to capture form submission           |

---
## ⚙️ Setup Instructions

### 1. Clone the repository:

```
git clone https://github.com/semihzen/form-interceptor.git
cd form-interceptor
```

### 2. Install dependencies:

```
npm install
```

### 3. Add your Gemini API key in a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
```

### 4. Start the server:

```
npm run start
```

### 5. Side-load the `manifest.json` in Chrome for testing:

- Open `chrome://extensions/`
- Enable **Developer Mode**
- Click **Load Unpacked**
- Select the extension root directory




