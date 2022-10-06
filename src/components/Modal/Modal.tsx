import './style.css';

// This modal covers the entire screen while waiting for a response from the API
// It prevents the user from taking actions while waiting for a response

export function Modal() {
  return (
    <div className="loading-background">
      <h2>Loading...</h2>
    </div>
  );
}
