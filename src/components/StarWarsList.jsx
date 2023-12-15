import { useState, useEffect } from 'react';
import StarWarsModal from './StarWarsModal';
import api from '../services/api';

const StarWarsList = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await api.get('/films/');
        setFilms(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching films:', error);
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

   const orderedFilms = films.sort((a, b) => a.episode_id - b.episode_id);

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
  };

  const closeModal = () => {
    setSelectedFilm(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 bg-gray-900 p-8 rounded-md border border-yellow-500">
      {loading ? (
        <p className="text-gray-300">Carregando...</p>
      ) : (
        orderedFilms.map((film) => (
          <div
            key={film.episode_id}
            className="cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleFilmClick(film)}
          >
            <div className="bg-slate-800 p-4 rounded-md shadow-md hover:shadow-lg border border-yellow-500">
              <h3 className="text-xl font-semibold mb-2 text-yellow-500">
                {film.title}
              </h3>
              <p className="text-white">
                Episode: {film.episode_id} | Director: {film.director}
              </p>
            </div>
          </div>
        ))
      )}
      {selectedFilm && (
        <StarWarsModal film={selectedFilm} onClose={closeModal} />
      )}
    </div>
  );
};

export default StarWarsList;
