# myIrancell User Panel Project

A beautiful user panel for Irancell SIM cards with features to view user information, active packages, purchase history, and recommended packages.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- Display user information (name, phone number, account balance)
- Show active SIM card packages
- Internet usage chart
- List of recommended packages
- Purchase history
- Beautiful responsive UI
- Token-based authentication system

## Technologies Used

### Frontend
- HTML5
- CSS3 (Flexbox, Custom Properties)
- JavaScript (ES6+)
- Chart.js for data visualization
- Font Awesome for icons

### Backend
- Node.js
- Express.js
- MySQL
- CORS
- jsonwebtoken
- body-parser

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

3. Set up MySQL database:
- Configure `myIrancellDB.js` in `backend/db/` with your database credentials
- Create a database named `myIrancell`
- Execute the required tables from `backend/db/schema.sql`

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
├── backend/                # Backend files
│   ├── db/                 # Database config
│   ├── utils/              # Helper functions
│   ├── server.js           # Main server file
│   └── package.json        # Backend packages
├── api_docs.txt            # API documentation
└── README.md               # This file
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | Get user information |
| `/api/services/:isActive` | GET | Get active/inactive services |
| `/api/recommend-packs` | GET | Get recommended packages |
| `/api/userBuy` | GET | Get user purchase history |


## Contributing

Contributions, bug reports, and feature requests are always welcome! Please create an Issue before submitting a PR.

## License

This project is licensed under the [MIT License](LICENSE).
