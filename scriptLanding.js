window.onload = () => {

    document.getElementById("buttonInitGame").addEventListener("click", function () {
        document.getElementById("popup").style.display = "block";

    })

    document.getElementById("buttonSaveName").addEventListener("click", function () {

        const playerNameHTML = document.getElementById("playerName");
        const name = playerNameHTML.value

        var playerName = name // Actualizo el nombre del jugador
        localStorage.setItem("playerN", playerName) // Lo guardo con la llave playerN
        console.log(playerName)
        window.location.href = "gamePage.html"

    })

    
}