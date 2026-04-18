🚲 Bike Rental Management System

A full-stack web application for managing bike rentals, built using Angular (Frontend) and ASP.NET Core Web API (Backend) with SQL Server as the database.


---

📌 Project Overview

This project allows users to:

View available bikes

Check bike details (price, availability, etc.)

Manage bike rental data via API

Perform CRUD operations through backend services


It follows a 3-tier architecture:

Angular UI → ASP.NET Core API → SQL Server Database


---

🏗️ Tech Stack

Frontend

Angular

TypeScript

HTML/CSS


Backend

ASP.NET Core Web API

C#


Database

Microsoft SQL Server



---

📁 Project Structure

BikeRentalProject/
│
├── BikeRentalUI/        # Angular Frontend
│   ├── src/
│   ├── angular.json
│   └── package.json
│
├── BikeRentalAPI/       # ASP.NET Core Backend
│   ├── Controllers/
│   ├── Models/
│   ├── Program.cs
│   └── appsettings.json
│
└── README.md


---

⚙️ Prerequisites

Make sure you have installed:

Node.js (for Angular)

Angular CLI

.NET SDK

SQL Server

SQL Server Management Studio (SSMS)



---

🚀 How to Run the Project

1️⃣ Clone the Repository

git clone https://github.com/your-username/BikeRentalProject.git
cd BikeRentalProject


---

2️⃣ Setup Database

Open SQL Server Management Studio

Create database:


BikeRental

Restore database using .bak file OR run SQL scripts (if provided)



---

3️⃣ Run Backend (API)

cd BikeRentalAPI
dotnet restore
dotnet run

API will run on:

https://localhost:5001


---

4️⃣ Run Frontend (Angular)

cd BikeRentalUI
npm install
ng serve

Frontend will run on:

http://localhost:4200


---

🔗 API Integration

The Angular app communicates with the backend via REST APIs:

Method	Endpoint	Description

GET	/api/bikes	Get all bikes
GET	/api/bikes/{id}	Get bike by ID
POST	/api/bikes	Add new bike
PUT	/api/bikes/{id}	Update bike
DELETE	/api/bikes/{id}	Delete bike



---

🛠️ Configuration

Update database connection in:

BikeRentalAPI/appsettings.json

"ConnectionStrings": {
  "BikeRentDb": "Server=localhost;Database=BikeRental;Trusted_Connection=True;"
}


---

⚠️ Important Notes

Make sure SQL Server is running before starting the API

API must be running before starting Angular frontend

CORS is enabled in backend for frontend communication



---

📸 Features

Bike listing page

REST API integration

Clean modular architecture

Scalable backend design

Separation of frontend and backend



---

🔮 Future Improvements

User authentication (login/register)

Booking system

Payment integration

Admin dashboard

Deployment to cloud (Azure / AWS)



---

👨‍💻 Author

Developed by: Chiranjivi Raj

Project: Bike Rental Management System

Purpose: Learning full-stack development (Angular + ASP.NET Core)


This project is for educational/demo purposes.
