import logo from '../../assets/logo.png';
import gas_station from '../../assets/Gas_station.png';
import logout from '../../assets/logout.png';

import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import notfound from '../../assets/notfound.png'; 
import solde from '../../assets/solde.png'; 

function ConsultationResultat() {
   const { matricule } = useParams();
  const [existe, setExiste] = useState([]);

  useEffect(() => {
    const fetchConsultation = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/taxis/consultation?matricule=${matricule}`); 
         setExiste(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConsultation();
  }, [matricule]); 

  return (
    <div className="pompiste-home-container">
      <header className="pompiste-header">
        <Link to="/homePompiste">
          <img src={logo} alt="Logo" className="af-logo" />
        </Link>
        <div className="pompiste-info">
          <img src={gas_station} alt="pompiste" className="pompiste-icon" />{' '}
          <h3>Ahmed</h3>
        </div>
      </header>
      <div className="pompiste-date">
        <p>Le <span style={{ color: 'blue' }}>01/09/2024</span></p>
      </div>
      {existe.length >0 ? (
        <>
          <img src={solde} alt="Solde" className="solde-image_section" />
          <div className="pompiste-form-matricule">
            <h3>Nbr de bon jusqu à présent :</h3>
            <div className='solde_div'>
              <p>{existe[0].score} bons</p>
            </div>
            <h3>Nbr de fois bénéficié:</h3>
            <div className='solde_div'>
              <p>{existe[0].nbd_bénéfice} fois</p>
            </div>
    
          </div>
        </>
      ) : (
        <>
        <img src={notfound} alt="Not Found" className="NotFound-image_section" />
        <h4 className='h4_consultation' style={{color:'red'}}>Le matricule n existe pas</h4>
        </>
      )}

      <footer className="pompiste-footer">
        <span>© 2024-2025</span>
        <img src={logout} alt="Logout" className="pompiste-refresh-button" />
       
      </footer>
    </div>
  );
}

export default ConsultationResultat;
