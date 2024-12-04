import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';

function ApplicationView({role}) {
  const location = useLocation();
  const data = JSON.parse(new URLSearchParams(location.search).get('data'));

  console.log(role, data); 

  switch (role) {
    case "user":
        return <div>{JSON.stringify(data)}</div>
    case "admin":
        return (
            <>
            <div>{JSON.stringify(data)}</div>
            <Button variant="contained" href="#contained-buttons">
            Approve
            </Button>
            <Button variant="contained" href="#contained-buttons">
            Reject
            </Button>
            </>
        );
    default:
        return null;
  }
}

export default ApplicationView;
