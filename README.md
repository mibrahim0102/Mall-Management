# Mall Management System

This project is a simple mall management dashboard built with React and Vite. It helps manage basic mall operations such as brands, outlets, employees, attendance, tasks, and reports from one place.

The app is designed to look like a modern admin panel and includes login, registration, dashboard views, and different management pages.

## What this project does

This system gives a mall admin or staff member a central place to:

- View the dashboard overview
- Manage brands
- Manage outlets
- Manage employees
- Track attendance
- Assign and track tasks
- View reports
- Log in or register to the system

## Main features

- Clean dashboard layout
- Sidebar navigation
- Top navbar for quick actions
- Role-based auth flow with login and register pages
- Management pages for all key mall areas
- Redux-based state management
- React Router for page navigation
- Charts and summary cards for reports and analytics

## Tech stack

- React
- Vite
- React Router
- Redux Toolkit
- Bootstrap
- Recharts

## Project structure

- src/pages - all app pages
- src/components - reusable UI components like layout and cards
- src/routes - route setup
- src/redux - Redux store and slices
- src/services - API/auth service layer
- src/assets - styles and static resources

## How to run the project

1. Open the project folder
2. Install dependencies:

   npm install

3. Start the development server:

   npm run dev

4. Open the local URL shown in the terminal in your browser.

## Production build

To create a production build:

npm run build

Then you can preview it with:

npm run preview

## Default app flow

The app includes these main routes:

- / - home page
- /login - login screen
- /register - registration screen
- /dashboard - admin dashboard
- /brands - brand management
- /outlets - outlet management
- /employees - employee management
- /attendance - attendance tracking
- /tasks - task management
- /reports - reports and analytics

## Notes

This is a frontend project focused on UI and app flow. It is a good starting point for a mall management system and can be expanded with real backend APIs, database integration, and authentication logic.

## License

This project is for educational/demo use.
