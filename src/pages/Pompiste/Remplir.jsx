import logo from '../../assets/logo.png';
import gas_station from '../../assets/Gas_station.png';
import logout from '../../assets/logout.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Remplir() {
  // Retrieve the pompiste's details from localStorage
  const pompiste = JSON.parse(localStorage.getItem('pompiste')); // Correctly use getItem to retrieve data
  console.log(pompiste);

  // Initialize the state for data forms
  const [dataForms, setDataForms] = useState({
    matricule: '',
    prix: '',
    remplir_par: `${pompiste?.nom || ''} ${pompiste?.prénom || ''}`, // Initialize with pompiste's name
  });

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log the dataForms to verify that it contains the correct values
      console.log("Submitting dataForms:", dataForms);

      // Send dataForms including remplir_par to the server
      await axios.post('http://localhost:5000/taxis/remplissage', dataForms);
      alert('Le prix a été ajouté avec succès');
      navigate('/homePompiste');
    } catch (error) {
      console.error(error);
      alert("Ce matricule n'existe pas");
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
          <h3>{dataForms.remplir_par || 'Pompiste'}</h3> {/* Display the pompiste's name */}
        </div>
      </header>
      <div className="pompiste-date">
        <p>
          Le <span style={{ color: 'blue' }}>{currentDate.toLocaleDateString()}</span>
        </p>
      </div>

      <div className="pompiste-form-remplir">
        <h3>Entrer le Matricule : </h3>
        <input 
          type="text" 
          value={dataForms.matricule} // Bind the input value
          onChange={(e) => setDataForms({ ...dataForms, matricule: e.target.value })} 
          className="pompiste-input_search" 
        />
        <h3>Le Montant : </h3>
        <input 
          type="text" 
          value={dataForms.prix} // Bind the input value
          onChange={(e) => setDataForms({ ...dataForms, prix: e.target.value })} 
          className="pompiste-input_search" 
        />

        <button className="pompiste-button remplir" onClick={onSubmit}>Remplir</button>
      </div>
      <footer className="pompiste-footer">
        <span>© 2024-2025</span>
        <img src={logout} className="pompiste-refresh-button" />
      </footer>
    </div>
  );
}

export default Remplir;
