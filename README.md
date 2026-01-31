# 🌍 Social Media Platform - RESTful API

[![Repo](https://img.shields.io/badge/GitHub-Repository-black?logo=github)](https://github.com/Sayed-Herzallah/Social-Media-Back-end)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green) ![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green) ![License](https://img.shields.io/badge/License-MIT-blue)

A high-performance, production-ready **Backend RESTful API** for a social networking platform. This project mimics real-world scenarios, focusing on **Complex Data Relationships**, **Database Optimization**, and scalable **Modular Architecture**.

## 🚀 Key Features

* **🔐 Advanced Authentication:**
    * Secure User Registration & Login.
    * **JWT** (Access & Refresh Tokens) for secure session management.
    * Password Security using **Bcrypt**.
* **👥 User Connections & Profile:**
    * Follow / Unfollow system with optimized database logic.
    * Profile management (Avatar, Bio, Cover Photo).
    * Retrieve Followers and Following lists efficiently.
* **📰 Posts & News Feed:**
    * **CRUD Operations** for Posts (Create, Read, Update, Delete).
    * **Image Uploads** integrated with **Cloudinary**.
    * **Pagination** support for fetching posts (Infinite Scroll ready).
* **❤️ Interactions & Engagement:**
    * Like / Unlike posts real-time logic.
    * Commenting system on posts.
    * Deep population of user details within interactions.
* **🛡️ Security & Validation:**
    * **Joi** Validation for strict data integrity.
    * Protection against NoSQL Injection.
    * Global Error Handling for consistent API responses.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Mongoose ODM) - *Complex Schema Design*
* **Validation:** Joi
* **Media Management:** Multer & Cloudinary
* **Tools:** Postman, Git, VS Code

## 📂 Project Structure

The project follows a **Module-Based Architecture**, ensuring Separation of Concerns (SoC) for maintainability.

```text
src
├── DataBase
│   ├── Models          # Mongoose Schemas (User, Post, Comment)
│   └── connection.js   # Database Connection
├── middleware          # Global Middlewares (Auth, Validation, Upload)
├── Modules             # Business Logic Modules
│   ├── Auth            # Signup, Login, Confirmation
│   ├── User            # Profile, Follow/Unfollow Logic
│   ├── Post            # Post CRUD, Likes, Timeline
│   └── Comment         # Commenting Logic
├── utils               # Helpers (Cloudinary, ErrorClass, Pagination)
├── index.js            # Entry Point
└── app.controller.js   # App Bootstrapping & Routing
