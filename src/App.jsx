import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/navigation'; // <-- (Capital 'N')
import BooksPage from './pages/BooksPage';
import BookDetailsPage from './pages/BookDetailsPage';
import QuotesPage from './pages/QuotesPage';
import './components/navigation.css'; // <-- M 'Navigation.css' (Capital 'N')
// import './App.css'; // 
function App() {
  return (
    <div className="App">
      <Navigation />

      <main>
        <h1>Seuss Treasury</h1>

        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/quotes" element={<QuotesPage />} />
          <Route path="*" element={<div><h2>Page Not Found</h2><p>Sorry, the page you were looking for does not exist.</p></div>} />
        </Routes>
      </main>

    </div>
  );
}

export default App;