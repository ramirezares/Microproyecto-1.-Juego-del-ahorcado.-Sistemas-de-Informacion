window.onload = () => {

    //Arreglo para ir comparando
    var arrayToCompare = [];

    //Intentos
    var attempts = 6;

    //Arreglo del almacen temporal obtenido 
    let arrayOfTemp = (sessionStorage.getItem("playerN")).split(",");
 
    //Asignacion el nombre del jugador
    document.getElementById("playerNameLabel").innerText = arrayOfTemp[0];

    //Asignacion los puntos
    document.getElementById("playerPointsLabel").innerText = arrayOfTemp[1];

    //Asignacion los intentos
    document.getElementById("attempts").innerText = attempts;

    //Carga de la palabra para mostrar las casillas
    function load() {
        let word = sessionStorage.getItem("selectedWord")
        arrayToCompare = word.split("")
        document.getElementById("wordToGuess").innerHTML = createHTML(word)

    }

    //Funcion para agregar las casillas de la palabra a adivinar con signo de interrocacion
    function createHTML(word) {
        let html = ""
        for (let i = 0; i < word.length; i++) {
            html += "<div id='letter-" + i + "' class='guess'>?</div>";
        }
        return html;
    }

    //Funcion para agregar el evento a los botones de las letras
    function defineEventToAlphabetContainer() {
        var arrayOfLetters = document.querySelectorAll(".letter")

        for (let i = 0; i < arrayOfLetters.length; i++) {
            arrayOfLetters[i].addEventListener("click", function () {
                manageLetter(arrayOfLetters[i].innerText);
            })
        }
    }

    //Funcion para verificar si la letra esta en la palabra
    function matchedLetter(letter) {
        arrayToCompare.forEach((char, index) => {
            if (char === letter) {

                //Sumo puntos a los actuales del jugador
                addPoints(5)

                document.getElementById("letter-" + index).innerText = letter;
            }
        });
    }

    //Funcion para sumar puntos
    function addPoints(points) {
        document.getElementById("playerPointsLabel").innerText = parseInt(document.getElementById("playerPointsLabel").innerText) + points;
    }

    //Funcion para mostrar en al usuario la letra correcta que ingreso en la palabra 
    function manageLetter(l) {
        let letter = l;
        let index = arrayToCompare.indexOf(letter);

        if (index != -1) {
            while (index != -1) {

                matchedLetter(letter);
                arrayToCompare[index] = "0"; // Marca la letra como usada
                index = arrayToCompare.indexOf(letter);
                var bool = true;
                colorLetter(letter, bool);
            }
            verifyWin()
        }
        else {
            var bool = false;
            colorLetter(letter, bool);
            attempts--;

            //Cambio la imagen
            document.getElementById("picture").src = "images\\" + attempts + ".png";

            document.getElementById("attempts").innerHTML = attempts;
            if (attempts == 0) {
                document.getElementById("popup").style.display = "block";
                saveGame(false);
            }
        }
    }

    //Funcion para cambiar el color del boton e inhabilitarlo
    function colorLetter(l, b) {
        let element = document.getElementById(l);
        if (b) {
            element.style.backgroundColor = "green";
        } else {
            element.style.backgroundColor = "red";
        }
        element.disabled = true;
    }

    // Funcion para asignarle al boton la redireccion a la pagina de inicio con una alerta de confirmacion
    document.getElementById("buttonToLanding").addEventListener("click", function () {
        if (confirm("¿Estás seguro de que quieres volver al inicio? No se guardará tu progreso.")) {
            window.location.href = "index.html";
        }
    })

    //Funcion para agregar los eventos a los botones volver al inicio.
    function defineEventToButtonsBack() {
        var arrayOfButtons = document.querySelectorAll(".backToLanding")

        for (var i = 0; i < arrayOfButtons.length; i++) {
            arrayOfButtons[i].addEventListener("click", function () {
                window.location.href = "index.html";
            })
        }
    }

    //Funcion que verifica que el usuario adivino todas las letras
    function verifyWin() {
        let allMatched = true;
        for (let char of arrayToCompare) {
            if (char !== "0") {
                allMatched = false;
                break;
            }
        }
        if (allMatched) {
            document.getElementById("alphabetContainer").disabled = true;
            setTimeout(Win(), 3000)
            saveGame(true)
        }
    }

    //Funcion para desplegar la ventana emergente unos segundos despues que el jugador gane
    function Win() {
        document.getElementById("popup1").style.display = "block";
    }

    //Funcion para guardar los datos en el localStorage.
    function saveGame(Won) {
        let playerName = document.getElementById("playerNameLabel").innerText;
        let playerPoints = parseInt(document.getElementById("playerPointsLabel").innerText);
        let players = JSON.parse(localStorage.getItem("Players")) || {};

        if (players[playerName]) {
            players[playerName][0] += playerPoints; 
            if (Won) {
                players[playerName][1] += 1;
            }
        } else {
            players[playerName] = [playerPoints, Won ? 1 : 0];
        }

        //Ordeno los datos
        let playersArray = Object.entries(players).map(([name, [points, wins]]) => ({ name, points, wins }));

        // Ordenar primero por victorias, luego por puntos
        playersArray.sort((a, b) => b.wins - a.wins || b.points - a.points);

        let sortedPlayers = {};
        playersArray.forEach(player => {
            sortedPlayers[player.name] = [player.points, player.wins];
        });

        // Guardado en localStorage
        localStorage.setItem("Players", JSON.stringify(sortedPlayers));
    }

    load()
    defineEventToAlphabetContainer()
    defineEventToButtonsBack()
}