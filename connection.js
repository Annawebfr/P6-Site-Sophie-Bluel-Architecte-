document.addEventListener('DOMContentLoaded', function () {
document.getElementById('loginForm').addEventListener('submit', async function (event) {
      event.preventDefault();  // Empêche le rechargement de la page

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      // Vérification des champs vides avec l'attribut 'required' HTML
      if (username.trim() === '' || password.trim() === '') {
          alert('Veuillez remplir tous les champs du formulaire');
          return;  // Arrêter l'exécution de la fonction en cas de champs vides
      }

      const credentials = {
          email: username,
          password: password
      };

      const requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
      };

      try {
          const response = await fetch('http://localhost:5678/api/users/login', requestOptions);

          if (response.ok) {
              const result = await response.json();
              if (result.token) {
                  localStorage.setItem('authToken', result.token);  // Stocker le token
                  alert('Connexion réussie, redirection...');
                  window.location.href = '/index.html';  // Redirection vers la page d'accueil ou admin
              } else {
                  alert('Échec de la connexion : ' + (result.message || 'Problème inconnu.'));
              }
          } else {
              // Si la réponse n'est pas 200 OK
              const errorResult = await response.json();  // Récupérer la réponse de l'erreur
              alert('Échec de la connexion : ' + (errorResult.message || 'Identifiants incorrects.'));
          }
      } catch (error) {
          console.error('Erreur lors de la connexion :', error);
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
  });
});














/**document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', async function(event) {
      event.preventDefault();  // Empêche le rechargement de la page
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Vérification des champs vides avec l'attribut 'required' HTML
      if (username.trim() === '' || password.trim() === '') {
        alert('Veuillez remplir tous les champs du formulaire');
        return;  // Arrêter l'exécution de la fonction en cas de champs vides
      }
  
      const credentials = {
        email: username,
        password: password
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      };
  
      try {
        const response = await fetch('http://localhost:5678/api/users/login', requestOptions);
  
        if (response.ok) {
          const result = await response.json();
          if (result.token) {
            localStorage.setItem('authToken', result.token);  // Stocker le token
            alert('Connexion réussie, redirection...');
            window.location.href = '/index.html';
          } else {
            alert('Échec de la connexion : ' + (result.message || 'Problème inconnu.'));
          }
        } else {
          let errorMessage = 'Échec de la connexion.';
          const loginUrl = 'http://localhost:5678/api/users/login';
  
          const credentials = {
            email: 'sophie.bluel@test.tld',
            password: 'S0phie'
          };
  
          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
          };
  
          fetch(loginUrl, requestOptions)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Échec de la connexion');
              }
            })
            .then(data => {
              // Traitement de la réponse de l'API
              console.log(data);  // Afficher la réponse dans la console
              // Redirection vers la page d'administration ou autre action
            })

            .catch(error => {
              console.error(error);
              // Gérer l'erreur de connexion
            });
        }
      } catch (error) {
        console.error(error)
        // Gérer l'erreur de connexion
      }
    });
  });**/