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
 * @summary Afficher les produits
 * @param {Array} cards 
*  @returns void
 */

let card = document.createElement('div');
let container = document.querySelector('.container');


function renderCards(cards) {
    container.innerHTML = '';

    for (let i = 0; i < cards.length; i++) {
        let optionApple = cards[i];
       

        let card = document.createElement('article');
        card.classList.add('card');

        card.addEventListener('dblclick',function(){
            window.location.href = 'view/product.html/' + optionApple.id;
        })


        let img = document.createElement('img');
        img.classList.add('img');
        img.src = optionApple.image;
        card.appendChild(img);

        let text = document.createElement('p');
        text.textContent = optionApple.texte;
        text.classList.add('texte');
        card.appendChild(text);



        let prix = document.createElement('p');
        prix.textContent = optionApple.prix + ' $';
        prix.classList.add('prix');
        card.appendChild(prix);

        let btn = document.createElement('input');
        btn.classList.add('btn');
        btn.type = 'button';
        btn.value = 'Ajouter au panier';
        btn.addEventListener('click', function(){
            addToCart(optionApple);
        })
        card.appendChild(btn);

        container.appendChild(card);
    }
}



/**
*@summary Trier par categorie 
 */
let categoryFilter = document.getElementById('categoryFilter')

categoryFilter.addEventListener('change',function()
{
    const selectedCategory = categoryFilter.value;
 
    const filteredCards = (selectedCategory === 'all') ? appleCard : appleCard.filter(product => product.category === selectedCategory);
    
    renderCards(filteredCards);

})
renderCards(appleCard);




/**
*@summary Filtrer par prix min et max
 */

let inputMin = document.querySelector('#min');
let inputMax = document.querySelector('#max');

inputMin.addEventListener('input',filterProduitPrix);
inputMax.addEventListener('input',filterProduitPrix);


function  filterProduitPrix(){
    const min = parseFloat(inputMin.value) || 0;
    const max = parseFloat(inputMax.value) || Number.POSITIVE_INFINITY

 const filterProduit = appleCard.filter(el =>{
        return(
            (categoryFilter.value === 'all' || el.category === categoryFilter.value)
             && el.prix >= min && el.prix <= max
            );
    });
    renderCards(filterProduit);

    if(filterProduit.length === 0)
    {
       afficheMessageVide();
    }
};
/**
 * à@summary si le produit n'est pas trouver entre les prix min et max affiche un msm
 */

function afficheMessageVide()
{
    const message = document.createElement('p');
    message.textContent = 'Aucun produits trouver ne correspondent a votre recherche';
    message.classList.add('message');
    container.append(message);
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
