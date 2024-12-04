import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ReviewApplication() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = JSON.parse(new URLSearchParams(location.search).get('data'));

  const handleApprove = () => {
    console.log(`Approved Application: ${data.application_id}`);
    // API call to approve the application
    navigate('/applications'); // Redirect to applications after action
  };

  const handleDeny = () => {
    console.log(`Denied Application: ${data.application_id}`);
    // API call to deny the application
    navigate('/applications'); // Redirect to applications after action
  };

  return (
    <div style={styles.container}>
      <h1>Application Review</h1>
      <pre style={styles.details}>{JSON.stringify(data, null, 2)}</pre>
      <div style={styles.actions}>
        <button style={styles.approveButton} onClick={handleApprove}>
          Approve :)
        </button>
        <button style={styles.denyButton} onClick={handleDeny}>
          DENY!
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '1rem',
    textAlign: 'center',
  },
  details: {
    textAlign: 'left',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  actions: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-around',
  },
  approveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  denyButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ReviewApplication;
