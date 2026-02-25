# VEDA - One Platform All Knowledge

A modern, premium SaaS platform for accessing comprehensive resources across Research, Career Development, Cultural Archives, and Legal Standards.

## 🚀 Features

- **Cinematic Landing Page**: Stunning 3D animations with floating documents and mobile phone entrance
- **Authentication**: Secure login and signup with email/password
- **Multiple Resource Categories**:
  - 🔬 Research
  - 💼 Career Development
  - 🎭 Cultural Archives
  - ⚖️ Legal & Standards
- **Search & Filter**: Advanced search and category filtering
- **Responsive Design**: Works seamlessly on all devices
- **Smooth Animations**: Framer Motion animations throughout
- **User Profile**: Save and manage resources
- **Modern UI**: Glassmorphism design with Tailwind CSS

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn or pnpm

## 🛠️ Installation

1. **Extract the project**
   ```bash
   unzip VEDA.zip
   cd VEDA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   Or with pnpm:
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Or with pnpm:
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, navigate to that URL manually

## 🏗️ Project Structure

```
VEDA/
├── src/
│   ├── pages/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── ResearchCategoryPage.jsx
│   │   ├── CareerDevelopmentPage.jsx
│   │   ├── CulturalArchivesPage.jsx
│   │   ├── LegalAndArchivesPage.jsx
│   │   ├── ExplorePage.jsx
│   │   ├── ResourcesPage.jsx
│   │   └── ProfilePage.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CategoryTabs.jsx
│   │   ├── ResourceCard.jsx
│   │   └── BackHeader.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🎨 Design System

- **Primary Color**: Emerald Green (#10b981)
- **Secondary Color**: Dark Slate (#0f172a, #1e293b)
- **Typography**: System fonts for optimal performance
- **Animations**: Framer Motion for smooth transitions

## 🔐 Authentication

- Users can signup with email and password
- Login persists user data in localStorage
- Profile page shows saved resources
- Logout functionality available

## 📦 Built With

- **React 18** - UI Library
- **Vite** - Build Tool
- **React Router DOM** - Routing
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🎯 Pages Overview

### Landing Page
- Cinematic animations with floating documents
- 3D phone entrance with VEDA logo
- Auto-redirects to login after animation

### Login & Signup
- Clean glassmorphism design
- Email/Password authentication
- Social login buttons
- Form validation

### Home Page
- Hero section with search
- Category cards with hover effects
- Quick navigation to all resources

### Category Pages
- Search and filter functionality
- Tab-based categorization
- Resource cards with preview/download
- Different color themes for each category

### Explore Page
- All resources in one place
- Cross-category filtering
- Large grid layout

### Resources Page
- List view of saved resources
- Download functionality
- File size and date information

### Profile Page
- User information display
- Saved resources list
- Edit and logout options

## 🚀 Deployment

The project is ready for deployment to Vercel:

```bash
npm run build
npm run preview
```

## 📝 Notes

- All navigation works smoothly with React Router
- Responsive design adapts to all screen sizes
- No external API calls needed (demo data included)
- LocalStorage used for user session management

## 🐛 Troubleshooting

**Port 3000 already in use?**
- The app will automatically try the next available port
- Check `vite.config.js` to modify the default port

**Dependencies not installing?**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

**Animations not working?**
- Ensure Framer Motion is installed: `npm install framer-motion`
- Check browser console for any errors

## 📄 License

This project is open source and available under the MIT License.

## ✨ Made with Premium Quality

VEDA is designed and built with attention to detail, modern best practices, and a focus on user experience. Ready for production deployment!
