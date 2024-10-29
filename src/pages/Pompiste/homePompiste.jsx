import './homePompiste.css';
import logo from '../../assets/logo.png';
import gas_station from '../../assets/Gas_station.png';
import logoutIcon from '../../assets/logout.png'; 
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { logoutPompiste } from '../../redux/authActions';
import { useEffect } from 'react';

const HomePompiste = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Récupération des données du pompiste depuis le localStorage
  const pompisteData = JSON.parse(localStorage.getItem('pompiste'));
  console.log('Pompiste from localStorage:', pompisteData);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logoutPompiste()); // Déclencher l'action de déconnexion spécifique au pompiste
    navigate('/authPompiste'); // Rediriger vers la page de connexion du pompiste
  };

  // Vérifiez si les données du pompiste existent avant d'accéder à ses propriétés
  const pompisteNom = pompisteData ? pompisteData.nom : 'Invité'; // Valeur par défaut au cas où les données ne sont pas présentes

  return (
    <div className="pompiste-home-container">
      <header className="pompiste-header">
        <Link to="/homePompiste">
          <img src={logo} alt="Logo" className="af-logo" />
        </Link>

        <div className="pompiste-info">
          <img src={gas_station} alt="Pompiste" className="pompiste-icon" />
          <h3>{pompisteNom}</h3>
        </div>
      </header>

      <div className="pompiste-buttons-container">
        <Link to="/addTaxi">
          <button className="pompiste-button ajouter-taxi">Ajouter Taxi</button>
        </Link>
        <Link to="/consultationCompte">
          <button className="pompiste-button consulter-compte">Consulter Compte</button>
        </Link>
        <Link to="/remplir">
          <button className="pompiste-button remplir">Remplir</button>
        </Link>
      </div>

      <footer className="pompiste-footer">
        <span>© 2024-2025</span>
        <img 
          src={logoutIcon} 
          alt="Déconnexion" 
          className="logout-button" 
          onClick={handleLogout} 
        />
      </footer>
    </div>
  );
};

export default HomePompiste;
