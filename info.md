# Skill Bridge Project Setup Guide

This guide will help you set up the Skill Bridge project on your local machine. The project consists of a Django backend and a React frontend.

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn
- Git

## Backend Setup (Django)

1. Clone the repository:
```bash
git clone <repository-url>
cd Skill-Bridge
```

2. Create and activate a virtual environment:
```bash
# On Windows
python -m venv venv
venv\Scripts\activate

# On macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Set up the database:
```bash
python manage.py makemigrations
python manage.py migrate
```

5. Create a superuser (admin):
```bash
python manage.py createsuperuser
```

6. Run the development server:
```bash
python manage.py runserver
```

The backend server will run at `http://127.0.0.1:8000`

## Frontend Setup (React)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The frontend will run at `http://localhost:3000`

## Project Structure

```
Skill-Bridge/
├── backend/                 # Django backend
│   ├── skill_bridge/       # Main Django app
│   ├── manage.py
│   └── requirements.txt
└── frontend/               # React frontend
    ├── public/
    ├── src/
    ├── package.json
    └── README.md
```

## API Endpoints

- Authentication:
  - POST `/api/auth/login/` - User login
  - POST `/api/auth/register/` - User registration
  - POST `/api/auth/logout/` - User logout

- Profile:
  - GET `/api/profile/` - Get user profile
  - PUT `/api/profile/` - Update user profile

## Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Frontend (.env)
```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

## Common Issues and Solutions

1. **Database Migration Errors**
   - Delete the `db.sqlite3` file
   - Run `python manage.py makemigrations` again
   - Run `python manage.py migrate`

2. **Node Modules Issues**
   - Delete the `node_modules` folder
   - Delete `package-lock.json` or `yarn.lock`
   - Run `npm install` or `yarn install` again

3. **CORS Issues**
   - Ensure the backend CORS settings include the frontend URL
   - Check that the frontend is making requests to the correct backend URL

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Your License Here] 