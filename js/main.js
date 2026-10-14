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
    
}