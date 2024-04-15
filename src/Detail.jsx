import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebaseconfig";

function LivreDetail() {
  const location = useLocation();
  const livre = location.state; // Récupérer les données du livre passées via l'état de localisation
  const [livreDetails, setLivreDetails] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les détails du livre à partir de la base de données
    const fetchLivreDetails = async () => {
      try {
        const docRef = doc(db, "Livres", livre.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLivreDetails(docSnap.data());
        } else {
          console.log("Aucun document trouvé !");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des détails du livre :", error);
      }
    };

    fetchLivreDetails();
  }, [livre.id]);

  return (
    <div>
      {livreDetails ? (
        <>
          <h2>{livreDetails.titre}</h2>
          <p>{livreDetails.description}</p>
          <p>Par {livreDetails.auteur.name}</p>
          {/* Ajoutez ici d'autres détails du livre que vous souhaitez afficher */}
        </>
      ) : (
        <p>Chargement des détails du livre...</p>
      )}
    </div>
  );
}

export default LivreDetail;
