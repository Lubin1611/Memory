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

var chrono = function () {

    time = setTimeout(chrono, 1000);


    if (testSec < 0) {

        testSec = 60;
        testMin--;
    }

    else if (testMin == 0 && testSec == 0) {

        alert("Le jeu est fini, vous avez perdu");
        clearTimeout(time);
        var recommencer = document.createElement("button");
        recommencer.onclick = raZ;
        recommencer.innerHTML = "Recommencer ?";
        recommencer.id = "placerRec";
        document.getElementById("container_jeu").appendChild(recommencer);

    }

    minutes.innerHTML = testMin + " minutes ";
    seconds.innerHTML = testSec-- + "" + " sec";


};

chrono();

var imgCarte = document.getElementsByTagName("img");

for (var i = 0; i < imgCarte.length; i++) {

    imgCarte[i].affCarte = i; // Ajout de la propriété affCarte à l'objet img

    imgCarte[i].onclick = function () {

        controleJeu(this.affCarte);

    }
}

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


function majAffichage(affCarte) {
    switch (startCarte[affCarte]) {
        case 0:
            imgCarte[affCarte].src = "dosdecarte.jpg";
            break;
        case 1:
            imgCarte[affCarte].src = "carte" + motifCartes[affCarte] + ".png";
            break;
        case -1:
            imgCarte[affCarte].style.visibility = "visible";
            break;

    }
}

function controleJeu(affCarte) {

    if (cartesRetournees.length < 2) {

        if (startCarte[affCarte] == 0) {

            startCarte[affCarte] = 1;

            cartesRetournees.push(affCarte);

            majAffichage(affCarte);


        }
    }

    if (cartesRetournees.length == 2) {


        var changeface = 0;

        if (motifCartes[cartesRetournees[0]] == motifCartes[cartesRetournees[1]]) {

            changeface = -1;
            nbPairetrouvees++;
            console.log(nbPairetrouvees);

        }

        startCarte[cartesRetournees[0]] = changeface;
        startCarte[cartesRetournees[1]] = changeface;

        nbTentatives++;

        console.log(nbTentatives);

        setTimeout(function () {

            majAffichage(cartesRetournees[0]);
            majAffichage(cartesRetournees[1]);

            cartesRetournees = [];
            console.log(cartesRetournees);

            if (nbPairetrouvees == 1) {

                clearTimeout(time);
                alert("Bravo, vous avez trouvé toutes les paires ! Appuyez sur le bouton Suivant pour voir le score");
                var tableauScore = document.createElement("button");
                tableauScore.onclick = score;
                tableauScore.id = "boutonTab";
                tableauScore.innerHTML = "Voir les scores";
                document.body.appendChild(tableauScore);

            }
        }, 1000);
    }
}

function score() {

    document.getElementById("container_jeu").style.display = "none";
    document.getElementById("boutonTab").style.display = "none";
    document.getElementById("container_scores").style.display = "block";

    document.getElementById("contenuScore").innerHTML = "Vous avez réussi en " + nbTentatives + " tentatives, a " + testMin + " : " + testSec +
        " secondes de la fin.";

}
function raZ() {

    window.location.reload();

}




