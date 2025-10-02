**Notely – Notes App**
_Project Overview_

Notely is a modern, user-friendly note-taking web application designed to help users organize, store, and search their notes efficiently. The app features Google authentication for secure login, a dashboard to view and manage saved notes, and a responsive interface that works seamlessly on desktop and mobile devices.

The app also includes a dark mode toggle, allowing users to switch between light and dark themes for optimal readability.

_Features_

User Authentication: Secure Google OAuth login and signup.

Note Management: Create, read, update, and delete notes.

Search Functionality: Quickly find notes using a built-in search feature.

Dashboard: View all saved notes in a clean, organized layout.

Dark Mode: Toggle between light and dark themes with persistence across sessions.

Responsive Design: Fully responsive layout for desktop, tablet, and mobile screens.

_Tech Stack_

Frontend: HTML, CSS (with CSS variables for theming), Bootstrap 5, EJS templating

Backend: Node.js, Express.js

Database: MongoDB (via Mongoose)

Authentication: Google OAuth 2.0

Version Control: Git

_Installation & Setup_

Clone the repository:

git clone https://github.com/MeganH108/notely.git
cd notely


Install dependencies:

npm install connect-mongo dotenv ejs express express-ejs-layouts express-session method override mongoose passport passport-google-oauth20


Set up environment variables:
Create a .env file in the root directory and add:

PORT=3000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
SESSION_SECRET=your_secret_key


Run the app locally:

npm start


Open your browser and navigate to http://localhost:3000.

Usage

Sign in with your Google account.

Use the Dashboard to create, edit, or delete notes.

Search for notes using the search bar.

Toggle dark mode using the button in the header or footer for a personalized theme.

Log out when finished.

**Possible Future Enhancements**

-Add note categories or tags.

-Enable note sharing between users.

-Implement rich text editing with formatting options.

-Add mobile app support with React Native or similar.

-allow import/export to google docs.
