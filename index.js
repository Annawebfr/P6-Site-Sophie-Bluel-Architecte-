// Variables pour cibler les éléments du DOM
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

// Fonction pour récupérer les travaux depuis l'API en incluant le token
async function getWorks() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:5678/api/works", {
      headers: {
        Authorization: `Bearer ${token}`, // Inclusion du token dans le header
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
}

// Fonction pour récupérer les catégories depuis l'API en incluant le token
async function getCategorys() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch("http://localhost:5678/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`, // Inclusion du token dans le header
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error.message);
  }
}

// Fonction pour charger la page au chargement initial
async function loadingPage() {
  await displayGalleryProjets();
  await displayCategorysButtons(); // Attendre la récupération des catégories
  filterCategorys();

  if (verifyToken()) {
    console.log("JE SUIS AUTHENTIFIER");
    displayAdminInterface(); // Afficher l'interface admin si connecté
  }
  // else {
  //   console.log("JE NE SUIS PAS AUTHENTIFIER");
  //   resetToDefault(); // Remise à l'état par défaut si non connecté
  // }
}



// Fonction pour afficher les travaux dans le DOM
async function displayGalleryProjets() {
  try {
    // Nettoyage de la galerie avant ajout de nouveaux éléments
    gallery.innerHTML = "";

    // Récupérer les travaux depuis l'API
    const works = await getWorks();

    // Créer les éléments de la galerie
    works.forEach((work) => {
      createWorkElement(work);
    });
  } catch (error) {
    console.error("Erreur lors de l'affichage de la galerie :", error);
  }
}

// Fonction pour créer un élément de la galerie
function createWorkElement(work) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.textContent = work.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

// Fonction pour afficher les boutons dynamiquement
async function displayCategorysButtons() {
  const categorys = await getCategorys();
  if (categorys) {
    categorys.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.classList.add("clic"); // Ajoute la classe "clic" au bouton
      btn.id = category.id;
      filters.appendChild(btn);
    });
  }
}

// Fonction pour filtrer par catégorie et que le bouton functionne
function filterCategorys() {
  const allButtons = document.querySelectorAll(".filters button");

  allButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const allStoredWorks = await getWorks();
      const btnId = e.target.id;

      gallery.innerHTML = "";
      allStoredWorks.forEach((work) => {
        if (btnId == work.categoryId || btnId == "0") {
          createWorkElement(work);
        }
      });

      allButtons.forEach((button) => {
        button.classList.remove("active");
      });

      e.target.classList.add("active");
    });
  });
  document.getElementById("0").classList.add("active");
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  });
});

// Fonction pour vérifier le token
function verifyToken() {
  const token = localStorage.getItem("authToken");
  if (token && token !== "") {
    console.log("Utilisateur connecté avec le token:", token);
    return true;
  } else {
    console.log("Utilisateur non connecté.");
    return false;
  }
}

// Remettre le contenu par défaut si l'utilisateur est déconnecté
// function resetToDefault() {
//   gallery.innerHTML = "<p>Veuillez vous connecter pour voir les travaux.</p>";
//   filters.innerHTML = ""; // Remettre les filtres à leur état par défaut
// }

// Affichage de l'interface admin si l'utilisateur est connecté
function displayAdminInterface() {
  // const logged = window.sessionStorage.getItem("logged");

  if (verifyToken()) {
    console.log("AFFICHAGE INTERFACE ADMIN");
    displayAdminElements();
    // updateTitleWithEditButton();
    filters.style.display = "none"; // Masquer les filtres
    header.style.margin = "100px 0px 50px 0px"; // Ajuster le margin du header

    const loginLink = document.querySelector("a[href='connection.html']");
    loginLink.textContent = "Logout";

    loginLink.addEventListener("click", () => {
      // window.sessionStorage.setItem("logged", "false");
      localStorage.removeItem("authToken"); // Supprimer le token de l'utilisateur
      // resetToDefault(); // Remettre le contenu par défaut
      location.reload(); // Recharger la page après déconnexion
    });
  } else {
    console.log("PAS D'AFFICHAGE INTERFACE ADMIN");
  }
}

// Fonction pour afficher la barre d'administration
function displayAdminElements() {
  // Barre du haut
  const adminBarre = document.getElementById("editionMod");
  adminBarre.style.display = "flex";

  // Bouton modifier
  const editionBouton = document.getElementById("bouton-modifier");
  editionBouton.style.display = "flex";

  // const newDiv = document.createElement("div");
  // const iconElement = document.createElement("i");
  // const titleEditionMod = document.createElement("p");

  // newDiv.className = "editionMod";
  // iconElement.className = "fa-regular fa-pen-to-square";
  // titleEditionMod.textContent = "Mode édition";

  // newDiv.appendChild(iconElement);
  // newDiv.appendChild(titleEditionMod);

  // body.insertBefore(newDiv, body.firstChild); // Insérer au début du body
}

// mettre en commentaire lorsque test est fini debut et fin ici Fonction pour changer le titre et ajouter "Modifier"
 function updateTitleWithEditButton() {
   const selectTitlePortfolio = document.querySelector("#portfolio h2");
   const newDiv = document.createElement("div");
   newDiv.className = "editionModPortfolio";
   const clonedTitle = selectTitlePortfolio.cloneNode(true);
   selectTitlePortfolio.parentNode.replaceChild(newDiv, selectTitlePortfolio);
   newDiv.appendChild(clonedTitle);

   const iconElement = createIconElement("fa-regular fa-pen-to-square");
   const textElement = document.createElement("p");
   textElement.textContent = "Modifier";
   textElement.className = "modify";

   newDiv.appendChild(iconElement);
   newDiv.appendChild(textElement);

textElement.addEventListener("click", () => {
     displayContainerModals(); // Assurez-vous que cette fonction existe
   });
 }
//fin ici

// Fonction pour créer un élément i
const createIconElement = (className) => {
  const iconElement = document.createElement("i");
  iconElement.className = className;
  return iconElement;
};

// Appel de la fonction pour charger la page
loadingPage();
