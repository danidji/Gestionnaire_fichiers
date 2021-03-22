
import { filesList, typeFile } from "./filesList.js";

let files = document.querySelector(".files");
let selectedCount = document.querySelector(".selected-count");
let addFile = document.querySelector(".add_file");
let form = document.querySelector(".form");


let count = 0;

function selectedItems(e) {

    if (!e.currentTarget.classList.contains("selected")) {
        e.currentTarget.classList.add("selected");
        count++;
    } else {
        e.currentTarget.classList.remove("selected");
        count--;
    }

    if (count > 0) {
        if (count === 1) {
            selectedCount.textContent = `1 fichier selectionné`;
        } else {
            selectedCount.textContent = `${count} fichiers selectionnés`;
        }
    } else {
        selectedCount.textContent = "Aucune sélection";
    }


}

function addNewFile() {

    //Création du formulaire d'ajout d'un nouveau fichier
    let formContent = "";
    formContent += `<label for="nameFile"> Nom du fichier </label>`;
    formContent += `<input type="text" name="nameFile" id="nameFile">`;
    formContent += `<label for="typeList"> Choisir le type de fichier </label>`;
    formContent += `<select name="typeList" id="typeList">`

    for (let i = 0; i < typeFile.length; i++) {
        formContent += `<option value="${typeFile[i]}">${typeFile[i]}</option>`;
    }
    formContent += `</select>`;
    formContent += `<input class="check" type="submit" value="Valider">`;

    form.innerHTML = formContent;

    form.style.display = "block";
    //Ajout de la saisie dans le tableau d'objet filesList
    let checkForm = document.querySelector(".check");

    function createNewFile(e) {
        e.preventDefault();

        let inputText = document.querySelector("#nameFile");
        let selectType = document.querySelector("#typeList");

        //Si il n'y a pas de valeur dans l'input text, on ne fait rien lors de la validation
        if (inputText.value !== "") {
            //création et ajout d'un nouveau fichier dans le tableau d'objet filesList
            let newFile = {};
            newFile.nom = inputText.value;
            newFile.type = selectType.value;

            filesList.push(newFile);

            form.style.display = "none";

            //Affichage du nouveau fichier dans le gestionnaire
            let txt = "";
            let newLi = document.createElement("li");

            txt += getIconType(newFile.type)

            txt += `${newFile.nom}`;
            txt += `<i class="fas fa-pen edit" data-index=${filesList.length} ></i>`

            newLi.innerHTML += txt;
            files.appendChild(newLi);
            newLi.addEventListener("click", selectedItems);
        } else {
            form.style.display = "none";
        }
    }
    checkForm.addEventListener("click", createNewFile);
}

function getIconType(type) {
    let txt = "";

    switch (type) {
        case "code":
            txt += `<i class="far fa-file-code icon"></i>`;
            break;
        case "music":
            txt += `<i class="far fa-file-audio icon"></i>`;
            break;
        case "image":
            txt += `<i class="far fa-file-image icon"></i>`;
            break;
        case "pdf":
            txt += `<i class="far fa-file-pdf icon"></i>`;
            break;
        default:
            break;
    }
    return txt;
}

function renameFile(e) {
    let newName = window.prompt("Tapez votre nouveau nom : ");
    // remplacer le nom du fichier sur lequel on a cliqué par le newName => utiliser l'attribut data-* 

    filesList[e.currentTarget.dataset.index].nom = newName;

    console.table(filesList);
    refresh();

}

//Créer la fonction de suppression d'un fichier 

// affichage des documents 
function refresh() {

    let content = "";
    filesList.forEach((element, i) => {

        content += `<li class="list">`
        content += getIconType(element.type);
        content += `${element.nom}`;
        content += `<i class="fas fa-pen edit" data-index=${i} ></i>`;
        // content += `<i class="fas fa-trash delete"></i>`;
        content += `</li>`

    })
    files.innerHTML = content;
}

/***************
 * Main 
 * 
*/

refresh();

//Attribution d'un écouteur d'évènement sur la liste des "li"
let list = document.querySelectorAll(".list");
list.forEach(element => {
    element.addEventListener('click', selectedItems)
})

//Appelle de la fonction d'ajout lorsque l'on clique sur l'encadré d'ajout
addFile.addEventListener('click', addNewFile);

//Gestion du renommage du fichier 
let editButton = document.querySelectorAll(".edit");

editButton.forEach(element => {
    element.addEventListener("click", renameFile);
})

