import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import gas_station from '../../assets/Gas_station.png';
import logout from '../../assets/logout.png';
import taxi1 from '../../assets/taxi1.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTaxi() {
  const pompiste = JSON.parse(localStorage.getItem("pompiste"));

  const [dataForms, setDataForms] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    matricule: '',
    inscrit_par: `${pompiste?.nom || ''} ${pompiste?.prénom || ''}`
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setDataForms({
      ...dataForms,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/addTaxi', dataForms);
      alert('Taxi ajouté avec succès');
      navigate('/homePompiste');
    } catch (error) {
      console.error("Erreur lors de l'ajout du taxi:", error);
      alert("Erreur lors de l'ajout du taxi");
    }
  };

  return (
    <div className="pompiste-home-container">
      <header className="pompiste-header">
        <Link to="/homePompiste">
          <img src={logo} alt="Logo" className="af-logo" />
        </Link>
        <div className="pompiste-info">
          <img src={gas_station} alt="pompiste" className="pompiste-icon" />
          <h3>{pompiste?.nom || "Pompiste"}</h3>
        </div>
      </header>

      <img src={taxi1} alt="Taxi" className="pompiste-image_section" />

      <div className="pompiste-form-container">
        <form onSubmit={onSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Nom :</td>
                <td>
                  <input
                    type="text"
                    name="nom"
                    value={dataForms.nom}
                    onChange={handleChange}
                    className="pompiste-input_ajout"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Prénom :</td>
                <td>
                  <input
                    type="text"
                    name="prenom"
                    value={dataForms.prenom}
                    onChange={handleChange}
                    className="pompiste-input_ajout"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Téléphone :</td>
                <td>
                  <input
                    type="number"
                    name="telephone"
                    value={dataForms.telephone}
                    onChange={handleChange}
                    className="pompiste-input_ajout"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Matricule :</td>
                <td>
                  <input
                    type="text"
                    name="matricule"
                    value={dataForms.matricule}
                    onChange={handleChange}
                    className="pompiste-input_ajout"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="pompiste-button ajouter-taxi_info">
            Ajouter Taxi
          </button>
        </form>
      </div>
      <footer className="pompiste-footer">
        <span>© 2024-2025</span>
        <img src={logout} className="pompiste-refresh-button" alt="Logout" />
      </footer>
    </div>
  );
}

export default AddTaxi;
