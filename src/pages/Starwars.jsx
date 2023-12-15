// src/pages/StarWars.js
import { Link } from 'react-router-dom';
import StarWarsList from '../components/StarWarsList';

const StarWars = () => {
  return (
    <div className=" p-12 mx-auto  h-screen">
      <div className='flex items-center justify-between mb-6'>
      <h1 className="text-2xl font-bold mb-4 text-yellow-500">STAR WARS MOVIES</h1>
      <Link to="/login" className="text-yellow-500 bg-gray-600 border border-gray-700 p-2 rounded-md ml-8">
        SAIR
      </Link>


      </div>
      <StarWarsList />
    </div>
  );
};

export default StarWars;
