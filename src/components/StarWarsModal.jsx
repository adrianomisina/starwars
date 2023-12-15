/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../services/api';

Modal.setAppElement('#root');

const StarWarsModal = ({ film, onClose, modalWidth = '50%', modalHeight = '50%' }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersData = await Promise.all(
          film.characters.map(async (characterURI) => {
            const response = await api.get(characterURI);
            return response.data.name;
          })
        );

        setCharacters(charactersData);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching characters:', error);
        setLoading(false); 
      }
    };

    fetchCharacters();
  }, [film.characters]);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(51, 51, 51, 0.8)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 9999,
    },
    content: {
      width: modalWidth,
      height: modalHeight,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1f2937',
      border: 'none',
      borderRadius: '8px',
      padding: '20px',
      color: '#f3f4f6',
    },
  };

  return (
    <Modal isOpen={true} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">{film.title}</h2>
      <p>
        <span className="font-bold text-yellow-500">Episode:</span> {film.episode_id}
      </p>
      <p>
        <span className="font-bold text-yellow-500">Director:</span> {film.director}
      </p>
      <p>
        <span className="font-bold text-yellow-500">Producer:</span> {film.producer}
      </p>
      <h3 className="text-lg font-bold mt-4 mb-2 text-yellow-500">Characters:</h3>
      {loading ? (
        <p className="text-gray-300">Carregando...</p>
      ) : (
        <ul>
          {characters.map((character, index) => (
            <li key={index} className="text-gray-300 bg-slate-900 p-2 mb-3 rounded-md">
              {character}
            </li>
          ))}
        </ul>
      )}
      <button
        className="bg-yellow-500 text-gray-800 px-4 py-2 mt-4 rounded hover:bg-yellow-400 transition-colors float-right"
        onClick={onClose}
      >
        Fechar
      </button>
    </Modal>
  );
};

export default StarWarsModal;
