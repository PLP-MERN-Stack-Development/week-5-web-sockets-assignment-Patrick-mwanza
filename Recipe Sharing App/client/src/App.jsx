import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';   // ✅ Correct import for Recipes List Page
import RecipeDetail from './pages/RecipeDetail'; // ✅ Import for Recipe Detail Page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes" element={<RecipesPage />} /> {/* ✅ Recipes List */}
        <Route path="/recipes/:id" element={<RecipeDetail />} /> {/* ✅ Recipe Details */}
      </Routes>
    </Router>
  );
}

export default App;
