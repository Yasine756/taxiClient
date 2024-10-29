import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { FaDollarSign, FaBars, FaSyncAlt } from 'react-icons/fa';
import './HomeAdmin.css'; // Utilisation d'un fichier CSS spécifique

function HomeAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la modale

  // Fonction pour ouvrir/fermer la modale
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div id="admin-container">
      <header id="header">
        {/* Logo */}
        <img src={logo} alt="Logo" id="logoHomeAdmin" />
        
        {/* Icônes dans l'en-tête */}
        <div id="icons">
          <FaDollarSign id="dollar-icon" />
          <FaBars id="menu-icon" onClick={toggleModal} /> {/* Ouvre/Ferme la modale */}
        </div>
      </header>

      {/* Message de bienvenue */}
      <div id="welcome-message">
        Bonjour Mr Admin
      </div>

      {/* Boutons */}
      <div id="buttons-container">
        <Link to="/dashbord">
          <button id="dashbord-btn" className="buttonAdmin">Dashbord</button>
        </Link>
        <Link to="/admin/listePompiste">
          <button id="pompiste-btn" className="buttonAdmin">Pompiste</button>
        </Link>
        <Link to="/chercherTaxi">
          <button id="chercher-taxi-btn" className="buttonAdmin">Chercher Taxi</button>
        </Link>
        <Link to="/nouveauxTaxi">
          <button id="nouveaux-taxi-btn" className="buttonAdmin">Nouveaux Taxi</button>
        </Link>
      </div>

      {/* Modale */}
      {isModalOpen && (
        <div id="modal-overlay">
          <div id="modal">
            
            <Link to="/gestionPompiste" className="modal-link">Gestion Pompiste</Link>
            <Link to="/gestionTaxis" className="modal-link">Gestion Taxis</Link>
            <button onClick={toggleModal} className="close-btn">Fermer</button>
          </div>
        </div>
      )}

      {/* Pied de page */}
      <footer id="footer">
        <span>© 2024-2025</span>
        <FaSyncAlt id="refresh-icon" />
      </footer>
    </div>
  );
}

export default HomeAdmin;
