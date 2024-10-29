import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddTaxi from './pages/Pompiste/AddTaxi'
import ConsultationCompte from './pages/Pompiste/ConsultationCompte'
import Remplir from './pages/Pompiste/Remplir'
import AuthPompiste from './pages/Pompiste/AuthPompiste'
import ConsultationResultat from './pages/Pompiste/ConsultationResultat'
import HomePompiste from "./pages/Pompiste/homePompiste";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import AuthAdmin from "./pages/Admin/authAdmin";
import HomeAdmin from "./pages/Admin/homeAdmin";
import Board from "./pages/Admin/board";
import AllTaxis from "./pages/Admin/AllTaxis";
import ModifierTaxi from "./pages/Admin/modifierTaxi";


import 'react-toastify/dist/ReactToastify.css' 

import ListePompiste from './pages/Pompiste/redux/ListPompiste'
import AjouterPompiste from './pages/Pompiste/redux/AjouterPompiste'
import ModifierPompiste from './pages/Pompiste/redux/ModifierPompiste'
import { useDispatch } from 'react-redux';
import { getPompistes } from './pages/Pompiste/redux/actionsStore';
import { useEffect } from 'react'
import InfoTaxi from './pages/Admin/infoTaxi'
import DetailTaxi from './pages/Admin/DetailTaxi'

import ChercherTaxi from './pages/Admin/ChercherTaxi'


import Recompenser from './pages/Admin/recompensePage'
import PresqueGanier from './pages/Admin/presqueGagnier'
import DixMeilleursTaxi from './pages/Admin/dixMeilleurs'
import HistoriqueTaxi from './pages/Admin/HistoriqueTaxi'


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPompistes());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />{' '}
        <Routes>
        <Route index element={<AuthPompiste />} />
          <Route path="/homePompiste" element={<HomePompiste />} />
          <Route path="/addTaxi" element={<AddTaxi />} />
          <Route path="/consultationCompte" element={<ConsultationCompte />} />
          <Route path="/remplir" element={<Remplir />} />
          <Route path="/authPompiste" element={<AuthPompiste />} />
          <Route path="/consultationCompte/:matricule" element={<ConsultationResultat />} />
          <Route path="/admin/listePompiste" element={<ListePompiste />} />
          <Route path="/admin/AjouterPompiste" element={<AjouterPompiste />} />
          <Route path="/admin/ModifierPompiste/:id" element={<ModifierPompiste />} />
          <Route path="/authAdmin" element={<AuthAdmin />} />
          <Route path="/homeAdmin" element={<HomeAdmin />} />
          <Route path="/dashbord" element={<Board />} />
          <Route path="/tousLesTaxi" element={<AllTaxis />} />
          <Route path="/modifierTaxi/:id_taxi" element={<ModifierTaxi />} />
          <Route path="/InfosTaxi" element={<InfoTaxi />} />
          <Route path="/detailtaxi/:matricule" element={<DetailTaxi />} />

          <Route path="/chercherTaxi" element={<ChercherTaxi />} />

          <Route path="/admin/recompenserTaxis" element={<Recompenser />} />
          <Route path="/admin/dixMeilleuresTaxis" element={<DixMeilleursTaxi />} />
          <Route path="/admin/allPresqueGanier" element={<PresqueGanier />} />
          <Route path="/historique/:matricule" element={<HistoriqueTaxi />} />

        
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
