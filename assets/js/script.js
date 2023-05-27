document.addEventListener("DOMContentLoaded", function() {
    const contents = document.querySelectorAll(".content");

    contents.forEach(content => {
        const range = content.querySelector(".range");
        const characterInfo = content.querySelector(".character-info");

        content.addEventListener("mouseenter", function() {
            const rangeText = range.textContent;

            fetchCharacters(rangeText)
                .then(characters => {
                    characterInfo.innerHTML = ""; // Limpiamos el contenido anterior
                    characters.forEach(character => {
                        const characterBlock = document.createElement("div");
                        characterBlock.classList.add("character-block");

                        const characterTitle = document.createElement("h2");
                        characterTitle.innerText = character.name;

                        const characterDetails = document.createElement("div");
                        characterDetails.classList.add("character-details");

                        const characterHeight = document.createElement("p");
                        characterHeight.innerText = `Estatura: ${character.height} cm`;

                        const characterWeight = document.createElement("p");
                        characterWeight.innerText = `Peso: ${character.mass} kg`;

                        characterDetails.appendChild(characterHeight);
                        characterDetails.appendChild(characterWeight);

                        characterBlock.appendChild(characterTitle);
                        characterBlock.appendChild(characterDetails);

                        characterInfo.appendChild(characterBlock);
                    });
                })
                .catch(error => {
                    console.log("Error:", error);
                });
        });

        content.addEventListener("mouseover", function() {
            const tooltip = document.createElement("div");
            tooltip.classList.add("tooltip");

            switch (range.classList[1]) {
                case "red":
                    tooltip.style.backgroundColor = "white";
                    tooltip.style.color = "black";
                    tooltip.innerText = "En esta sección... Encontrarás información sobre los personajes más populares de las películas.";
                    break;
                case "green":
                    tooltip.style.backgroundColor = "white";
                    tooltip.style.color = "black";
                    tooltip.innerText = "En esta sección... Encontrarás información sobre personajes secundarios importantes.";
                    break;
                case "blue":
                    tooltip.style.backgroundColor = "white";
                    tooltip.style.color = "black";
                    tooltip.innerText = "En esta sección... Encontrarás otros personajes significativos.";
                    break;
            }

            content.appendChild(tooltip);
        });

        content.addEventListener("mouseout", function() {
            const tooltip = content.querySelector(".tooltip");
            tooltip.remove();
        });
    });

    function fetchCharacters(range) {
        const [start, end] = range.split(" - ");
        const urls = [];

        for (let i = parseInt(start); i <= parseInt(end); i++) {
            urls.push(`https://swapi.dev/api/people/${i}`);
        }

        const requests = urls.map(url => fetch(url).then(response => response.json()));

        return Promise.all(requests);
    }
});