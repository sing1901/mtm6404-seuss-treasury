import React, { useState, useEffect, useCallback } from 'react';
import './QuotesPage.css'; // Import styling

function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback ensures fetchQuotes function identity is stable across renders
  // unless its dependencies change (none in this case). Useful if passed down as prop.
  const fetchQuotes = useCallback(() => {
    setIsLoading(true);
    setError(null); // Clear previous errors before fetching
    setQuotes([]); // Clear previous quotes before fetching

    fetch('https://seussology.info/api/quotes/random/10')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Check if data is an array, sometimes APIs might return unexpected formats
        if (Array.isArray(data)) {
            setQuotes(data);
        } else {
            console.error("Received non-array data:", data);
            throw new Error("Unexpected data format received from API.");
        }
      })
      .catch(error => {
        console.error("Error fetching quotes:", error);
        setError(`Failed to load quotes. ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Empty dependency array for useCallback means the function is created once

  // useEffect to call fetchQuotes when the component mounts
  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]); // Include fetchQuotes in dependency array (due to useCallback)

  // --- Render Logic ---
  if (isLoading && quotes.length === 0) { // Only show initial loading message
    return <div className="status-message">Loading quotes...</div>;
  }

  if (error) {
    return (
        <div className="status-message error-message">
            Error: {error}
            <br/>
            <button onClick={fetchQuotes} className="refresh-button">Try Again</button>
        </div>
    );
  }

  return (
    <div className="quotes-page-container">
      <h2>Random Seuss Quotes</h2>
      {/* Button to fetch a new set of quotes */}
      <button onClick={fetchQuotes} disabled={isLoading} className="refresh-button">
        {isLoading ? 'Loading...' : 'Get New Quotes'}
      </button>

      {/* Display the list of quotes */}
      {quotes.length > 0 ? (
        <ul className="quotes-list">
          {quotes.map((quote, index) => (
            // Using index as key is generally okay for static or random lists
            // If quotes had IDs, using quote.id would be better.
            <li key={index} className="quote-item">
              <p className="quote-text">"{quote.text}"</p>
              {/* Conditionally display the book title if it exists */}
              {quote.book && quote.book.title && (
                <p className="quote-source">- {quote.book.title}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
         // Message if loading finished but no quotes were found
         !isLoading && <div className="status-message">No quotes available at the moment.</div>
      )}
    </div>
  );
}

export default QuotesPage;