import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import logoComplet from '../../assets/logoComplet.png';
import '../Pompiste/AuthPompiste.css';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { IoArrowBackCircle } from "react-icons/io5";
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Pour utiliser Redux
import { useNavigate } from 'react-router-dom'; // Pour rediriger après la connexion
import { loginAdminSuccess } from '../../redux/authActions';// Importer l'action pour l'admin

function AuthAdmin() {
  const [identifiant, setIdentifiant] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // Pour déclencher une action Redux
  const navigate = useNavigate(); // Pour rediriger l'utilisateur
  const navigation = () => {
    navigate('/authPompiste');
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Requête vers le backend
      const response = await axios.post('http://localhost:5000/admin/login', {
        prénom: identifiant,
        password: password
      });

      if (response.data.message === 'Connexion réussie') {
        // Stocker les informations de l'admin dans Redux
        dispatch(loginAdminSuccess(response.data.admin));

        // Afficher une notification toast en cas de succès
        toast.success('Connexion réussie !', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Rediriger l'utilisateur vers la page de l'admin
        navigate('/homeAdmin');
      }
    } catch (error) {
      // Afficher une notification toast en cas d'erreur
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
      <h3> <span className="highlight">Admin</span></h3>

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
        cette interface est dédiée juste à L' <span className="highlight">Admin</span>
      </p>
      <div className="footer">
        <div className="footer-left">
          <span className="copyright-icon">©</span> 2024-2025
        </div>
        <div className="footer-right">
          <button className="settings-btn">
            <i className="settings-icon" onClick={navigation}><IoArrowBackCircle /></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthAdmin;
