import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePompiste } from './actionsStore'; // Assurez-vous que vous avez les bonnes actions
import logo from '../../../assets/logo.png';
import gas_station from '../../../assets/Gas_station.png';
import logout from '../../../assets/logout.png';
import pompisteImg from '../../../assets/pompiste.png';
import { toast } from 'react-toastify'
function ModifierPompiste() {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utiliser useSelector pour trouver le pompiste par id_pompiste
  const pompiste = useSelector((state) =>
    state.pompiste.pompistes.find((p) => p.id === parseInt(id)) 
  );
console.table(pompiste);

  // Initial form state
  const [dataForms, setDataForms] = useState({
    nom: '',
    prénom: '',
    password: ''
  });

  // Mettre à jour le formulaire si le pompiste est trouvé
  useEffect(() => {
    if (pompiste) {
      setDataForms({
        nom: pompiste.nom,
        prénom: pompiste.prénom,
        password: pompiste.password
      });
    }
  }, [pompiste]);

  // Gestion du changement des inputs
  const handleChange = (e) => {
    setDataForms({
      ...dataForms,
      [e.target.name]: e.target.value
    });
  };

  // Gestion de la soumission du formulaire
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updatePompiste(id, dataForms));
      navigate('/admin/listePompiste');
      toast.success('Le pompiste modifié avec succès',
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
      );
    } catch (error) {
      console.error('Erreur lors de la modification du pompiste:', error);
      alert('Erreur lors de la modification du pompiste');
    }
  };

//   if (!pompiste) {
//     return <p>Loading...</p>;
//   }

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

      <img src={pompisteImg} alt="Logo" className="pompiste-image_crud" />

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
                <td>prénom :</td>
                <td>
                  <input
                    type="text"
                    name="prénom"
                    value={dataForms.prénom}
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
            Enregistrer
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

export default ModifierPompiste;
