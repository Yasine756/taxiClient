import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'
import logout from '../../assets/logout.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

function Recompenser() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5000/admin/bonComplete')
      .then((res) => setData(res.data))
      
  }, [data])
  

  const Recompense = (id) => {
    Swal.fire({
      title: 'Es-tu sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, recompense-le !',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:5000/admin/recompenserTaxis/${id}`)

        Swal.fire({
          title: 'récompensé!',
          text: 'taxi a été récompensé avec succès.',
          icon: 'success',
        })
      }
    })
  }
  return (
    <div className="pompiste-home-container">
      <header className="pompiste-header">
        <Link to="/homePompiste">
          <img src={logo} alt="Logo" className="af-logo" />
        </Link>
      </header>
      <div className="admin-h3">
      <h3 >Mr L'admin ,</h3>

      {
         data.length >0 ? <h4 style={{color:"green"}}> vous devez récompense</h4> :''
      }
      </div>

      <div className="pompiste-redux-form-container">
        <table className="table_crud">
          <tbody>
            
            {data.length>0?
            data.map((taxi, index) => (
              <tr key={taxi.id_taxi}>
                <td> {index + 1}. </td>
                <td>
                  {taxi.nom} {taxi.prenom}
                </td>
                <td>{taxi.telephone}</td>
                <td>{taxi.matricule}</td>
                <td>
                  <button
                    className="nbr_bon_button"
                    onClick={() => Recompense(taxi.id_taxi)}
                  >
                    recompenser
                  </button>
                </td>
              </tr>
            ))
          :<h3 style={{color:"red"}}>Aucun taxi n'est peu récompensé.</h3>
          }
          </tbody>
        </table>
      </div>
      <footer className="pompiste-footer">
        <span>© 2024-2025</span>
        <img src={logout} className="pompiste-refresh-button" alt="Logout" />
      </footer>
    </div>
  )
}

export default Recompenser
