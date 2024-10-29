import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from '../../assets/logo.png';
import { FaFilePdf, FaEye, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './allTaxis.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AllTaxis() {
    const [taxis, setTaxis] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/getTaxis')
            .then(res => setTaxis(res.data))
            .catch(err => console.error('Error fetching taxis:', err));
    }, []);

    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text('Liste des Taxis', 14, 15);
        doc.autoTable({
            head: [['ID', 'Nom', 'Prénom', 'Téléphone', 'Matricule', 'Date d\'inscription', 'Inscrit par', 'Bénéfice', 'Score']],
            body: taxis.map(taxi => [
                taxi.id_Taxi,
                taxi.nom || '',
                taxi.prénom || '',
                taxi.telephone || '',
                taxi.matricule || '',
                new Date(taxi.date_inscription).toLocaleDateString("fr-FR") || '',
                taxi.inscrit_par || 'N/A',
                taxi.nbd_bénéfice || '0',
                taxi.score || 'Non spécifié'
            ]),
            startY: 30,
            styles: { fontSize: 8 },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 20 },
                2: { cellWidth: 20 },
                3: { cellWidth: 20 },
                4: { cellWidth: 20 },
                5: { cellWidth: 20 },
                6: { cellWidth: 20 },
                7: { cellWidth: 15 },
                8: { cellWidth: 15 }
            },
            margin: { top: 10 }
        });
        doc.save('liste_des_taxis.pdf');
    };

    const deleteTaxi = (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce taxi ?")) {
            axios.delete(`http://localhost:5000/deleteTaxi/${id}`)
                .then(() => {
                    setTaxis(taxis.filter(taxi => taxi.id_Taxi !== id));
                    toast.success('Taxi supprimé avec succès!');
                })
                .catch(err => {
                    console.error('Error deleting taxi:', err);
                    toast.error('Erreur lors de la suppression du taxi.');
                });
        } 
    };

    const modifyTaxi = (id) => {
        navigate(`/modifierTaxi/${id}`);
    };

    const viewTaxiDetails = (matricule) => {
        navigate(`/detailtaxi/${matricule}`); // Redirige vers le composant DetailTaxi avec le matricule
    };

    return (
        <>
            <img src={logo} alt="Company Logo" onClick={() => navigate('/')} />
            <h1>La liste des Taxis <span><FaFilePdf onClick={downloadPdf} style={{ cursor: 'pointer' }} /></span></h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Matricule</th>
                        <th>Aperçu</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {taxis.map((el) => (
                        <tr key={el.id_Taxi}>
                            <td>{el.id_Taxi}</td>
                            <td>{el.matricule}</td>
                            <td id='eye' onClick={() => viewTaxiDetails(el.matricule)} style={{ cursor: 'pointer' }}>
                                <FaEye />
                            </td>
                            <td id='modify'>
                                <FaUserEdit onClick={() => modifyTaxi(el.id_Taxi)} style={{ cursor: 'pointer' }} />
                            </td>
                            <td id='delete'>
                                <MdDelete onClick={() => deleteTaxi(el.id_Taxi)} style={{ cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AllTaxis;
