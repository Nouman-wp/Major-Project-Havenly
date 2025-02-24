# Havenly - Airbnb Clone 🏡

### Demo here - https://havenly-hx10.onrender.com/

Havenly is a full-stack web application inspired by Airbnb, allowing users to explore, list, and book places for rent. It provides an intuitive interface, user authentication, reviews, and seamless navigation.

## 🌟 Features
- 🏠 **Explore Listings**: Browse various listings with images, descriptions, and pricing.
- 🔍 **Search & Filters**: Search for places and filter by location, price, and amenities.
- 📝 **User Authentication**: Secure sign-up and login using Passport.js.
- 📌 **Add & Manage Listings**: Users can create, edit, and delete their own listings.
- 💬 **Reviews & Ratings**: Leave reviews and ratings for properties.
- 📍 **Interactive Map**: View locations on an interactive map using Mapbox.
- 📷 **Image Upload**: Upload listing images with Cloudinary.
- 🛠️ **Responsive Design**: Works smoothly on mobile and desktop devices.

---

## 🚀 Tech Stack
- **Frontend**: HTML, CSS, Bootstrap, EJS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: Passport.js
- **File Storage**: Multer & Cloudinary
- **Mapping Service**: Mapbox API

---

## 🔧 Project Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Nouman-wp/havenly.git
cd havenly
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=3000
DATABASE_URL=<your_mongodb_uri>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
MAPBOX_TOKEN=<your_mapbox_token>
SESSION_SECRET=<your_secret_key>
```

### 4️⃣ Start the Development Server
```sh
npm start
```

The app will run on `http://localhost:3000`

---

## 🛠️ How to Use
1. **Sign up or log in** to your account.
2. **Browse listings** from the homepage.
3. **Search and filter** listings based on price, location, and amenities.
4. **Click on a listing** to view details, owner info, and reviews.
5. **Create a new listing** (if logged in) by clicking "Add Listing."
6. **Leave a review** and rate a property.

---

## 🛡️ License
This project is licensed under the **MIT License**.

---

## 📬 Contact
For any questions or issues, feel free to reach out:
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/your-profile)

