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
    console.error(
      "Erreur lors de la récupération des catégories :",
      error.message
    );
  }
}

// Fonction pour charger la page au chargement initial
function loadingPage() {
  displayGalleryProjets();
  displayCategorysButtons().then(() => {
    filterCategorys();
  });
}

loadingPage();

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
  console.log("loadingPage executed");
  const categorys = await getCategorys();
  if (categorys) {
    categorys.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.id = category.id;
      filters.appendChild(btn);
    });
  }
}

// Fonction pour que le bouton fonctionne
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

//Smooth scrool
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  });
});

//Si utilisateur connecté :
//Affichage et déconnexion via Logout
async function displayAdminInterface() {
  document.addEventListener("DOMContentLoaded", function () {
    const logged = window.sessionStorage.getItem("logged");

    if (logged === "true") {
      displayAdminTopBar();
      updateTitleWithEditButton();
      filters.style.display = "none";
      header.style.margin = "100px 0px 50px 0px";

      loginLink.textContent = "Logout";

      loginLink.addEventListener("click", () => {
        window.sessionStorage.setItem("logged", "false");
      });
    } else {
      console.log("L'utilisateur n'est pas connecté");
    }
  });
}

// Fonction pour afficher la barre du haut du mode administrateur
function displayAdminTopBar() {
  const newDiv = document.createElement("div");
  const iconElement = document.createElement("i");
  const titleEditionMod = document.createElement("p");

  newDiv.className = "editionMod";
  iconElement.className = "fa-regular fa-pen-to-square";
  titleEditionMod.textContent = "Mode édition";

  newDiv.appendChild(iconElement);
  newDiv.appendChild(titleEditionMod);

  // Ajout de la nouvelle div au début de body
  body.insertBefore(newDiv, body.firstChild);
}

// Fonction pour changer mon titre Mes projets et ajouter le "Modifier"
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
    displayContainerModals();
  });
}
displayAdminInterface();

// Fonction pour créer un élément i avec une classe donnée
const createIconElement = (className) => {
  const iconElement = document.createElement("i");
  iconElement.className = className;
  return iconElement;
};






// URL de base de ton API (ajuste si nécessaire)
/**const apiBaseUrl = 'http://localhost:5678/api-docs/works';

// Fonction pour générer les filtres et afficher les projets
function generateFiltersAndProjects() {
  // Récupérer les catégories depuis l'API
  fetch(`${apiBaseUrl}/categories`)
    .then(response => response.json())
    .then(categories => {
      const filtersContainer = document.querySelector('.filtres');
      const gallery = document.getElementById('galerie');

      // Fonction pour afficher les travaux dans la galerie
      function displayWorks(works) {
        gallery.innerHTML = ''; // Vider la galerie avant de la remplir

        works.forEach(work => {
          const workContainer = document.createElement('div');
          workContainer.classList.add('work-item'); // Classe pour styliser chaque travail

          const image = document.createElement('img');
          image.src = work.imageUrl;
          image.alt = work.title;

          const title = document.createElement('h3');
          title.textContent = work.title;

          // Ajouter l'image et le titre dans le conteneur du travail
          workContainer.appendChild(image);
          workContainer.appendChild(title);

          // Ajouter le conteneur du travail dans la galerie
          gallery.appendChild(workContainer);
        });
      }

      // Récupérer tous les travaux au chargement de la page
      function fetchAllWorks() {
        fetch(`${apiBaseUrl}/works`)
          .then(response => response.json())
          .then(allWorks => {
            displayWorks(allWorks); // Afficher tous les travaux
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des travaux :', error);
          });
      }

      // Afficher tous les travaux au chargement de la page
      fetchAllWorks();

      // Créer dynamiquement les boutons pour chaque catégorie
      categories.forEach(category => {
        const filterButton = document.createElement('a');
        filterButton.classList.add('clic');
        filterButton.href = '#';
        filterButton.textContent = category.name; // Nom de la catégorie
        filterButton.setAttribute('data-category', category.id); // ID de la catégorie

        // Ajouter un événement de clic pour filtrer les travaux par catégorie
        filterButton.addEventListener('click', (e) => {
          e.preventDefault(); // Empêcher le comportement par défaut du lien

          const selectedCategoryId = category.id;

          // Récupérer les travaux filtrés par catégorie
          fetch(`${apiBaseUrl}/works`)
            .then(response => response.json())
            .then(allWorks => {
              const filteredWorks = allWorks.filter(work => work.categoryId === selectedCategoryId);
              displayWorks(filteredWorks); // Afficher les travaux filtrés
            })
            .catch(error => {
              console.error('Erreur lors de la récupération des travaux par catégorie :', error);
            });
        });

        // Ajouter le bouton à la liste des filtres
        filtersContainer.appendChild(filterButton);
      });

      // Ajouter un événement de clic au bouton "Tous" pour afficher tous les travaux
      const allButton = document.querySelector('.filtres .tous');
      allButton.addEventListener('click', (e) => {
        e.preventDefault();
        fetchAllWorks(); // Afficher tous les travaux
      });

    })
    .catch(error => {
      console.error('Erreur lors de la récupération des catégories :', error);
    });
}

// Appeler la fonction pour générer les filtres et afficher les travaux
generateFiltersAndProjects();**/
