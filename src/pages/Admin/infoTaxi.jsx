import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Remplacer useHistory par useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Importation d'axios
import './infoTaxi.css';
import logo from '../../assets/logo.png';

function InfoTaxi() {
  const [matricule, setMatricule] = useState(''); // État pour gérer la saisie du matricule
  const navigate = useNavigate();  // Utiliser useNavigate pour la redirection

  // Récupérer la date actuelle
  const currentDate = new Date();
  const formattedDate = `Le ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();  // Empêcher le rechargement de la page

    if (!matricule) {
      toast.error("Veuillez entrer un matricule.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/infoTaxi/${matricule}`);

      if (response.status === 200) { // Si le matricule existe
        toast.success("Le matricule existe.");
        setTimeout(() => {
          navigate(`/detailTaxi/${matricule}`);  // Redirige vers la page de détails du taxi
        }, 2000);  // Attendre 2 secondes avant de rediriger pour laisser le temps au toast
      } else {
        toast.error("Le matricule n'existe pas.");
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion au serveur.");
    }
  };

  return (
    <div className="infoTaxi">
      <ToastContainer /> {/* Conteneur pour les toasts */}
      <img src={logo} alt=" " id="imgLogo" />
      <div className="date">{formattedDate}</div>
      <form onSubmit={handleSubmit} className="searchSection">
        <label htmlFor="matricule" id="labelSearch">Entrer le matricule :</label>
        <input
          type="text"
          id="matricule"
          name="matricule"
          placeholder='12365A34'
          value={matricule}
          onChange={(e) => setMatricule(e.target.value)}  
        />
        <button type="submit">🔍</button>
      </form>
    </div>
  );
}

export default InfoTaxi;
