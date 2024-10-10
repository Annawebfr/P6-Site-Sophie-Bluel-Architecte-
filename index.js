// Variable pour cibler la galerie dans le DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Fonction pour récupérer les travaux depuis l'API
async function getWorks() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
}

// Récupération pour récupérer les catégories depuis l'API
async function getCategorys() {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error.message);
  }
}

// Fonction pour charger la page au chargement initial
function loadingPage() {
  displayGalleryProjets();
  displayCategorysButtons().then(() => {
    filterCategorys();
  });
}

//Si utilisateur connecté :
//Affichage et déconnexion via Logout
async function displayAdminInterface() {
  document.addEventListener("DOMContentLoaded", function () {
    const logged = window.sessionStorage.getItem("logged");

    if (logged === "true") {
      displayAdminTopBar();
      updateTitleWithEditButton();
      filters.style.display = "none";
      // Ajoutez ici le code pour le reste de l'interface d'administration
    }
  });
}

// Fonction pour afficher la barre du haut du mode administrateur
function displayAdminTopBar() {
  const newDiv = document.createElement("div");
  const iconElement = document.createElement("i");
  const titleEditionMod = document.createElement("p");

  // Ajoutez ici le code pour créer la barre noire et le bouton "Modifier"
  // par exemple, vous pouvez ajouter des classes CSS, attributs, événements, etc.

  // Ajout de la nouvelle div au début de body
  document.body.insertBefore(newDiv, document.body.firstChild);
}

// Fonction pour mettre à jour le titre avec le bouton "Modifier"
function updateTitleWithEditButton() {
  // Ajoutez ici le code pour mettre à jour le titre avec le bouton "Modifier"
  // par exemple, vous pouvez modifier le contenu HTML, ajouter des classes, attributs, événements, etc.
}

// Appel des fonctions pour charger la page et afficher l'interface d'administration
loadingPage();
displayAdminInterface();









