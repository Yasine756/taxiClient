import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Utiliser useNavigate pour la redirection
import axios from 'axios';  // Pour les requêtes HTTP
import { toast } from 'react-toastify';  // Pour afficher les notifications
import 'react-toastify/dist/ReactToastify.css';  // Importer le CSS des toasts
import './ChercherTaxi.css';  // Importer le fichier CSS

function ChercherTaxi() {
  const [matricule, setMatricule] = useState('');
  const navigate = useNavigate();  // Utiliser useNavigate pour redirection

  const handleSearch = async () => {
    if (!matricule) {
      toast.error('Veuillez entrer un matricule');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/SearcheTaxi/${matricule}`);

      // Vérifier si la réponse contient des données avant de rediriger
      if (response.status === 200 && response.data) {
        // Rediriger seulement si le taxi existe
        navigate(`/detailtaxi/${matricule}`);
      } else {
        toast.error('Taxi non trouvé');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Afficher un message d'erreur si le taxi n'existe pas
        toast.error('Ce taxi n\'existe pas');
      } else {
        // Afficher un message générique si une autre erreur survient
        toast.error('Erreur lors de la recherche');
      }
    }
  };

  return (
    <div className="chercher-taxi-container">
      <h2>Rechercher un Taxi</h2>
      <input 
        type="text" 
        value={matricule} 
        onChange={(e) => setMatricule(e.target.value)} 
        placeholder="Entrez le matricule du taxi" 
        className="input-field"
      />
      <button onClick={handleSearch} className="search-button">Chercher Taxi</button>
    </div>
  );
}

export default ChercherTaxi;
