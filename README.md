# Skill Bridge

Skill Bridge is a modern web application designed to connect skilled professionals with opportunities. It serves as a platform where users can showcase their skills, manage their professional profiles, and connect with potential employers or clients.

## 🌟 Features

- **User Authentication**
  - Secure login and registration system
  - Role-based access (Job Seekers and Employers)
  - Token-based authentication

- **Profile Management**
  - Professional profile creation and editing
  - Skills showcase
  - CV/Resume upload
  - Bio and personal information management

- **Modern UI/UX**
  - Responsive design
  - Dark theme with neon accents
  - Intuitive navigation
  - Real-time form validation

## 🛠️ Tech Stack

### Backend
- Django
- Django REST Framework
- SQLite (Development)
- Token Authentication
- CORS Support

### Frontend
- React
- React Router
- Axios
- CSS3 with modern features
- Responsive Design

## 🚀 Getting Started

For detailed setup instructions, please refer to our [Setup Guide](info.md).

### Quick Start

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. Set up the frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration
- `POST /api/auth/logout/` - User logout

### Profile Endpoints
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/` - Update user profile

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Inspired by the need for better professional networking platforms

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the [Common Issues](info.md#common-issues-and-solutions) section
2. Open an issue in the GitHub repository
3. Contact the maintainers

---

Made with ❤️ for the developer community 