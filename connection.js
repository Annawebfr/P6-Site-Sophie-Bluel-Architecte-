document.addEventListener('DOMContentLoaded', function () {
    // Écouteur pour la soumission du formulaire
    document.getElementById('loginForm').addEventListener('submit', async function (event) {
        event.preventDefault();  // Empêche le rechargement de la page

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Vérification des champs vides
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
                    /** alert('Connexion réussie, redirection...');**/
                    window.location.href = '/index.html';  // Redirection vers la page d'accueil ou admin
                } 
               /** else {
                    alert('Échec de la connexion : ' + (result.message || 'Problème inconnu.'));
                }**/
            } 
           /** else {
                const errorResult = await response.json();  // Récupérer la réponse de l'erreur
                alert('Échec de la connexion : ' + (errorResult.message || 'Identifiants incorrects.'));
            }**/

                else {
                    const errorResult = await response.json(); // Récupérer la réponse de l'erreur
                    const errorMessage = 'Échec de la connexion : ' + (errorResult.message || 'Identifiants incorrects.');
                    
                    // Afficher l'erreur dans l'élément avec la classe errorMessage
                    const errorElement = document.querySelector('.errorMessage');
                    errorElement.textContent = errorMessage; // Mettre à jour le contenu du message
                    errorElement.style.color = 'red'; // Ajouter un style pour le rendre visible
                }


        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    });
});