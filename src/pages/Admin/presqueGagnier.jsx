import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import logout from '../../assets/logout.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
function PresqueGanier() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/admin/allPresqueGanier')
      .then((res) => setData(res.data))
  }, [])
  return (
    <div className="pompiste-home-container">
      <header className="pompiste-header">
        <Link to="/homePompiste">
          <img src={logo} alt="Logo" className="af-logo" />
        </Link>
      </header>
      <h3 style={{marginRight:"200px"}}>Mr L'admin :</h3>

      <div className="pompiste-redux-form-container">
        <table className="table_crud">
          <tbody>
            {data.map((taxi,index) => (
              <tr key={taxi.id_taxi}>
                <td> {index+1}. </td>
                <td>
                  {' '}
                  {taxi.nom} {taxi.prenom}
                </td>
                <td> {taxi.telephone}</td>
                <td> {taxi.matricule}</td>
                <td>
                  <button className="nbr_bon_button">{taxi.score}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h4>Sont presque à être récompensés</h4>
      <footer className="pompiste-footer">
        <span>© 2024-2025</span>
        <img src={logout} className="pompiste-refresh-button" alt="Logout" />
      </footer>
    </div>
  )
}

export default PresqueGanier
