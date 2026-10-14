# WebCraft Solutions - Portail projets et formations

Site front-end de l'agence WebCraft Solutions, fait en HTML, CSS et JavaScript, avec Bootstrap.
Il affiche les projets clients et les formations de l'agence à partir de 2 API, et propose un formulaire d'inscription aux formations.

---

## Lancer le projet

1. Dézipper le dossier `E1_ANONYME`.
2. Ouvrir `index.html` dans un navigateur (Chrome, Firefox, Edge...).
3. Il faut **une connexion internet** : les données viennent des API, et Bootstrap est chargé par un CDN.

Pas d'installation, pas de serveur, pas de `npm`.

---

## Structure des fichiers

```
E1_ANONYME/
├── index.html          page d'accueil : projets + formations
├── inscription.html    formulaire d'inscription
├── README.md           ce fichier
├── css/
│   └── style.css       tout le style du site
├── js/
│   └── main.js         tout le JavaScript (les 2 pages)
├── images/
│   ├── logo.png        logo du header
│   └── favicon.png     icône de l'onglet
└── W3C/                captures de la validation W3C
```

---

## Technologies

| Techno | Utilisation |
|---|---|
| HTML5 | structure des pages, balises sémantiques (`header`, `nav`, `main`, `section`, `footer`, `fieldset`) |
| CSS3 | variables CSS, animations `@keyframes`, media query, navbar collée en haut |
| JavaScript (ES6+) | `fetch`, `async/await`, `try/catch`, `const/let`, fonctions fléchées, `filter`, `forEach`, `find` |
| Bootstrap 5.3 (CDN) | grille responsive, menu burger, fenêtre modal |

Aucun framework JavaScript (pas de React, Vue...).

---

## API utilisées

| API | URL | Contenu |
|---|---|---|
| API 1 - Projets | https://webcraft-api.vercel.app/data/projects.json | projets clients, technologies, catégories |
| API 2 - Formations | https://webcraft-api.vercel.app/data/courses.json | formations, catégories, niveaux, technologies |

Chaque API est appelée **une seule fois** au chargement de la page. Les données sont gardées dans un tableau, et les filtres travaillent sur ce tableau.

---

## Fonctionnalités

### Page d'accueil (`index.html`)

- **Header** avec logo et menu. Le menu reste collé en haut quand on descend, et devient un bouton ☰ sur mobile.
- **Hero** avec un titre animé (il apparaît en montant).
- **Nos projets** (API 1) :
  - recherche par titre en temps réel ;
  - filtre par technologie ;
  - filtre par catégorie ;
  - les filtres se combinent entre eux.
- **Nos formations** (API 2) :
  - recherche par titre en temps réel ;
  - filtres par catégorie, niveau et technologie, combinables ;
  - badge « Disponible » (vert) ou « Complet » (rouge).
- **Cartes** avec image, infos, badges et un bouton « Voir détails ».
- **Modal de détails** : elle se ferme avec la croix ×, un clic en dehors ou la touche Échap.
- **Loader** (un rond qui tourne) pendant le chargement des API.
- **Message d'erreur** si une API ne répond pas. L'autre section continue de marcher.
- **Footer** avec liens et copyright.

### Page inscription (`inscription.html`)

Formulaire avec validation **en temps réel** (à chaque frappe) :

| Champ | Règle |
|---|---|
| Prénom | obligatoire, 2 caractères minimum |
| Nom | obligatoire, 2 caractères minimum |
| Email | obligatoire, format email valide |
| Téléphone | obligatoire, format international (ex : `+33612345678`) |
| Formation | obligatoire, liste remplie avec l'API 2 |
| Niveau | obligatoire |
| Motivation | obligatoire, 50 caractères minimum |
| Entreprise, Expérience | optionnels |

- Le message d'erreur s'affiche sous le champ, avec une bordure rouge. Si le champ est bon, la bordure devient verte.
- À l'envoi : si tout est bon, un message de succès s'affiche et le formulaire est vidé. Sinon, toutes les erreurs s'affichent.
- Le bouton « Réinitialiser » vide aussi les messages et les couleurs.

---

## Changer le logo et les photos

- **Logo** : remplacer `images/logo.png` par une autre image PNG avec le même nom.
- **Icône de l'onglet** : remplacer `images/favicon.png`.
- **Photos des cartes** : ajouter des images dans `images/` avec ces noms :
  - `projet-1.jpg` à `projet-8.jpg` ;
  - `formation-1.jpg` à `formation-10.jpg`.

  Si une photo n'existe pas, c'est l'image de l'API qui s'affiche. Le nom exact de la photo est écrit dans la modal « Voir détails ».

---

## Responsive

Le site est fait en **mobile-first** :
- le CSS de base est pour le mobile ;
- `@media (min-width: 768px)` ajoute le style pour tablette et ordinateur ;
- la grille Bootstrap (`col-md-*`) met les cartes et les filtres l'un sous l'autre sur mobile, et côte à côte sur grand écran.

---

## Accessibilité

- Un seul `h1` par page, puis des `h2` et `h3` dans l'ordre.
- Un `label` relié à chaque champ (`for` / `id`).
- Un texte `alt` sur toutes les images.
- Des `aria-label` sur les boutons sans texte (menu, fermeture de la modal).
- La modal se ferme au clavier avec Échap.
- Le texte est bien contrasté (jaune et blanc sur fond noir).

---

## Validation W3C

Les 2 pages HTML et le CSS passent le validateur du W3C sans erreur.
Les captures sont dans le dossier `W3C/`.
