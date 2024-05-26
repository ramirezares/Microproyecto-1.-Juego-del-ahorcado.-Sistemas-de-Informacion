window.onload = () => {

    const words = {
        A: ["araña", "año", "arco", "alambre", "almidon"],
        B: ["burro", "barro", "banco", "baron", "blanco"],
        C: ["carro", "camion", "casa", "celeste", "cantar"],
        D: ["dado", "delfin", "dinosaurio", "dardo", "diez"],
        E: ["elefante", "estribo", "estaca", "España", "escoba"],
        F: ["Francia", "fosforo", "faraon", "felino", "fantasma"],
        G: ["gato", "gimnasia", "gris", "ganso", "gancho"],
        H: ["hilo", "helio", "huevo", "harina", "hormiga"],
        I: ["iglesia", "institucion", "invitacion", "interno", "isla"],
        J: ["jaula", "Jamaica", "jarron", "juntar", "jinete"],
        K: ["koala", "kiosco", "karma", "kerosene", "kilo"] ,
        L: ["ladrar", "ladron", "lagarto", "lila", "largo"],
        M: ["mano", "malo", "manso", "marron", "millon"],
        N: ["naranja", "negro", "ninguno", "nube", "nariz"],
        Ñ: ["ñuzco", "ñu", "ñudoso", "ñacunda", "ñanduti"] ,
        O: ["obrero", "orfebreria", "oso", "oscuro", "octavo"],
        P: ["purpura", "pera", "piso", "pantalla", "pulso"],
        Q: ["querer", "quemar", "quedar", "queso"],
        R: ["raton", "rosa", "rama", "rito", "rodar"],
        S: ["salmon", "saltar", "soltar", "silbar", "sol"] ,
        T: ["tirar", "tratar", "timar", "tocar", "tomar"],
        U: ["uva", "uña", "ultra", "unir", "unico"],
        V: ["velar", "vela", "volver", "ver", "vigilar"],
        W: ["Washington", "watts", "waffle", "whisky", "walkman"] ,
        X: ["xilofono", "xenofobia", "xilografia", "xiloprotector", "xerofito"] ,
        Y: ["Yodo", "yoyo", "yacia", "yaga", "yegua"],
        Z: ["zapato", "zapatilla", "zorro", "zarza", "zarpar"],
        }
        
    var playerNameString = ""
    var selectedWord = ""

    //Le coloco al boton el evento al hacer click
    document.getElementById("buttonInitGame").addEventListener("click", function () {
        document.getElementById("popup").style.display = "block";

    })

    function getRandomWord() {
        // Obtener todas las letras del objeto
        const letters = Object.keys(words);
    
        // Seleccionar una letra aleatoriamente
        const letter = letters[Math.floor(Math.random() * letters.length)];
    
        // Obtener la lista de palabras que empiezan con esa letra
        const possibleWords = words[letter];
    
        // Seleccionar una palabra aleatoria de la lista
        const chosenWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    
        return chosenWord;
    }

    //Le coloco al boton el evento al hacer click
    document.getElementById("buttonSaveName").addEventListener("click", function () {

        //Obtengo el nombre que ingreso el jugador
        const playerNameHTML = document.getElementById("playerName");
        const name = playerNameHTML.value;

        playerNameString = name; // Actualizo el nombre del jugador para guardarlo
        
        selectedWord = getRandomWord();

        var arr = []
        arr.push(playerNameString)
        arr.push("0")

        //Guardo el nombre y coloco que lleva 0 puntos
        sessionStorage.setItem("playerN",arr)
        sessionStorage.setItem("selectedWord",selectedWord)

        window.location.href = "gamePage.html"
    })

    // Función para cargar la tabla de jugadores del localStorage
    function loadPlayersTable() {
        let players = JSON.parse(localStorage.getItem("Players")) || {};
        let tbody = document.getElementById("bodyPlayersTable");

        // Limpiar el contenido previo del tbody
        tbody.innerHTML = "";

        // Iterar sobre cada jugador en el objeto players y agregar una fila a la tabla
        for (let playerName in players) {
            let playerData = players[playerName];
            let playerPoints = playerData[0];
            let playerWins = playerData[1];

            // Crear una nueva fila
            let row = document.createElement("tr");

            // Crear y agregar las celdas a la fila
            let nameCell = document.createElement("td");
            nameCell.innerText = playerName;
            row.appendChild(nameCell);

            let pointsCell = document.createElement("td");
            pointsCell.innerText = playerPoints;
            row.appendChild(pointsCell);

            let winsCell = document.createElement("td");
            winsCell.innerText = playerWins;
            row.appendChild(winsCell);

            // Agregar la fila al tbody
            tbody.appendChild(row);
        }
    }
    loadPlayersTable()
}