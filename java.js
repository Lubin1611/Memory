var repCartes = ["carte1", "carte2", "carte3", "carte4", "carte5", "carte6", "carte7", "carte8", "carte9", "carte10"];



var nback = document.getElementById("dosDecarte1");

function change1 () {

   nback.id = repCartes[0];

   verifCarte();

}



var nback2 = document.getElementById("dosDecarte2");

function change2 () {

   nback2.id = repCartes[1];

   verifCarte();

    }

function verifCarte () {

    if (nback.id == repCartes[0] && nback2.id == repCartes[1]) {

        alert("trouvé");

        nback.style.display = "none";
        nback2.style.display = "none";

    }

}

