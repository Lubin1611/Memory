// We start with all our variables, they will be used in our functions.

var motifCartes = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
var startCarte = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var cartesRetournees = [];
var nbPairetrouvees = 0;
var temp;
var affCarte;
var nbTentatives = 0;

var seconds = document.getElementById("seconds");
var minutes = document.getElementById("minutes");
var testSec = 0;
var testMin = 1;
var time;
var perdu = document.createElement("div");
var recommencer = document.createElement("button");
var gagne = document.createElement("div");
var tableauScore = document.createElement("button");

// Then, for the first part of our code, we set the timer for 1 mn.

var chrono = function () {

    time = setTimeout(chrono, 1000);


    if (testSec < 0) {

        testSec = 60;
        testMin--;
    }

    else if (testMin == 0 && testSec == 0) {

        clearTimeout(time);

        document.getElementById("plateau_jeu").style.display = "none"; // once the time is up, we hide the cards, so the user cannot use them anymore.

        messagePerdu(); // and we display a game over message.

        recommencer.onclick = raZ; // dynamically, a button "recommencer" is shown.
        recommencer.innerHTML = "Recommencer ?";
        recommencer.id = "placerRec";
        document.getElementById("container_jeu").appendChild(recommencer);

    }

    minutes.innerHTML = testMin + " minutes ";
    seconds.innerHTML = testSec-- + "" + " sec";


};

function jouer() {

    document.getElementById("plateau_jeu").style.display = "block";
    document.getElementById("commencer").disabled = true;
    chrono();

}


function messagePerdu() {

    perdu.innerHTML = "Echec critique";
    perdu.style.marginTop = "2%";
    perdu.style.marginLeft = "41%";
    perdu.style.fontSize = "4vw";
    perdu.style.fontFamily = "enchanted";
    document.getElementById("container_jeu").appendChild(perdu);

}

// Here, we collect all the elements identified as "img", we are looping through them and give them an onclick feature.
// We also give them a "affCarte" property to our pictures. This property we've created will be used for our "majAffichage" function
// and controleJeu.

var imgCarte = document.getElementsByTagName("img");

for (var i = 0; i < imgCarte.length; i++) {

    imgCarte[i].affCarte = i;

    imgCarte[i].onclick = function () {

        controleJeu(this.affCarte);


    }
}

// With our shuflecards function, we use an algorithm to randomize our array, and precisely duplicate our cards, so we have no errors.

shuflecards();

function shuflecards() {

    for (var i = motifCartes.length - 1; i >= 1; i--) {

        var random = Math.floor(Math.random() * (i + 1));

        temp = motifCartes[i];

        motifCartes[i] = motifCartes[random];

        motifCartes[random] = temp;

    }
}

console.log(motifCartes);

// Then, we manage the design of our memory game, and we'll use a switch, in witch we declare 3 possible states.
// Our function displays the three possible states for the user.

function majAffichage(affCarte) {
    switch (startCarte[affCarte]) { // the affCarte parameter represents each cards.
        case 0:
            imgCarte[affCarte].src = "dosdecarte.jpg"; // case 0 is used for the beginning of our game, and in case if our selected pair of cards does not correspond.
            break;
        case 1:
            imgCarte[affCarte].src = "carte" + motifCartes[affCarte] + ".png"; // case 1 is used when 1 pair is revealed.
            break;
        case -1:
            imgCarte[affCarte].style.visibility = "visible"; // finally, case -1 is used to indicate that the selected pair strictly corresponds.
            break;

    }
}



