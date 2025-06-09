Nelpinterest
Nelpinterest is a Pinterest-inspired web application that allows users to explore, like, save, and comment on pins. The app features secure authentication and authorization using HttpOnly cookies to protect user sessions.
Features
- User Authentication & Authorization
- Secure login and registration using HttpOnly cookies
- Protected routes for authenticated users
- Role-based access control
- Pin Interactions
- Like and unlike pins
- Save pins to personal collections
- Comment on pins
- User Profiles
- View and edit user profiles
- Manage saved pins
Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (stored in HttpOnly cookies)
- Storage: Cloudinary (for image uploads)
Security
- HttpOnly Cookies: Used for authentication to prevent XSS attacks
- JWT Tokens: Stored securely in cookies for session management
- Rate Limiting: Prevents abuse of API endpoints
- 
Installation
Prerequisites
Ensure you have the following installed:
- Node.js
-  - Clone the repository:
git clone https://github.com/Tech041/nelpinterest.git
npm install
- Set up environment variables:
Create a .env file in the root directory and add
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
- Start the server:
npm run server
