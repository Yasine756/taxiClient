import React from 'react';
import { Link } from 'react-router-dom'; // Pour la navigation
import logo from '../../assets/logo.png'; // Assurez-vous d'avoir le chemin correct pour le logo
import { FaSyncAlt } from 'react-icons/fa'; // Importation de l'icône pour le footer
import './Board.css'; // Fichier de style spécifique pour le composant Board
import { FcStatistics } from "react-icons/fc";
function Board() {
  return (
    <div id="board-container">
      <header id="board-header">
        {/* Logo */}
        <img src={logo} alt="Logo" id="logoBoard" />
        <h1><FcStatistics />Tableau de Bord</h1>
      </header>

      {/* Boutons */}
      <div id="board-buttons">
        <Link to="/admin/recompenserTaxis">
          <button className="board-button">Récompenser</button>
        </Link>
        <Link to="/tousLesTaxi">
          <button className="board-button">Tous les Taxi</button>
        </Link>
        <Link to="/admin/allPresqueGanier">
          <button className="board-button">Presque gagner</button>
        </Link>
        <Link to="/top10">
          <button className="board-button">Top 10</button>
        </Link>
        <Link to="/somme">
          <button className="board-button">Somme</button>
        </Link>
      </div>

      {/* Footer */}
      <footer id="board-footer">
        <span>© 2024-2025</span>
        <FaSyncAlt id="refresh-icon" />
      </footer>
    </div>
  );
}

export default Board;
