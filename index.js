// URL de base de ton API (ajuste si nécessaire)
const apiBaseUrl = 'http://localhost:5678/api-docs/categories';

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
generateFiltersAndProjects();
