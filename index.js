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
          const image = document.createElement('img');
          image.src = work.imageUrl;
          image.alt = work.title;
          gallery.appendChild(image);
        });
      }

      // Récupérer tous les travaux au chargement de la page
      function fetchAllWorks() {
        fetch(`${apiBaseUrl}/works`)  // Récupérer tous les travaux
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
        filterButton.textContent = category.name; // Afficher le nom de la catégorie
        filterButton.setAttribute('data-category', category.id); // Utiliser l'ID de la catégorie pour le filtrage

        // Ajouter un événement de clic pour filtrer les travaux par catégorie
        filterButton.addEventListener('click', (e) => {
          e.preventDefault(); // Empêcher le comportement par défaut du lien

          const selectedCategoryId = category.id;

          // Récupérer les travaux filtrés par catégorie
          fetch(`${apiBaseUrl}/works`)  // Récupérer tous les travaux
            .then(response => response.json())
            .then(allWorks => {
              // Filtrer les travaux par la catégorie sélectionnée
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






// Récupérer les projets et les afficher dans la galerie
/**fetch('http://localhost:5678/api-docs/Works')
  .then(response => response.json())
  .then(data => {
    const projects = data.projects;
    const gallery = document.getElementById('galerie');
    let allProjects = []; // Stocker tous les projets pour un filtrage ultérieur

    // Fonction pour afficher les projets dans la galerie
    function displayProjects(filteredProjects) {
      gallery.innerHTML = ''; // Vider la galerie avant de la remplir
      filteredProjects.forEach(project => {
        const image = document.createElement('img');
        image.src = project.imageUrl;
        image.alt = project.title;
        gallery.appendChild(image);
      });
    }

    // Afficher tous les projets initialement
    allProjects = projects;
    displayProjects(allProjects);

    // Ajouter des écouteurs d'événements sur les filtres
    const filters = document.querySelectorAll('.filtres a');
    filters.forEach(filter => {
      filter.addEventListener('click', (e) => {
        e.preventDefault(); // Empêcher le comportement par défaut du lien

        const category = filter.getAttribute('data-category');

        // Filtrer les projets selon la catégorie sélectionnée
        if (category === 'all') {
          displayProjects(allProjects); // Afficher tous les projets
        } else {
          const filteredProjects = allProjects.filter(project => project.category === category);
          displayProjects(filteredProjects); // Afficher seulement les projets filtrés
        }
      });
    });
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors de la récupération des projets :', error);
  });**/
