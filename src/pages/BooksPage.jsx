import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './BooksPage.css'; // Import styling for this page

function BooksPage() {
  // State variables
  const [books, setBooks] = useState([]); // To store the array of books
  const [isLoading, setIsLoading] = useState(true); // To show a loading message
  const [error, setError] = useState(null); // To show an error message

  // useEffect hook to fetch data when the component loads
  useEffect(() => {
    setIsLoading(true); // Start loading
    fetch('https://seussology.info/api/books')
      .then(response => {
        // Check if the response was successful
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the JSON data
      })
      .then(data => {
        setBooks(data); // Store the fetched books in state
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        console.error("Error fetching books:", error);
        setError(`Failed to load books. ${error.message}`); // Store the error message
        setBooks([]); // Clear books on error
      })
      .finally(() => {
        setIsLoading(false); // Stop loading, whether success or error
      });
  }, []); // The empty array [] means this effect runs only once after the first render

  // Conditional rendering based on state
  if (isLoading) {
    return <div className="status-message">Loading books...</div>;
  }

  if (error) {
    return <div className="status-message error-message">Error: {error}</div>;
  }

  // Render the list of books
  return (
    <div className="books-page-container">
      <h2>Explore the Books</h2>
      <div className="books-grid">
        {/* Map over the books array to display each book */}
        {books.length > 0 ? (
          books.map(book => (
            // Each book is a Link component wrapping the image and title
            <Link key={book.id} to={`/books/${book.id}`} className="book-link">
              <img
                src={book.cover}
                alt={`Cover of ${book.title}`}
                className="book-cover"
                // Basic error handling for images that fail to load
                onError={(e) => { e.target.onerror = null; e.target.src="placeholder-image.png"; e.target.alt="Image not available" }}
              />
              <p className="book-title">{book.title}</p>
            </Link>
          ))
        ) : (
          // Show message if no books are loaded (e.g., API empty or filtered)
           !isLoading && <div>No books found.</div>
        )}
      </div>
    </div>
  );
}

export default BooksPage;