import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import hooks
import './BookDetailsPage.css'; // Import styling

function BookDetailsPage() {
  // useParams gets URL parameters, e.g., the 'id' from '/books/:id'
  const { id } = useParams();
  // useNavigate allows programmatic navigation (e.g., back button)
  const navigate = useNavigate();

  // State variables
  const [book, setBook] = useState(null); // To store the single book object
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect to fetch data for the specific book ID
  useEffect(() => {
    // Reset state when the ID changes (important for navigation between details pages)
    setIsLoading(true);
    setError(null);
    setBook(null);

    fetch(`https://seussology.info/api/books/${id}`)
      .then(response => {
        if (!response.ok) {
          // Specific handling for 404 Not Found
          if (response.status === 404) {
            throw new Error(`Book with ID ${id} not found.`);
          }
          // General network error
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setBook(data); // Store the fetched book data
      })
      .catch(error => {
        console.error(`Error fetching book details for ID ${id}:`, error);
        setError(error.message); // Store error message
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  }, [id]); // Dependency array includes 'id' - effect re-runs if 'id' changes

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page in history
    // Or use navigate('/') to always go back to the main books page
  };

  // --- Render Logic ---
  if (isLoading) {
    return <div className="status-message">Loading book details...</div>;
  }

  if (error) {
    return (
      <div className="status-message error-message">
        Error: {error}
        <br />
        {/* Provide a link back to the main page */}
        <Link to="/" className="back-link-error">Go to Books Page</Link>
      </div>
    );
  }

  // If loading is finished, no error, but book is still null (shouldn't happen often)
  if (!book) {
     return <div className="status-message">Book details could not be loaded.</div>;
  }

  // Render the book details
  return (
    <div className="book-details-container">
      <button onClick={handleBackClick} className="back-button">
        ← Back
      </button>
      <div className="book-details-content">
          <img
            src={book.cover}
            alt={`Cover of ${book.title}`}
            className="book-details-cover"
            onError={(e) => { e.target.onerror = null; e.target.src="placeholder-image.png"; e.target.alt="Image not available" }}
          />
          <div className="book-info">
            <h2>{book.title}</h2>
            <p className="book-description">{book.description || "No description available."}</p>
          </div>
      </div>
    </div>
  );
}

export default BookDetailsPage;