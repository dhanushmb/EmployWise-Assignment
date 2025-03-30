# Reqres User Management

This project is a user management application built with React, utilizing the Reqres API for user data. The application allows users to log in, view a list of users, edit user details, and delete users.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm should be installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd assignment
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the Project

1. **Start the development server**:
   ```bash
   npm start
   ```
   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

2. **Build the project for production**:
   ```bash
   npm run build
   ```
   This will create an optimized production build in the `build` folder.

### Deployment

- The application can be deployed on platforms like Netlify or Vercel. Ensure that you build the project before deploying.

### Assumptions and Considerations

- The application starts at the login page if no token is found in the local storage.
- Only specific credentials (`Email: eve.holt@reqres.in`, `Password: cityslicka`) are accepted for login.
- The project uses the Reqres API for managing user data.
- Ensure that the API endpoints are accessible and the network connection is stable.

### Additional Notes

- The project uses React Router for navigation and Axios for HTTP requests.
- Font Awesome is used for icons in the UI.

Feel free to contribute to the project by submitting issues or pull requests.
