import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaFilePdf, FaHistory, FaPhone } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import './DetailTaxi.css';
import logo from '../../assets/logo.png';

function DetailTaxi() {
  const { matricule } = useParams();
  const [taxiDetails, setTaxiDetails] = useState(null);
  const navigate = useNavigate();

  const navigationHistorique = () => {
    navigate(`/historique/${matricule}`); // Corrected the route to use the actual matricule
  };

  useEffect(() => {
    const fetchTaxiDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/infoTaxi/${matricule}`);
        setTaxiDetails(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données : ", error);
      }
    };

    fetchTaxiDetails();
  }, [matricule]);

  // Fonction pour générer et télécharger le PDF
  const downloadPdf = () => {
    const doc = new jsPDF();

    const tableData = [
      { label: "Matricule", value: taxiDetails.matricule || '-' },
      { label: "Nom", value: taxiDetails.nom || '-' },
      { label: "Prénom", value: taxiDetails.prénom || '-' },
      { label: "Téléphone", value: taxiDetails.telephone || '-' },
      { label: "Score", value: taxiDetails.score || 0 },
      { label: "Nbr Bénéfice", value: taxiDetails.nbd_bénéfice || 0 },
      { label: "Inscription", value: taxiDetails.date_inscription ? new Date(taxiDetails.date_inscription).toLocaleDateString() : 'N/A' }
    ];

    doc.autoTable({
      head: [['Label', 'Valeur']],
      body: tableData.map(item => [item.label, item.value]),
      theme: 'grid',
      styles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontSize: 12,
      },
      headStyles: {
        fillColor: [0, 123, 255],
        textColor: [255, 255, 255],
        fontSize: 14,
      },
      margin: { top: 20 },
    });

    doc.save(`${taxiDetails.matricule || 'details_taxi'}.pdf`);
  };

  if (!taxiDetails) {
    return <div>Chargement...</div>;
  }

  // Fonction pour contacter le chauffeur
  const contactChauffeur = () => {
    if (taxiDetails.telephone) {
      window.location.href = `tel:${taxiDetails.telephone}`; // Ouvre l'application de téléphone avec le numéro
    } else {
      alert("Numéro de téléphone non disponible.");
    }
  };

  return (
    <div className="detailTaxi">
      <div className="header">
        <img src={logo} alt="Company Logo" onClick={() => navigate('/')} />
        <div className="subContainer">
          <h1>Le matricule  -----</h1>
          <h2>{taxiDetails.matricule || '-'}</h2>
        </div>
      </div>
      <div className="infoSection">
        <div className="info">
          <p><strong>Nom complet du chauffeur:</strong> {taxiDetails.prénom || '-'} {taxiDetails.nom || '-'}</p>
          <p><strong>Nombre de Bons:</strong> {taxiDetails.score || 0}</p>
          <p><strong>Nombre de Bénéfice:</strong> {taxiDetails.nbd_bénéfice || 0}</p>
          <p><strong>Solde:</strong> {taxiDetails.solde || 0} dhs</p>
          <p><strong>Inscription:</strong> {taxiDetails.date_inscription ? new Date(taxiDetails.date_inscription).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Téléphone:</strong> {taxiDetails.telephone || '-'}</p>
        </div>
        <div className="actions">
          <button onClick={downloadPdf} id="pdfButton">
            <FaFilePdf /> Télécharger PDF
          </button>
          <button className="historyButton" onClick={navigationHistorique}>
            <FaHistory /> Historique
          </button>
          <button onClick={contactChauffeur} className="phoneButton">
            <FaPhone /> Contacter
          </button>
        </div>
      </div>
      <footer>
        <p>&copy; 2024-2025</p>
      </footer>
    </div>
  );
}

export default DetailTaxi;
