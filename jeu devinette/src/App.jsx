import React, { useState } from 'react';

function App() {
  // État pour stocker le nombre aléatoire généré
  const [nombreAleatoire] = useState(genererNombreAleatoire());

  // État pour stocker la tentative actuelle
  const [essai, setEssai] = useState('');

  // État pour stocker le nombre de tentatives restantes
  const [tentativesRestantes, setTentativesRestantes] = useState(3);

  // État pour stocker si le jeu est terminé ou non
  const [partieTerminee, setPartieTerminee] = useState(false);

  // État pour stocker le message de comparaison
  const [messageComparaison, setMessageComparaison] = useState('');

  // Fonction pour générer un nombre aléatoire entre 1 et 100
  function genererNombreAleatoire() {
    return Math.floor(Math.random() * 100) + 1;
  }

  // Fonction pour gérer la soumission du formulaire de devinette
  function gererSoumission(event) {
    event.preventDefault();
    
    // Convertir la saisie de l'utilisateur en nombre entier
    const essaiUtilisateur = parseInt(essai, 10);

    // Vérifier si la saisie est égale au nombre aléatoire
    if (essaiUtilisateur === nombreAleatoire) {
      setMessageComparaison('Félicitations ! Vous avez deviné le bon nombre.');
      setPartieTerminee(true);
    } else {
      // Vérifier si la saisie est supérieure ou inférieure au nombre aléatoire
      const message = essaiUtilisateur < nombreAleatoire ? 'Le nombre aléatoire est plus grand.' : 'Le nombre aléatoire est plus petit.';
      setMessageComparaison(message);

      // Décrémenter le nombre de tentatives restantes
      setTentativesRestantes(prevTentatives => prevTentatives - 1);

      // Vérifier si le joueur a épuisé toutes ses tentatives
      if (tentativesRestantes === 1) {
        setPartieTerminee(true);
        setMessageComparaison(`Désolé, vous avez utilisé toutes vos tentatives. Le nombre était ${nombreAleatoire}.`);
      }
    }
  }

  return (
    <div className="App">
      <h1>Jeu de devinette</h1>
      <p>Devinez un nombre entre 1 et 100.</p>
      { tentativesRestantes !== 3 && !partieTerminee && <p>Tentatives Restantes : {tentativesRestantes}</p> }
      {messageComparaison && <p>{messageComparaison}</p>}
      {!partieTerminee && (
        <form onSubmit={gererSoumission}>
          <div className="input-container"> 
            <input 
              type="number" 
              value={essai} 
              onChange={(event) => setEssai(event.target.value)}
              min="1"
              max="100"
              required
            />
            <button type="submit">Soumettre mon choix</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default App;