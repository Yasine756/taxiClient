import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaFilePdf } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import logo from '../../assets/logo.png';
import './historiqueTaxi.css';

function HistoriqueTaxi() {
  const { matricule } = useParams();
  const [remplissageData, setRemplissageData] = useState([]);

  useEffect(() => {
    const fetchRemplissageData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/historiqueTaxi/${matricule}`);
        setRemplissageData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchRemplissageData();
  }, [matricule]);

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.addImage(logo, 'PNG', 5, 5, 30, 10); // Adding the logo at the top
    doc.text(`Historique du Taxi: ${matricule}`, 70, 30);

    doc.autoTable({
      head: [['ID Remplissage', 'Matricule', 'Prix', 'Rempli Par', 'Date Remplissage']],
      body: remplissageData.map(item => [
        item.id_remplissage,
        item.matricule,
        item.prix,
        item.remplir_par,
        new Date(item.date_remplisage).toLocaleDateString(),
      ]),
      startY: 40,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 123, 255] },
    });
    doc.save(`Historique_${matricule}.pdf`);
  };

  return (
    <div className="historiqueTaxi">
      <div className="header">
        <img src={logo} alt="Company Logo" />
        <h1>Historique de remplissage pour le taxi {matricule}</h1>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID Remplissage</th>
              <th>Matricule</th>
              <th>Prix</th>
              <th>Rempli Par</th>
              <th>Date Remplissage</th>
            </tr>
          </thead>
          <tbody>
            {remplissageData.map((item) => (
              <tr key={item.id_remplissage}>
                <td>{item.id_remplissage}</td>
                <td>{item.matricule}</td>
                <td>{item.prix}</td>
                <td>{item.remplir_par}</td>
                <td>{new Date(item.date_remplisage).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={downloadPdf} className="pdfButton">
        <FaFilePdf /> Télécharger PDF
      </button>
    </div>
  );
}

export default HistoriqueTaxi;
