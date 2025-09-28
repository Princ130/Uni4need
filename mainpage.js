function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
            <div class="card_cover"></div></a>
            <div class="imagee"><img src="${product.image}" alt="Product Image"></div>
            <div class="detail">
                <div class="Name">${product.name}</div>
                <div class="mrp">${product.price}</div>
            </div>
           
    `;

    card.querySelector(".card_cover").addEventListener("click", (e) => {
        e.preventDefault(); // prevent <a href="#"> from jumping
        openPopup(product);
    });

    return card;
}

const ffg = document.getElementById('product-container');
products.forEach(product => {
    const card = createProductCard(product)
    ffg.appendChild(card)
});



// another approach when we click on the card  cover a 
// popup card with all the details a buy button and a back button apprares on that card.
// Get popup DOM elements
const popup = document.getElementById("popup");
const popupImage = document.getElementById("popupImage");
const popupName = document.getElementById("popupName");
const popupPrice = document.getElementById("popupPrice");
const popupCategory = document.getElementById("popupCategory");
const closeBtn = document.getElementById("closePopup");
const buyNowBtn = document.getElementById("buyNow");

function openPopup(product) {
    popupImage.src = product.image;
    popupName.textContent = product.name;
    popupPrice.textContent = `Price: ₹${product.price}`;
    popupCategory.textContent = `Category: ${product.category}`;

    popup.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

buyNowBtn.addEventListener("click", () => {
    alert(`Buying ${popupName.textContent}!`);
});



// addForm.addEventListener("submit",function (event){
//     event.preventDefault();
//     const name = document.getElementById("name").value;
//     const price = document.getElementById("price").value;
//     const category = document.getElementById("category").value;
//     const image = document.getElementById("image").value;

//     const newPro = {
//         name : name,
//         price : price,
//         category: category,
//         image : image,
//     };

//     products.push(newPro);
// })

