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
        e.preventDefault();
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
    alert(`Please fill the form to place the order!`);
    popup.innerHTML = `
    <div class="popup-card">
            <div class= "popForm">
                <form>
                    <fieldset>
                        <legend>MY INFO</legend>
                        <lable for="name">Name</lable>
                        <input type="text" id="name" name="name"><br>
                        <lable for="mobile_no">Mobile no</lable>
                        <input type="tel" name="mobile_no"><br>
                        <lable for ="idCard" id = "idCard">id card</lable>
                        <input type="file" name = "idCard" required><br>
                        <lable for="registration_no">Registration no</lable>
                        <input for="registration_no" type="number"></input>
                    </fieldset>
                </form> 
            </div>
            <button id="buyNow">Buy Now</button>
            <button id="closePopup" class="close-btn">close</button>
        </div>
    `
    // next target adding form on click.
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










// pop form 
