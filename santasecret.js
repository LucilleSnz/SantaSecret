let names = [];
let shuffledNames = [];
let currentIndex = 0;
let mixNames = [];
let hasEnded = false; 


// Fonction pour ajouter un prénom à la liste
function addName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();

    if (!name) {
        alert("Veuillez entrer un prénom !");
        return;
    }

// Vérifier si le prénom existe déjà
    if (names.includes(name)) {
        alert("Ce prénom est déjà ajouté !");
        return;
    }

// Ajouter le prénom à la liste
    names.push(name);
    updateNamesList();
    nameInput.value = '';

// Activer le bouton "Lancer le Père Noël Secret" si au moins 2 prénoms
    if (names.length >= 2) {
        document.getElementById('generateButton').disabled = false;
    }
}


// Mettre à jour la liste des prénoms
function updateNamesList() {
    const namesList = document.getElementById('namesList');
    namesList.innerHTML = ''; // Efface la liste existante

    names.forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        namesList.appendChild(li);
    });
}



// Mélanger les prénoms en s'assurant qu'aucun prénom ne se suit
function mixAndVerify() {
    const array = [...names];
    let isValid = false;

    while (!isValid) {
// Mélanger les prénoms
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

// Vérifier que les prénoms ne se suivent pas et que personne ne donne à son voisin
        isValid = true;
        for (let i = 0; i < array.length; i++) {
            const giver = array[i];
            const receiver = array[(i + 1) % array.length];

// Si une personne donne à elle-même ou à son voisin immédiat, remélanger
            if (giver === receiver || giver === array[(i + array.length - 1) % array.length]) {
                isValid = false;
                break;
            }
        }
    }
    mixNames = array;
}



// Fonction pour lancer le Père Noël Secret
function startSecretSanta() {
    if (names.length < 2) {
        alert("Vous devez ajouter au moins 2 prénoms pour lancer le Père Noël secret.");
        return;
    }

    mixAndVerify(); // Lancer le tirage au sort

// Afficher résultats et masquer les autres parties
    document.getElementById('secretSantaResult').style.display = 'block';
    document.getElementById('generateButton').disabled = true; // Désactiver le bouton après le lancement
    hasEnded = false; // Réinitialiser l'état de fin

// Afficher la première personne (initier la chaîne)
    currentIndex = 0; // Réinitialiser l'index
    document.getElementById('currentGiver').textContent = mixNames[currentIndex];
    document.getElementById('receiverName').textContent = "???"; // Masquer le prénom de la personne qui reçoit
}



// Fonction pour révéler le prénom du receveur
function revealReceiver() {
    if (hasEnded) {
        return; // Si le jeu est terminé, on ne fait rien
    }

    const giverIndex = currentIndex;

// Assurer que la personne à qui on offre n'est pas la suivante dans la chaîne
    let receiverIndex = (giverIndex + 1) % mixNames.length;

// Si le receveur est le prochain donneur, choisir une autre personne
    if (receiverIndex === (giverIndex + 1) % mixNames.length) {
        receiverIndex = (giverIndex + 2) % mixNames.length;
    }

    const receiver = mixNames[receiverIndex];

    document.getElementById('receiverName').textContent = receiver;
}



// Fonction pour passer à la personne suivante
function nextPerson() {
    if (hasEnded) {
        return; // Si le jeu est terminé, on ne fait rien
    }

    currentIndex++;

// Vérifier si toutes les personnes sont passées
    if (currentIndex >= mixNames.length) {
        endSecretSanta(); // Fin du tirage
    } else {
        const nextGiver = mixNames[currentIndex];
        document.getElementById('currentGiver').textContent = nextGiver;
        document.getElementById('receiverName').textContent = "?"; // Masquer le prénom suivant
    }
}



// Fonction pour terminer le tirage
function endSecretSanta() {
    hasEnded = true;
    alert("Le tirage du Père Noël Secret est terminé !");
    document.getElementById('currentGiver').textContent = "Tirage terminé";
    document.getElementById('receiverName').textContent = "";
}



// Fonction de réinitialisation du jeu
function resetSecretSanta() {
    names = [];
    mixNames = [];
    currentIndex = 0;
    hasEnded = false;
    document.getElementById('namesList').innerHTML = '';
    document.getElementById('secretSantaResult').style.display = 'none';
    document.getElementById('generateButton').disabled = true;
}