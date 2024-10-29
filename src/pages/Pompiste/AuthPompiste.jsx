import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import logoComplet from '../../assets/logoComplet.png';
import './AuthPompiste.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Pour utiliser Redux
import { useNavigate } from 'react-router-dom'; // Pour rediriger après la connexion
import { loginPompisteSuccess } from '../../redux/authActions'; // Importer l'action correcte pour pompiste

function AuthPompiste() {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // Pour déclencher une action Redux
  const navigate = useNavigate(); // Pour rediriger l'utilisateur

  const navigateToAdmin = () => {
    navigate('/authAdmin');
  };
localStorage.removeItem('pompiste')
  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log({ prénom: identifiant, password: password }); // Vérification de ce que vous envoyez
    
    try {
      const response = await axios.post('http://localhost:5000/pompistes/login', {
        prénom: identifiant,
        password: password
      });

      if (response.data.message === 'Connexion réussie') {
        dispatch(loginPompisteSuccess(response.data.pompiste));
        toast.success('Connexion réussie !', {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/homePompiste');
      }
    } catch (error) {
      toast.error('Erreur lors de la connexion', {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error.response); // Afficher plus d'infos sur l'erreur
    }
};


  return (
    <div className="auth-container">
      <ToastContainer /> {/* Conteneur pour afficher les toasts */}
      <div className="container">
        <div className="sousContainer">
          <div className="barre1"></div>
          <div className="barre2"></div>
        </div>
        <img src={logoComplet} alt="Logo" id="logo" />
      </div>

      <h2>Bienvenue Mr</h2>
      <h3> <span className="highlight">Pompiste</span></h3>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            id="identifiant"
            placeholder="Identifiant"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaLock className="icon" />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">se connecter</button>
      </form>

      <p className="footer-text">
        cette interface est dédiée juste aux <span className="highlight">pompistes</span>
      </p>
      <div className="footer">
        <div className="footer-left">
          <span className="copyright-icon">©</span> 2024-2025
        </div>
        <div className="footer-right">
          <button className="settings-btn">
            <i className="settings-icon" onClick={navigateToAdmin}>⚙️</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPompiste;
