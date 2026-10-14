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


}