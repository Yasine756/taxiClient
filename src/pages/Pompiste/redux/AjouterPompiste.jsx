import { useState } from 'react'
import logo from '../../../assets/logo.png'
import gas_station from '../../../assets/Gas_station.png'
import logout from '../../../assets/logout.png'
import pompiste from '../../../assets/pompiste.png'
import { Link, useNavigate } from 'react-router-dom'
import {addPompiste} from './actionsStore'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
function AjouterPompiste() {
  const [dataForms, setDataForms] = useState({
    nom: '',
    prénom: '',
    password: ''
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setDataForms({
      ...dataForms,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
       await  dispatch(addPompiste(dataForms))
      navigate('/admin/listePompiste')
      toast.success('Le pompiste ajouté avec succès',
        {
            position: "bottom-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "colored",

        }
      )
    } catch (error) {
      console.error("Erreur lors de l'ajout du pompiste:", error)
      toast.error("Erreur lors de l'ajout du pompiste")
    }
  }
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

      <img src={pompiste} alt="Logo" className="pompiste-image_crud" />

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
                <td>Prenom :</td>
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
                <td>Password :</td>
                <td>
                  <input
                    type="text"
                    name="password"
                    value={dataForms.password}
                    onChange={handleChange}
                    className="pompiste-input_ajout"
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" className="pompiste-button ajouter-taxi_info">
            Ajouter Pompiste
          </button>
        </form>
      </div>
      <footer className="pompiste-footer">
        <span>© 2024-2025</span>
        <img src={logout} className="pompiste-refresh-button" alt="Logout" />
      </footer>
    </div>
  )
}

export default AjouterPompiste
