//Fonction pour l'affichage de l'erreur
function displayErrorAddWorks(message) {
	// Créez un élément div pour afficher le message d'erreur
	const errorDiv = document.createElement("div");
	errorDiv.className = "error-message";
	errorDiv.textContent = message;

	// Insérez le message d'erreur avant le bouton de soumission
	const submitButton = document.querySelector("#formAddWorks .button");
	formAddWorks.insertBefore(errorDiv, submitButton);
}
// Fonction pour ajouter une nouvelle image dans la modale "Ajout d'Image", pour ajouter dans la BDD
function addWorks() {
	formAddWorks.addEventListener("submit", async (e) => {
		e.preventDefault();

		// Récupération des valeurs du formulaire
		const formData = new FormData();
		const projectTitle = title.value;
		const projectImage = inputFile.files[0];
		const categoryValue = categoryInput.value; //Chaque option dans le select doit avoir comme valeur le category ID

		labelFile.style.border = "";
		labelFile.style.color = "";
		title.style.border = "";
		categoryInput.style.border = "";

		const oldError = document.querySelector(".error-message");
		if (oldError) {
			oldError.remove();
		}

		// Vérifiez si les champs du formulaire sont vides
		if (inputFile.value === "") {
			// Si aucun fichier n'est sélectionné, changez la bordure en rouge
			labelFile.style.border = "2px solid red";
			labelFile.style.color = "red";
			displayErrorAddWorks("Merci d'intégrer une image");
			return; // Arrêtez l'exécution de la fonction ici
		}

 // Vérification de la taille du fichier ne doit passer 4 Mo
 if (projectImage.size > 4 * 1024 * 1024) { // 4 Mo
	labelFile.style.border = "2px solid red";
	labelFile.style.color = "red";
	displayErrorAddWorks("L'image ne doit pas dépasser 4 Mo");
	return;
}

// Vérification du type MIME du fichier
if (!projectImage.type.startsWith("image/")) {
	labelFile.style.border = "2px solid red";
	labelFile.style.color = "red";
	displayErrorAddWorks("Le fichier doit être une image");
	return;
}

		if (projectTitle === "") {
			title.style.border = "2px solid red";
			displayErrorAddWorks("Merci d'intégrer un Titre et un catégorie");
			return;
		}

		if (categoryValue === "") {
			categoryInput.style.border = "2px solid red";
			displayErrorAddWorks("Merci d'intégrer une Catégorie");
			return;
		}

		formData.append("title", projectTitle);
		formData.append("category", categoryValue);
		formData.append("image", projectImage);

		try {
			const response = await postFetch(apiUrlWorks, formData);

			if (response.ok) {
				const data = await response.json();
				console.log("Fichier envoyé avec succès :", data);

				// Actualiser la galerie et les works
				displayModalGallery();
				displayGalleryProjets();
			} else {
				throw new Error("Erreur lors de l'envoi du fichier");
			}
		} catch (error) {
			console.error("Erreur lors de l'ajout de l'image :", error.message);
		} finally {
			//Réinitialiser tout
			resetPreviewImg();
			formAddWorks.reset();
			console.log
			containerModalGallery.style.display = "flex";
			containerModalAddWorks.style.display = "none";
		}
	});
}
addWorks();

// Fonction de suppression de l'image en utilisant l'ID
async function deleteWorks(id) {
	const deleteUrl = `http://localhost:5678/api/works/${id}`;

 // Afficher une confirmation avant de supprimer
 const confirmation = confirm("Êtes-vous sûr de vouloir supprimer l'image ?");
 if (!confirmation) {
	 // Si l'utilisateur clique sur "Annuler", on quitte la fonction
	 return;
 }
 
	try {
		const response = await deleteFetch(deleteUrl);
		if (response.ok) {
			await displayModalGallery();
			await displayGalleryProjets();
		}
	} catch (error) {
		console.error("Erreur lors de la suppression de l'image :", error.message);
	}
}