import {  useState } from 'react'
import logo from '../../assets/logo.png'
import logout from '../../assets/logout.png'
import { Link } from 'react-router-dom'
import axios from 'axios'

function DixMeilleursTaxi() {
  const annees = [2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const [data, setData] = useState([])
  const [anneeSelectione, setAnneeSelectione] = useState('')
  const Rechercher = () => {
      axios.get(`http://localhost:5000/admin/dixMeilleuresTaxis/${anneeSelectione}`)
        .then((res) => setData(res.data))
        .catch((err) => setData(err.data))
    
    console.log(anneeSelectione);
    
    
  }

  return (
    <div className="pompiste-home-container">
      <header className="pompiste-header">
        <Link to="/homePompiste">
          <img src={logo} alt="Logo" className="af-logo" />
        </Link>
      </header>
      <select style={{marginTop:"40px"}} onChange={(e) => setAnneeSelectione(e.target.value)}>
        <option value="Veuillez sélectionner une année">
          Veuillez sélectionner une année
        </option>

        {annees.map((annee) => (
          <option key={annee} value={annee}>
            {annee}
          </option>
        ))}
      </select>
      <button onClick={Rechercher}>Rechercher</button>
      <h3 style={{color:"red"}}>
        Les dix meilleurs taxis on{' '}
        <span style={{ fontFamily: 'bold' }}>{anneeSelectione}</span> sont :
      </h3>

      <div className="pompiste-redux-form-container">
        <table className="table_crud">
          <tbody>
            {data.map((taxi,index) => (
              <tr key={taxi.id_taxi}>
                <td>{index+1}.</td>
                <td>
                  {taxi.nom} {taxi.prenom}
                </td>
                <td style={{color:"green"}}> {taxi.telephone}</td>
                <td> {taxi.matricule}</td>
                {/* <td><button style={{border:"none", backgroundColor:"green",borderRadius:'40px'}}> {taxi.prix}{' '}DHs</button></td> */}
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
      <footer className="pompiste-footer" >
        <span>© 2024-2025</span>
        <img src={logout} className="pompiste-refresh-button" alt="Logout" />
      </footer>
    </div>
  )
}

export default DixMeilleursTaxi
