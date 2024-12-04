import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ApplicationView() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = JSON.parse(new URLSearchParams(location.search).get('data'));

  return (
    <div style={styles.container}>
      <h1>Application Details</h1>
      <pre style={styles.details}>{JSON.stringify(data, null, 2)}</pre>
      <button style={styles.button} onClick={() => navigate('/applications')}>
        Back
      </button>
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
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default ApplicationView;
