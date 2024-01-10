import React from 'react';
import './ResponsiveMessage.css';

function ResponsiveMessage() {
  // Utilisez les médias queries pour détecter la taille de l'écran
  const isSmallScreen = window.matchMedia('(min-width: 800px)').matches;
  // Si l'écran est trop petit, affichez le message
  if (isSmallScreen) {
    return <p className="responsive-message">L'application n'est pas disponible sous ce format.</p>;
  }

  // Sinon, ne rien afficher
  return null;
}

export default ResponsiveMessage;
