# LocalLens 

## Project Title
**LocalLens: Location-Based Discovery and Sharing Platform**

---

## Project Description
LocalLens is a full-stack web application that enables users to discover, mark, and share hidden or interesting local places using an interactive map interface. Users can add new spots by selecting a location on the map, uploading images, and providing descriptions and categories. The application combines geospatial interaction with cloud-based image storage and a modern responsive UI.

---

## Objectives
- Build a full-stack web application using modern technologies
- Implement RESTful APIs for data management
- Integrate cloud services for image storage
- Provide an interactive map-based user experience
- Deploy the application to production environments

---

## Technology Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Leaflet (Map integration)
- Fetch API for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Multer for handling file uploads
- Cloudinary for image hosting

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## Project Structure

```
LocalLens/
├── backend/
│ ├── app.js
│ ├── routes/
│ ├── controllers/
│ ├── models/
│ ├── config/
│ └── utils/
└── myProject/
├── src/
│ ├── App.jsx
│ ├── components/
│ └── index.css
└── vite.config.js
```


---

## Core Features
- Interactive map for selecting and viewing locations
- Add new spots with images, descriptions, and categories
- Image upload and storage using Cloudinary
- Persistent storage using MongoDB
- Dynamic map marker highlighting from spot cards
- Category-based filtering and result limits
- Responsive and user-friendly interface

---

## Backend Design
- Express server with middleware for JSON, URL encoding, and CORS
- API routes mounted under `/api`
- MVC-style separation:
  - Routes handle endpoint definitions
  - Controllers manage business logic
  - Models define MongoDB schemas
- Multer handles multipart form data
- Temporary image files are cleaned after Cloudinary upload

---

## Frontend Design
- Centralized state management in `App.jsx`
- Form handling with `FormData`
- Map interaction using React Leaflet
- UI components for map, form, and cards
- Styled using Tailwind CSS for responsiveness

---

## API Endpoints
- `GET /api/spots` — Retrieve all spots (with filters)
- `POST /api/spots` — Create a new spot with images

---

## Environment & Security
- Sensitive credentials stored in environment variables
- `.env` file excluded using `.gitignore`
- CORS configured for allowed frontend origins
- No secret keys committed to the repository

---

## Testing & Validation
- API tested using browser, Postman, and curl
- Frontend API calls verified using browser DevTools
- Database entries validated through MongoDB Atlas
- Deployment tested in production environment

---

## Learning Outcomes
Through this project, the following skills were developed:
- Full-stack web development
- REST API design
- File upload handling
- Cloud service integration
- Frontend–backend communication
- Debugging and deployment workflows

---

## Project Status
- Backend successfully deployed and live
- Frontend successfully deployed and live
- Database connected and operational
- API endpoints functioning as expected

---

## Conclusion
LocalLens demonstrates a complete end-to-end full-stack application with real-world features such as map integration, cloud storage, and production deployment. The project effectively showcases practical knowledge of modern web development practices and is suitable for academic evaluation and portfolio presentation.


