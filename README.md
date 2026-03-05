# HRMS Frontend

A simple Human Resource Management System (HRMS) frontend built with React and Vite. Provides employee and attendance management with basic UI.

## 🛠 Project Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/prachikush16/hrms-frontend.git
   cd hrms-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root with the following variable:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```
   Adjust the URL to point at your backend API.

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚀 Features

- **Dashboard landing page** with navigation cards
- **Employee search** and management
- **Attendance tracking** by employee
- **Axios** for API communication

## 🔗 Remote Repository

This project is linked to the following Git remote:
```
git remote add origin https://github.com/prachikush16/hrms-frontend.git
```

## 📝 Notes

- Backend API endpoints are expected at the base URL defined in `.env`.
- Bootstrap is included for quick form/table styling.

---

## Author

**Prachi Kushwah**  
GitHub: https://github.com/prachikush16