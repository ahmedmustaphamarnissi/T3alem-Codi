# MeanProject - E-Learning Platform

An advanced Course Management and E-Learning platform built with **Angular 21** and **Server-Side Rendering (SSR)**. The application provides a comprehensive interface for both standard users (students) and administrators.

## 🚀 Features

The application is logically divided into two main areas: **User** and **Admin**.

### User Features
- **Authentication**: Secure Login and Registration.
- **Home & Dashboard**: Welcoming landing page and user dashboard.
- **Course Catalog**: Browse available courses with filtering and search capabilities.
- **Checkout**: Seamless checkout process for enrolling in courses.
- **Student Directory**: View other students in the platform.
- **Profile Management**: Edit user details and manage application settings (e.g., Dark Mode).

### Admin Features (Protected Routes)
- **Admin Authentication**: Dedicated secure login for administrators.
- **Dashboard**: High-level overview of platform metrics and charts (powered by Chart.js).
- **Course Management**: Complete CRUD operations for courses, including adding new courses and viewing course details.
- **User Management**: 
  - Manage Students (View all, Add new student).
  - Manage Instructors (View all, Add new instructor).
- **Messaging System**: Handle communications and support requests.
- **System Settings**: Application-wide configurations and admin profile settings.

## 🛠️ Technology Stack

- **Frontend Framework**: [Angular](https://angular.dev/) 21
- **Server-Side Rendering**: `@angular/ssr` & Express
- **Styling & UI**: [Bootstrap 5.3](https://getbootstrap.com/) & Custom CSS
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **Authentication**: JWT (`@auth0/angular-jwt`)
- **Testing**: [Vitest](https://vitest.dev/)

## 💻 Local Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

### Prerequisites
- Node.js (v20+ recommended)
- npm (v11+)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
To start a local development server, run:

```bash
npm run start
# or
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Server-Side Rendering (SSR)
To build and run the SSR server locally:

```bash
npm run build
npm run serve:ssr:meanProject
```

## 🏗️ Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

## 📦 Building

To build the project for production, run:

```bash
npm run build
# or
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

## 🧪 Testing

To execute unit tests with the Vitest test runner, use the following command:

```bash
npm run test
# or
ng test
```
