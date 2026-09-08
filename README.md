<div align="center">

# 🗳️ BoothFlow

**A highly-scalable, full-stack Election Management System.**

[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[Live Frontend (Vercel)](https://booth-flow.vercel.app) • [Live API (Render)](https://boothflow-1.onrender.com/api/dashboard)

</div>

---

## 📖 Overview

BoothFlow is a comprehensive Election Management System (EMS) designed to handle the complexities of modern voting architectures. It provides a secure, intuitive platform for managing constituencies, voters, candidates, parties, and polling stations, culminating in real-time vote counting and analytics.

## ✨ Key Features

- **📊 Real-time Dashboard** — Live vote tallying with percentage breakdown per candidate.
- **👥 Voter Management** — Secure voter registration with strict constituency enforcement.
- **🗳️ Secure Vote Casting** — One-vote-per-election enforcement logic.
- **🏛️ Election Configuration** — Granular control over multiple elections across different states.
- **🛡️ Admin Panel** — Role-based access for administrative controls.

## 🛠️ Tech Stack

### Backend
- **Java 17** & **Spring Boot 3**
- **Spring Data MongoDB** for high-performance NoSQL data persistence.
- **RESTful API Architecture**

### Frontend
- **React 18** with **TypeScript**
- **Vite 5** for blazing fast HMR and optimized builds.
- **Tailwind CSS** (if applicable) & **Lucide React** for premium iconography.

### Deployment
- **Backend:** Dockerized and deployed on Render.
- **Frontend:** Statically exported and deployed on Vercel.

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+

### Backend Setup
```bash
cd backend
mvn spring-boot:run
```
*The API runs at `http://localhost:8081`.*

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*The dev server runs at `http://localhost:5173`.*

## 📈 Database Seeding
The application features a robust seeder (`/api/seed`) to instantly populate the database with realistic data (e.g., states, constituencies, dummy voters, and sample votes) for immediate testing and demonstration.

---
<div align="center">
  <i>Built with ❤️ by <a href="https://github.com/Rishi006knight">Rishi</a></i>
</div>