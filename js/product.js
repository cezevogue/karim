import { appleCard } from "./module.mjs";

/**
 * @summary MenuHamburger
 */


import { menuburger } from "./menuHamburger.mjs";

    let menu = document.querySelector(".menu");
    let spanTop = document.querySelector("#top");
    let spanMiddle = document.querySelector("#middle");
    let spanBottom = document.querySelector("#bottom");
    let links = document.querySelector(".links");

    menu.addEventListener("click", function () {
        menuburger(menu, spanTop, spanMiddle, spanBottom, links);
    });


/**
*@summary recuperer l'id de la page 
 */
document.addEventListener('DOMContentLoaded', function () {
   
    const productId = window.location.pathname.split('/').pop();

    const productDetails = getProductDetails(productId);

 
    renderProductDetails(productDetails);
});

// Fonction pour récupérer les détails du produit en fonction de l'id
function getProductDetails(productId) {
    return appleCard.find(product => product.id == productId);
}


/**
 * @summary Affiche le produit avec ses details
 * @param {*} product 
 * @returns array
 */

function renderProductDetails(product) {
    const container = document.getElementById('product-details-container');
    const productDetailText = document.createElement('div');
    productDetailText.classList.add('product-detail-text')

    const divBackButton = document.getElementById('btn-back');
    divBackButton.classList.add('div-btn-back')

const backButton = document.createElement('button');
backButton.textContent = 'Retour à l\'accueil';
backButton.classList.add('btn-back');

backButton.addEventListener('click',function(){
    window.location.href = 'http://localhost:8000/';
})
divBackButton.append(backButton);


    if (!product) {
        container.innerHTML = '<p>Produit non trouvé</p>';
        return;
    }

    const productContainer = document.createElement('div');
    productContainer.classList.add('product-image');

    let img = document.createElement('img');
    img.src = product.image;
    img.alt = product.texte;
    productContainer.appendChild(img);


    let text = document.createElement('h3');
    text.textContent = product.texte;
    text.classList.add('texte');
    productDetailText.appendChild(text);

    let prix = document.createElement('h3');
    prix.textContent = product.prix + ' $';
    prix.classList.add('prix');
    productDetailText.appendChild(prix);

    let category = document.createElement('h3');
    category.textContent = 'Category: ' + product.category;
    productDetailText.appendChild(category);

    let btn = document.createElement('input');
    btn.classList.add('btn-fiche-product');
    btn.type = 'button';
    btn.value = 'Ajouter au panier';
    btn.addEventListener('click', function(){
        addToCart(product);
    })
    productDetailText.append(btn);

    let description1 = document.createElement('p');
    description1.textContent = 'Description 1: ' + product.description1;
    productDetailText.appendChild(description1);


    let description2 = document.createElement('p');
    description2.textContent = 'Description 2: ' + product.description2;
    productDetailText.appendChild(description2);


    let description3 = document.createElement('p');
    description3.textContent = 'Description 3: ' + product.description1;
    productDetailText.appendChild(description3);

    let description4 = document.createElement('p');
    description4.textContent = 'Description 4: ' + product.description2;
    productDetailText.appendChild(description4);


    container.appendChild(productContainer);
    container.append(productDetailText);
}





/**
 * @summary ajouter au panier
 */


document.addEventListener('DOMContentLoaded', function () {
   
    paniers = JSON.parse(localStorage.getItem('paniers')) || [];

    const cart = document.querySelector('.cart');
    cart.addEventListener('click', function () {
        menuPanier(paniers);
    });

    updateCard();
});

let paniers = [];


function addToCart(product) {
    paniers = JSON.parse(localStorage.getItem('paniers')) || [];
    paniers.push(product);
    updateCard(paniers);
    saveToLocalStorage('paniers', paniers);
}


/**
*@summary evenement au click pour le panier
 */

const cart = document.querySelector('.cart');
cart.addEventListener('click', function () {
    menuPanier(paniers);
});


document.addEventListener('DOMContentLoaded', function () {
    
    paniers = JSON.parse(localStorage.getItem('paniers')) || [];

});


function menuPanier(paniers) {
    if (paniers.length === 0) {
        popup();
    } else {
        updateCard();
    }
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
*@summary afficher le panier avec les produits
 */

function updateCard() {
    const container = document.createElement('div');
    container.classList.add('containerPanierVide');

    const divTout = document.createElement('div');
    divTout.classList.add('product');

    let button = document.createElement('input');
    button.value = 'Passer à l\'étape suivante';
    button.type = 'button';
    button.classList.add('btnPanier');
    divTout.append(button);

    const close = document.createElement('button');
    close.textContent = 'X';
    close.addEventListener('click', function () {
        container.style.display = 'none';
    });
    divTout.append(close);

    const productsMap = new Map();

    paniers.forEach(function (el) {
        if (productsMap.has(el.id)) {
            const existingProduct = productsMap.get(el.id);
            existingProduct.quantity += 1;
        } else {
            productsMap.set(el.id, { ...el, quantity: 1 });
        }
    });

    productsMap.forEach(function (el) {
        let productContainer = document.createElement('div');
        productContainer.classList.add('productContainer');

        let img = document.createElement('img');
        img.src = el.image;
        img.alt = el.texte;
        productContainer.appendChild(img);

        let name = document.createElement('p');
        name.textContent = `${el.texte} x ${el.quantity}`;
        productContainer.appendChild(name);

        let quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = el.quantity;
        quantityInput.style.width = '40px';

        quantityInput.addEventListener('input', function () {
            const newQuantity = parseInt(quantityInput.value);

            if (newQuantity === 0) {
                productsMap.delete(el.id);
                productContainer.remove();
            } else {
                el.quantity = newQuantity;
                name.textContent = `${el.texte} x ${el.quantity}`;
                prix.textContent = `${el.prix * el.quantity} $`; 
            }
        });

        productContainer.appendChild(quantityInput);

        let prix = document.createElement('p');
        prix.textContent = `${el.prix * el.quantity} $`;
        productContainer.appendChild(prix);

        divTout.appendChild(productContainer);
    });

    container.append(divTout);
    document.body.append(container);
}




/**
 * @summary Afficher et creer un Popup si panier est vide
 */
function popup() {
    const container = document.createElement('div');
    container.classList.add('containerPanierVide');

    const divTout = document.createElement('div');
    divTout.classList.add('divTout');

    const close = document.createElement('button');
    close.textContent = 'X';
    close.addEventListener('click', function() {
        document.body.removeChild(container);
    });
    divTout.append(close);

    const paragraphe = document.createElement('p');
    paragraphe.textContent = 'Votre Panier est tristement vide';
    divTout.append(paragraphe);

    const imagePanierVide = document.createElement('img');
    imagePanierVide.src = 'img/sad.jpg';
    divTout.append(imagePanierVide);

    const btn = document.createElement('input');
    btn.classList.add('btnPanierVide');
    btn.type = 'button';
    btn.value = 'Voir tous nos articles';
    divTout.append(btn);

    container.append(divTout);
    document.body.append(container);
}
