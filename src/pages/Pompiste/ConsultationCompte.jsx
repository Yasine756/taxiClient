import logo from '../../assets/logo.png'
import gas_station from '../../assets/Gas_station.png'
import logout from '../../assets/logout.png'
import search from '../../assets/search.png'
import {Link} from 'react-router-dom'
import vtaxi from '../../assets/vtaxi.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function ConsultationCompte() {
  const navigate = useNavigate()
  const [matricule,setMatricule]=useState('')
  const onSubmit = async (e) => {
    e.preventDefault()
    navigate(`/consultationCompte/${matricule}`)
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
        <div className='pompiste-date'>
      <p>Le <span style={{color:"blue"}}>01/09/2024</span></p>
      </div>
      
      <img src={vtaxi} alt="Logo" className="consulter-image_section" />
        <div className="pompiste-form-matricule">
          <h3>Entrer le Matricule : </h3>
              <input type="text" onChange={(e)=>setMatricule(e.target.value)} className='pompiste-input_search'/>
          
              <img src={search} alt="Logo" onClick={onSubmit} className="" />
        </div>
        <footer className="pompiste-footer">
          <span>© 2024-2025</span>
          <img src={logout} className="pompiste-refresh-button"/>
        </footer>
      </div>
  )
}

export default ConsultationCompte