import { useEffect } from 'react'
import logo from '../../../assets/logo.png'
import gas_station from '../../../assets/Gas_station.png'
import logout from '../../../assets/logout.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getPompistes, deletePompiste } from './actionsStore'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function ListePompiste() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { pompistes, loading, error } = useSelector((state) => state.pompiste)
  useEffect(() => {
    dispatch(getPompistes())
  }, [dispatch])
   if (loading) return <p>Loading...</p>
   if (error) return <p>Error: {error}</p>

  const Ajouter_Pompiste = () => {
    navigate('/admin/AjouterPompiste')
  }
  const Modifier_Pompiste = (id) => {
    navigate(`/admin/ModifierPompiste/${id}`)
  }
  const Supprimer = (id) => {
    Swal.fire({
      title: 'Es-tu sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprime-le !',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePompiste(id))
        Swal.fire({
          title: 'Supprimé!',
          text: 'Votre fichier a été supprimé.',
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
        <div className="pompiste-info">
          <img src={gas_station} alt="pompiste" className="pompiste-icon" />{' '}
          <h3>Ahmed</h3>
        </div>
      </header>
      <ToastContainer 
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
      />
      <button onClick={Ajouter_Pompiste} className=" button_ajoute_pompiste">
        Ajouter Pompiste
      </button>

      <div className="pompiste-redux-form-container">
        <table className='table_crud'>
          <tbody>
          {pompistes.map((pompiste) => (
            <tr key={pompiste.id}>
              <td > {pompiste.id}. </td>
              <td>
                {' '}
                {pompiste.nom} {pompiste.prenom}
              </td>
              <td>
                <button className='edit_button' onClick={()=>Modifier_Pompiste(pompiste.id)}><FiEdit style={{color:"green"}}/></button>
              </td>
              <td>
                <button
                  className='delete_button' onClick={() => Supprimer(pompiste.id)}
                >
                  <MdDelete style={{color:"red"}}/> 
                </button>
              </td>
              
            </tr>
          ))}
          {/* <tr>
            <td>1.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>2.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>3.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>4.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>5.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>6.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>7.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>8.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>9.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr>
          <tr>
            <td>10.</td>
            <td>elgantouri hicham </td>
            <td><button className='edit_button' onClick={()=>Modifier_Pompiste()}><FiEdit style={{color:"green"}} /></button></td>
            <td><button className='delete_button'
                  onClick={() => Supprimer()}
                >
                  <MdDelete style={{color:"red"}}/>
                </button></td>
          </tr> */}

          
          
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

export default ListePompiste