function controleJeu(affCarte) {

    // The goal of our "controleJeu" function is to determine if there are at least 2 clicked cards so we can compare them.

    if (cartesRetournees.length < 2) { // this condition checks if one card is returned, and then, push it to an "carteRetournees" array.

        if (startCarte[affCarte] == 0) {

            startCarte[affCarte] = 1;

            cartesRetournees.push(affCarte);

            majAffichage(affCarte);

        }
    }

    // Once we have at least 1 card returned, we will declare a new condition to check if the second selected card corresponds, or not, with the first card.

    if (cartesRetournees.length == 2) {


        var changeface = 0; // we declare a variable, who will be useful to determine in which state the pair of cards will be.

        if (motifCartes[cartesRetournees[0]] == motifCartes[cartesRetournees[1]]) { // the selected pair matches so,

            changeface = -1; // -1 refers to our case -1 in our switch. So the user understands that the selected pair is good.
            nbPairetrouvees++; // we tell the program that this was a successful try, and count it in our "foundpairs" variable.
            console.log(nbPairetrouvees);

        }

        startCarte[cartesRetournees[0]] = changeface;
        startCarte[cartesRetournees[1]] = changeface;

        nbTentatives++; // we are incrementing a "nbTentatives" counter, so we will display the number of tries in our "container_score" screen.

        console.log(nbTentatives);

        setTimeout(function () {

            majAffichage(cartesRetournees[0]);
            majAffichage(cartesRetournees[1]);

            cartesRetournees = [];
            console.log(cartesRetournees);

            if (nbPairetrouvees == 6) { // If our successful tries hits the number of 6, the game is finished and the user can restart if he wants.

                clearTimeout(time);

                document.getElementById("plateau_jeu").style.display = "none";

                bravogagne();

                tableauScore.onclick = score;
                tableauScore.id = "boutonTab";
                tableauScore.innerHTML = "Voir les scores";
                document.body.appendChild(tableauScore);

                document.getElementById("boutonTab").style.display = "block";
            }
        }, 750);
    }
}


function bravogagne() {

    gagne.innerHTML = "C'est gagné, bravo !";
    gagne.style.marginTop = "2%";
    gagne.style.marginLeft = "41%";
    gagne.style.fontSize = "4vw";
    gagne.style.fontFamily = "enchanted";
    document.getElementById("container_jeu").appendChild(gagne);

}


function score() {

    document.getElementById("boutonTab").style.display = "none";
    document.getElementById("container_jeu").style.display = "none";
    document.getElementById("container_scores").style.display = "block";

    document.getElementById("contenuScore").innerHTML += "Vous avez réussi en " + nbTentatives + " tentatives, a " + testMin + " : " + testSec +
        " secondes de la fin." + "<br><br>";

    // With our score function, we keep an history of all the successful attemtps of the user.
}

function raZ() {

    document.getElementById("container_jeu").removeChild(perdu);
    document.getElementById("container_jeu").removeChild(recommencer);

    document.getElementById("container_scores").style.display = "none";
    document.getElementById("container_jeu").style.display = "block";

    motifCartes = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    startCarte = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    nbPairetrouvees = 0;
    nbTentatives = 0;
    testSec = 0;
    testMin = 1;

    for (var i = 0; i < imgCarte.length; i++) {

        imgCarte[i].src = "dosdecarte.jpg";

        imgCarte[i].affCarte = i; // Ajout de la propriété affCarte à l'objet img

        imgCarte[i].onclick = function () {

            controleJeu(this.affCarte);

        }
    }

    shuflecards();

    majAffichage(affCarte);

    controleJeu(affCarte);

    jouer();

}

function nouvellePartie() {

   // document.getElementById("container_jeu").removeChild(tableauScore);
    document.getElementById("container_jeu").removeChild(gagne);
    document.getElementById("container_scores").style.display = "none";
    document.getElementById("container_jeu").style.display = "block";

    motifCartes = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
    startCarte = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    nbPairetrouvees = 0;
    nbTentatives = 0;
    testSec = 0;
    testMin = 1;

    for (var i = 0; i < imgCarte.length; i++) {

        imgCarte[i].src = "dosdecarte.jpg";

        imgCarte[i].affCarte = i; // Ajout de la propriété affCarte à l'objet img

        imgCarte[i].onclick = function () {

            controleJeu(this.affCarte);

        }
    }

    shuflecards();

    majAffichage(affCarte);

    controleJeu(affCarte);

    jouer();

}


