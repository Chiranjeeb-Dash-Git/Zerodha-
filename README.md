<div align="center">
  <div align="center">
  <br />
  <a href="https://chiranjeeb-dash-git.github.io/Zerodha-/">
    <img src="https://img.shields.io/badge/LAUNCH-LIVE_DEMO-8B5CF6?style=for-the-badge&logoColor=white&logo=render" height="50" alt="Live Demo" />
  </a>
  <br />
  <br />
</div>

  <img src="assets/banner.png" alt="Zerodha Banner" width="100%">
  
  <h1>📈 Zerodha – Premium Stock Trading Platform</h1>
  
  <p align="center">
    <a href="https://chiranjeeb-dash-git.github.io/Zerodha-/"><strong>Live Demo »</strong></a>
    <br />
    <br />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  </p>
</div>

---

## 📝 Project Overview

**Zerodha Clone** is a state-of-the-art, full-stack stock trading ecosystem. It provides users with a seamless experience to monitor real-time market fluctuations, execute trades, and manage a diversified investment portfolio with professional-grade analytics.

Built with performance and scalability in mind, the platform mimics the core functionalities of the popular Zerodha Kite interface, delivering a modern trading experience directly in the browser.

---

## ✨ Key Features

- 🚀 **Real-time Market Data** – Integrated live feeds for accurate price tracking.
- 💼 **Portfolio Analytics** – Advanced visualization of holdings, total investment, and current value.
- 📊 **Interactive Dashboards** – High-performance charts powered by `Chart.js` for market trends.
- 📜 **Order Management** – Comprehensive history for pending, executed, and cancelled orders.
- 🔐 **Secure Authentication** – Robust user registration and login using JWT and encrypted passwords.
- 📱 **Responsive Design** – Fully optimized for desktop, tablet, and mobile screens.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Material UI (MUI), Chart.js, Bootstrap 5 |
| **Backend** | Node.js, Express.js (v5.0 preview) |
| **Database** | MongoDB Atlas with Mongoose ODM |
| **Auth** | JSON Web Tokens (JWT) & BcryptJS |
| **Styling** | Custom Vanilla CSS & MUI Emotion |

---

## 📂 Project Structure

```text
Zerodha/              # Root Directory
├── assets/           # Project assets & media
├── backend/          # Node.js + Express backend
│   ├── routes/       # API route definitions
│   ├── models/       # Mongoose schemas
│   ├── .env.example  # Template for local environment
│   └── server.js     # Entry point
├── frontend/         # React.js application
│   ├── public/       # Static files
│   └── src/          # React source code
│       ├── components/ # Reusable UI components
│       ├── landing_page/ # Marketing & Home sections
│       └── index.js  # Main mount point
└── render.yaml       # Deployment configuration for Render
```

---

## ⚙️ Quick Start

### 1. Prerequisite
- Node.js (v20+)
- MongoDB Atlas account (for production) or local MongoDB.

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file based on .env.example
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

To run the backend properly, create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

---

## 🖼️ Application Interface

<div align="center">
  <img src="assets/mockup.png" alt="Dashboard Mockup" width="80%">
  <p><i>Modern, interactive Trading Dashboard with live analytics.</i></p>
</div>

---

## 🤝 Contributing

We welcome contributions! Please feel free to fork the repository and submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Chiranjeeb Dash**
- 📧 [chiranjeeb.email@gmail.com](mailto:chiranjeeb.email@gmail.com)
- 🔗 [LinkedIn Profile](https://www.linkedin.com/in/chiranjeeb-dash-/)
- 📞 +91 7854943328

---

<p align="center">
  <b>If you liked this project, please give it a ⭐ on GitHub!</b>
</p>
