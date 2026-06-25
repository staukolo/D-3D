import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import Dice from './components/Dice';
import './App.css';

function App() {
  const [valeur, setValeur] = useState(1);
  const [historique, setHistorique] = useState([]);

  // récuperer l'historique sauvegardé au chargement
  useEffect(() => {
    const sauvegarde = JSON.parse(localStorage.getItem('historique') || '[]');
    setHistorique(sauvegarde);
  }, []);

  // sauvegarder l'historique à chaque nouveau lancer
  useEffect(() => {
    localStorage.setItem('historique', JSON.stringify(historique));
  }, [historique]);

  function lancerDe() {
    const resultat = Math.floor(Math.random() * 6) + 1;
    setValeur(resultat);
    setHistorique([...historique, resultat]);
  }

  return (
    <div className="app">
      <h1>🎲 Lancer de Dé</h1>

      <div className="canvas-container">
        <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Dice valeur={valeur} />
        </Canvas>
      </div>

      <button className="btn-lancer" onClick={lancerDe}>
        Lancer le dé
      </button>
      <p>Valeur actuelle : <strong>{valeur}</strong></p>

      <div className="historique">
        <h2>Historique</h2>
        <div className="chips">
          {historique.map((v, i) => (
            <span key={i} className="chip">{v}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;