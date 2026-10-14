const urlProjets = "https://webcraft-api.vercel.app/data/projects.json";
const urlFormations = "https://webcraft-api.vercel.app/data/courses.json";


let projets = [];
let formations = [];


const listeProjets = document.getElementById("liste-projets");

if (listeProjets) {


    const listeFormations = document.getElementById("liste-formations");



    const rechercheProjet = document.getElementById("recherche-projet");
    const technoProjet = document.getElementById("techno-projet");
    const categorieProjet = document.getElementById("categorie-projet");


    const rechercheFormation = document.getElementById("recherche-formation");
    const categorieFormation = document.getElementById("categorie-formation");
    const niveauFormation = document.getElementById("niveau-formation");
    const technoFormation = document.getElementById("techno-formation");




    const modalTitre = document.getElementById("modal-titre");
    const modalContenu = document.getElementById("modal-contenu");
    const modal =
        new bootstrap.Modal(document.getElementById("modal"));



    function remplirSelect(select, liste) {
        liste.forEach((element) => {
            select.innerHTML +=
                "<option>" + element + "</option>";
        });
    }




    function photo(nom, imageApi, texte) {
        return "<img src='images/" + nom + ".jpg' alt='" + texte + "' " +
            "onerror=\"this.onerror=null; this.src='" + imageApi + "'\">";
    }



    async function chargerProjets() {


        try {
            const reponse = await fetch(urlProjets);
            const data = await reponse.json();

            projets = data.projects;


            remplirSelect(technoProjet, data.technologies);
            remplirSelect(categorieProjet, data.categories);

            afficherProjets();

        } catch (erreur) {
            document.getElementById("erreur-projets").textContent =
                "Erreur : impossible de charger les projets.";
        }

        document.getElementById("loader-projets").style.display = "none";
    }



    function afficherProjets() {

        const recherche = rechercheProjet.value.toLowerCase();
        const techno = technoProjet.value;
        const categorie = categorieProjet.value;


        const resultat = projets.filter((projet) =>
            projet.title.toLowerCase().includes(recherche) &&
            (techno === "" || projet.technologies.includes(techno)) &&
            (categorie === "" || projet.category === categorie)
        );


        listeProjets.innerHTML = "";

        if (resultat.length === 0) {
            listeProjets.innerHTML = "<p>Aucun projet trouvé.</p>";
        }


        resultat.forEach((projet) => {
            let badges = "";

            projet.technologies.forEach((techno) => {
                badges += "<span class='badge'>" + techno + "</span>";
            });




            listeProjets.innerHTML +=
                "<div class='col-md-6 col-lg-4'>" +
                    "<article class='carte'>" +
                        photo("projet-" + projet.id, projet.image, projet.title) +
                        "<h3>" + projet.title + "</h3>" +
                        "<p>Client : " + projet.client + "</p>" +
                        "<p>Catégorie : " + projet.category + "</p>" +
                        "<p>" + badges + "</p>" +
                        "<button class='btn btn-primary' data-id='" + projet.id + "'>Voir détails</button>" +
                    "</article>" +
                "</div>";
        });
    }



    function ouvrirProjet(id) {
        const projet = projets.find((p) => p.id === id);

        let features = "";

        projet.features.forEach((feature) => {
            features += "<li>" + feature + "</li>";
        });



        modalTitre.textContent = projet.title;


        modalContenu.innerHTML =
            photo("projet-" + projet.id, projet.image, projet.title) +
            "<p class='nom-photo'>Photo : images/projet-" + projet.id + ".jpg</p>" +
            "<p><strong>Client :</strong> " + projet.client + "</p>" +
            "<p><strong>Catégorie :</strong> " + projet.category + "</p>" +
            "<p><strong>Année :</strong> " + projet.year + "</p>" +
            "<p><strong>Durée :</strong> " + projet.duration + "</p>" +
            "<p><strong>Technologies :</strong> " + projet.technologies.join(", ") + "</p>" +
            "<p>" + projet.description + "</p>" +
            "<h3>Fonctionnalités</h3>" +
            "<ul>" + features + "</ul>" +
            "<a href='" + projet.url + "' target='_blank' class='btn btn-primary'>Voir le site</a>";


        modal.show();


    }


    listeProjets.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            ouvrirProjet(Number(event.target.dataset.id));
        }
    });


    rechercheProjet.addEventListener("input", function () {
        afficherProjets();
    });



    technoProjet.addEventListener("change", function () {
        afficherProjets();
    });


    categorieProjet.addEventListener("change", function () {
        afficherProjets();
    });



    async function chargerFormations() {
        try {
            const reponse = await fetch(urlFormations);
            const data = await reponse.json();


            
            formations = data.courses;


            remplirSelect(categorieFormation, data.categories);
            remplirSelect(niveauFormation, data.levels);
            remplirSelect(technoFormation, data.technologies);



            afficherFormations();
        } catch (erreur) {
            document.getElementById("erreur-formations").textContent =
                "Erreur : impossible de charger les formations.";
        }

        document.getElementById("loader-formations").style.display = "none";


    }



    function afficherFormations() {
        const recherche = rechercheFormation.value.toLowerCase();
        const categorie = categorieFormation.value;
        const niveau = niveauFormation.value;
        const techno = technoFormation.value;




        const resultat = formations.filter((formation) =>
            formation.title.toLowerCase().includes(recherche) &&
            (categorie === "" || formation.category === categorie) &&
            (niveau === "" || formation.level === niveau) &&
            (techno === "" || formation.technologies.includes(techno))
        );


        listeFormations.innerHTML = "";




        if (resultat.length === 0) {
            listeFormations.innerHTML = "<p>Aucune formation trouvée.</p>";
        }



        resultat.forEach((formation) => {
            let badges = "";



            formation.technologies.forEach((techno) => {
                badges += "<span class='badge'>" + techno + "</span>";
            });

            let dispo = "<span class='badge disponible'>Disponible</span>";

            if (formation.available === false) {
                dispo = "<span class='badge complet'>Complet</span>";
            }





            listeFormations.innerHTML +=
                "<div class='col-md-6 col-lg-4'>" +
                    "<article class='carte'>" +
                        photo("formation-" + formation.id, formation.image, formation.title) +
                        "<h3>" + formation.title + "</h3>" +
                        "<p>Catégorie : " + formation.category + "</p>" +
                        "<p><span class='badge'>" + formation.level + "</span> " + dispo + "</p>" +
                        "<p>Durée : " + formation.duration + " - Prix : " + formation.price + " €</p>" +
                        "<p>★ " + formation.rating + " - " + formation.students + " étudiants</p>" +
                        "<p>" + badges + "</p>" +
                        "<button class='btn btn-secondary' data-id='" + formation.id + "'>Voir détails</button> " +
                        "<a href='inscription.html' class='btn btn-primary'>S'inscrire</a>" +
                    "</article>" +
                "</div>";
        });


    }




    function ouvrirFormation(id) {
        const formation = formations.find((f) => f.id === id);

        

        let modules = "";



        formation.modules.forEach((module) => {
            modules += "<li>" + module + "</li>";
        });



        modalTitre.textContent = formation.title;



        modalContenu.innerHTML =
            photo("formation-" + formation.id, formation.image, formation.title) +
            "<p class='nom-photo'>Photo : images/formation-" + formation.id + ".jpg</p>" +
            "<p><strong>Catégorie :</strong> " + formation.category + "</p>" +
            "<p><strong>Niveau :</strong> " + formation.level + "</p>" +
            "<p><strong>Formateur :</strong> " + formation.instructor + "</p>" +
            "<p><strong>Durée :</strong> " + formation.duration + "</p>" +
            "<p><strong>Prix :</strong> " + formation.price + " €</p>" +
            "<p><strong>Note :</strong> ★ " + formation.rating + " (" + formation.students + " étudiants)</p>" +
            "<p><strong>Technologies :</strong> " + formation.technologies.join(", ") + "</p>" +
            "<p>" + formation.description + "</p>" +
            "<h3>Modules</h3>" +
            "<ul>" + modules + "</ul>" +
            "<a href='inscription.html' class='btn btn-primary'>S'inscrire maintenant</a>";

        modal.show();



    }


    listeFormations.addEventListener("click", function (event) {
        if (event.target.tagName === "BUTTON") {
            ouvrirFormation(Number(event.target.dataset.id));
        }
    });




    rechercheFormation.addEventListener("input", function () {
        afficherFormations();
    });


    categorieFormation.addEventListener("change", function () {
        afficherFormations();
    })




    niveauFormation.addEventListener("change", function () {
        afficherFormations();
    });

    technoFormation.addEventListener("change", function () {
        afficherFormations();
    });



    chargerProjets();
    chargerFormations();


}




