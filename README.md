# myIrancell User Panel Project

A beautiful user panel for Irancell SIM cards with features to view user information, active packages, purchase history, and recommended packages.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Authentication System](#authentication-system)
- [Frontend Structure](#frontend-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- Display user information (name, phone number, account balance)
- Show active SIM card packages
- Internet usage chart
- List of recommended packages
- Purchase history
- Beautiful responsive UI
- Secure token-based authentication system
- User login and registration
- Password hashing for security

## Technologies Used

### Frontend
- HTML5
- CSS3 (Flexbox, Custom Properties)
- JavaScript (ES6+)
- Chart.js for data visualization
- Font Awesome for icons
- Fetch API for backend communication
- LocalStorage for token management

### Backend
- Node.js
- Express.js
- MySQL
- CORS middleware
- jsonwebtoken for authentication
- body-parser for request handling
- bcrypt for password hashing
- JWT for secure authentication

## Installation

1. First clone the repository:
```bash
git clone https://github.com/BlackEagle256/myIrancell.git
cd myIrancell
```

2. Install required packages:
```bash
cd backend
npm install
```

## Database Setup

### Automatic Setup (Recommended)
1. Configure your MySQL credentials in `backend/db/myIrancellDB.js`
2. Run the setup script:
```bash
node db/setup.js
```

This will automatically:
- Create the `myirancell` database
- Create all required tables
- Insert sample data
- Set up foreign key relationships

### Manual Setup
1. Create database manually:
```sql
CREATE DATABASE myirancell CHARACTER SET utf8 COLLATE utf8_persian_ci;
```

2. Import the SQL file through phpMyAdmin or MySQL Workbench

## Running the Server

To start the development server, navigate to the backend directory and run:

```bash
cd backend
npx nodemon server.js
```

The server will run on port 3000. You can test the API at:

```
http://localhost:3000/api/users
```

## Project Structure

```
myIrancell/
├── frontend/               # Frontend files
│   ├── content/            # Static resources
│   │   ├── css/            # Styles
│   │   ├── fonts/          # Custom fonts
│   │   ├── img/            # Images
│   │   └── js/             # JavaScript files
│   ├── index.html          # Main page
│   ├── packets.html        # My Purchases page
│   ├── login.html          # Login/Signup page
├── backend/                # Backend files
│   ├── db/                 # Database config
│   │   ├── database.sql    # Database schema and data
│   │   ├── myIrancellDB.js # DB connection config
│   │   └── setup.js        # DB setup script
│   ├── utils/              # Helper functions
│   ├── server.js           # Main server file
│   └── package.json        # Backend packages
├── api_docs.txt            # API documentation
└── README.md               # This file
```

## API Endpoints

| Endpoint | Method | Description | Authentication |
|----------|--------|-------------|----------------|
| `/api/signup` | POST | Register new user | No |
| `/api/login` | POST | User login | No |
| `/api/users` | GET | Get user information | Yes |
| `/api/services/:isActive` | GET | Get active/inactive services | No |
| `/api/recommend-packs` | GET | Get recommended packages | Yes |
| `/api/userBuy` | GET | Get user purchase history | Yes |

## Authentication System

The project uses JWT (JSON Web Tokens) for secure authentication:

1. **Registration**:
   - Passwords are securely hashed using bcrypt before storage
   - Users provide email, password, and personal details

2. **Login**:
   - Email/password authentication
   - Returns JWT token for subsequent authenticated requests
   - Tokens expire after 1 hour

3. **Protected Routes**:
   - Require valid JWT in Authorization header
   - Token format: `Bearer <token>`

## Frontend Structure

### Login/Signup Page (`login.html`)
- Responsive design with gradient overlay
- Tab system for login/signup forms
- Form validation
- Secure password handling
- Token storage in localStorage

### Main Features:
- Toggle between login and signup forms
- Error handling for failed authentication
- Redirect to main page on successful login
- LocalStorage management for user session

## Contributing

Contributions, bug reports, and feature requests are always welcome! Please create an Issue before submitting a PR.

When contributing:
- Follow existing code style
- Include tests for new features
- Update documentation accordingly
- Ensure backward compatibility

## License

This project is licensed under the [MIT License](LICENSE).
