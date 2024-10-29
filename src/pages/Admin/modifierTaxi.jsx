import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import taxi from '../../assets/vtaxi.png';
import axios from 'axios';
import './ModifierTaxi.css';
import { toast } from 'react-toastify'; // Importez toast pour les notifications

function ModifierTaxi() {
  const { id_taxi } = useParams();
  const [taxiDetails, setTaxiDetails] = useState({
    nom: '',
    prénom: '',
    matricule: '',
    telephone: ''
  }); 
  const navigate = useNavigate(); // Hook pour la navigation

  useEffect(() => {
    if (id_taxi) {
      axios.get(`http://localhost:5000/getTaxi/${id_taxi}`)
        .then(response => {
          setTaxiDetails(response.data); 
          console.log(response.data);
           // Mise à jour avec les données reçues
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des détails du taxi:', error);
        });
    }
  }, [id_taxi]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxiDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      // Envoyer une requête PUT pour modifier le taxi
      await axios.put(`http://localhost:5000/modifierTaxi`, {
        nom: taxiDetails.nom,
        prénom: taxiDetails.prénom,
        matricule: taxiDetails.matricule,
        telephone: taxiDetails.telephone,
        taxiId:id_taxi,
      });

      // Afficher un message de succès
      toast.success('Taxi modifié avec succès');

      // Naviguer vers la page d'accueil de l'administrateur
      navigate('/homeAdmin');
    } catch (error) {
      console.error('Erreur lors de la modification du taxi:', error);
      toast.error('Erreur lors de la modification du taxi'); // Afficher une notification d'erreur
    }
  };

  if (!taxiDetails) {
    return <div>Chargement des informations du taxi...</div>;
  }

  return (
    <div className="modifier-taxi-container">
      <div className="taxi-header">
        <img src={logo} alt="Logo" className="logo"/>
        <img src={taxi} alt="Taxi" className="taxi-image"/>
      </div>
      <form className="taxi-info" onSubmit={handleSubmit}> {/* Formulaire pour la soumission */}
        <input
          type="text"
          name="nom"
          value={taxiDetails.nom}
          onChange={handleChange}
          placeholder="Nom"
        />
        <input
          type="text"
          name="prénom"
          value={taxiDetails.prénom}
          onChange={handleChange}
          placeholder="Prénom"
        />
        <input
          type="text"
          name="matricule"
          value={taxiDetails.matricule}
          onChange={handleChange}
          placeholder="Matricule"
        />
        <input
          type="text"
          name="telephone"
          value={taxiDetails.telephone}
          onChange={handleChange}
          placeholder="Téléphone"
        />
        <button type="submit" className="modifier-btn">Modifier Taxi</button> {/* Soumettre le formulaire */}
      </form>
    </div>
  );
}

export default ModifierTaxi;
