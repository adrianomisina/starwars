import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      navigate('/starwars');
    } else {
      setError('Credenciais inválidas. Por favor, verifique seu login e senha.');
    }
  };

  const handleInputChange = () => {
    setError('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-700 p-6 rounded-md shadow-md flex flex-col sm:w-96 border border-yellow-500">
        <h1 className="text-2xl font-bold mb-4 text-center text-yellow-500">STAR WARS</h1>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Digite seu login"
            className="p-2 border rounded w-full outline-none text-gray-800 focus:border-yellow-500 focus:ring focus:ring-yellow-500"
            value={username}
            onChange={(e) => { setUsername(e.target.value); handleInputChange(); }}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Digite sua senha"
            className="p-2 border rounded w-full outline-none text-gray-800 focus:border-yellow-500 focus:ring focus:ring-yellow-500"
            value={password}
            onChange={(e) => { setPassword(e.target.value); handleInputChange(); }}
          />
        </div>
        {error && (
          <div className="mb-3 text-red-500">
            {error}
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-slate-800 text-yellow-500 px-4 py-2 rounded hover:opacity-80 transition-opacity"
            onClick={handleLogin}
          >
            ENTRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