const form = document.getElementById("inscription-form");



if (form) {

    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const telephone = document.getElementById("telephone");
    const formation = document.getElementById("formation");
    const niveau = document.getElementById("niveau");
    const motivation = document.getElementById("motivation");




    async function chargerListeFormations() {
        try {
            const reponse = await fetch(urlFormations);
            const data = await reponse.json();

            data.courses.forEach((f) => {
                formation.innerHTML +=
                    "<option value='" + f.id + "'>" + f.title + "</option>";
            });
        } catch (erreur) {
            document.getElementById("erreur-formation").textContent =
                "Erreur : impossible de charger les formations.";
        }
    }

    chargerListeFormations();




    function afficherErreur(champ, message) {
        document.getElementById("erreur-" + champ.id).textContent = message;

        if (message === "") {
            champ.classList.remove("champ-erreur");
            champ.classList.add("champ-ok");
        } else {
            champ.classList.remove("champ-ok");
            champ.classList.add("champ-erreur");
        }
    }



    function verifierPrenom() {
        if (prenom.value.trim().length < 2) {
            afficherErreur(prenom, "Le prénom doit faire au moins 2 caractères.");
            return false;
        }

        afficherErreur(prenom, "");
        return true;
    }



    function verifierNom() {
        if (nom.value.trim().length < 2) {
            afficherErreur(nom, "Le nom doit faire au moins 2 caractères.");
            return false;
        }

        afficherErreur(nom, "");
        return true;
    }



    function verifierEmail() {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email.value)) {
            afficherErreur(email, "L'email n'est pas valide.");
            return false;
        }

        afficherErreur(email, "");
        return true;
    }




    function verifierTelephone() {



        const regexTel = /^\+[0-9]{8,15}$/;

        if (!regexTel.test(telephone.value)) {
            afficherErreur(telephone, "Format international demandé (ex : +33612345678).");
            return false;
        }

        afficherErreur(telephone, "");
        return true;


    }





    function verifierFormation() {
        if (formation.value === "") {
            afficherErreur(formation, "Choisissez une formation.");
            return false;
        }

        afficherErreur(formation, "");
        return true;


    }



    function verifierNiveau() {
        if (niveau.value === "") {
            afficherErreur(niveau, "Choisissez un niveau.");
            return false;
        }

        afficherErreur(niveau, "");
        return true;


    }



    function verifierMotivation() {
        if (motivation.value.trim().length < 50) {
            afficherErreur(motivation, "La motivation doit faire au moins 50 caractères.");
            return false;
        }

        afficherErreur(motivation, "");
        return true;
    }



    prenom.addEventListener("input", function () {
        verifierPrenom();
    });




    nom.addEventListener("input", function () {
        verifierNom();
    });



    email.addEventListener("input", function () {
        verifierEmail();
    });




    telephone.addEventListener("input", function () {
        verifierTelephone();
    });



    formation.addEventListener("change", function () {
        verifierFormation();
    });



    niveau.addEventListener("change", function () {
        verifierNiveau();
    });



    motivation.addEventListener("input", function () {
        verifierMotivation();
    });




    form.addEventListener("submit", function (event) {
        event.preventDefault();



        const prenomOk = verifierPrenom();
        const nomOk = verifierNom();
        const emailOk = verifierEmail();
        const telephoneOk = verifierTelephone();
        const formationOk = verifierFormation();
        const niveauOk = verifierNiveau();
        const motivationOk = verifierMotivation();



        if (
            prenomOk &&
            nomOk &&
            emailOk &&
            telephoneOk &&
            formationOk &&
            niveauOk &&
            motivationOk
        ) {
            alert("Merci " + prenom.value + ", votre inscription est envoyée !");
            form.reset();
        } else {
            alert("Il y a des erreurs dans le formulaire.");
        }


    });


    form.addEventListener("reset", function () {
        const erreurs = document.querySelectorAll(".erreur");
        const champs = document.querySelectorAll(".form-control, .form-select");



        erreurs.forEach((erreur) => {
            erreur.textContent = "";
        });


        
        champs.forEach((champ) => {
            champ.classList.remove("champ-ok", "champ-erreur");
        });
    });



}