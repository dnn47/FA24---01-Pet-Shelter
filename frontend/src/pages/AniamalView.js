import { useLocation } from 'react-router-dom';

function AnimalView() {
  const location = useLocation();
  const data = JSON.parse(new URLSearchParams(location.search).get('data'));

  console.log(data); 

  return <div>{JSON.stringify(data)}</div>;
}

export default AnimalView;
