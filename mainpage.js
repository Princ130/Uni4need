// tbl prime goal backend api to place orders


function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
                <div class="card_cover"></div>
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


    function CloseForm() {
        const closeBtn = document.getElementById("closePopup"); // get the CURRENT one
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                popup.style.display = "none";
            });
        }
    }
    CloseForm()

    buyNowBtn.addEventListener("click", () => {
    alert(`Please fill the form to place the order!`);

    popup.innerHTML = `
        <div class="popup-card">
            <div class="popForm">
                <form>
                    <fieldset>
                        <legend>MY INFO</legend>

                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required><br>

                        <label for="mobile_no">Mobile no</label>
                        <input type="tel" id="mobile_no" name="mobile_no" required><br>

                        <label for="idCard">ID Card</label>
                        <input type="file" id="idCard" name="idCard" required><br>

                        <label for="registration_no">Registration no</label>
                        <input type="number" id="registration_no" name="registration_no"><br>
                    </fieldset>
                </form>
            </div>
            <button id="placeOrder">Place Order</button>
            <button id="closePopup" class="close-btn">Close</button>
        </div>
    `;

        setTimeout(() => {
            CloseForm();
            const webAppUrl = "https://script.google.com/macros/s/AKfycbzugPnBOSmnqCXiVw6y9xKBzZj3mct8uFGtWP6sPVZCf4VTGV-w4L1USgHM0wZ4YW8u/exec";
            const placeOrderBtn = document.getElementById("placeOrder");
            placeOrderBtn.addEventListener("click", () => {
                const name = document.getElementById("name").value;
                const mobile = document.getElementById("mobile_no").value;
                const registration = document.getElementById("registration_no").value;

                const formData = new URLSearchParams();
                formData.append("name", name);
                formData.append("mobile_no", mobile);
                formData.append("registration_no", registration);

                fetch(webAppUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: new URLSearchParams({
                    name: name,
                    mobile_no: mobile,
                    registration_no: registration
                }).toString()
                })
                .then(res => res.text())
                .then(response => {
                alert("Success: " + response);
                console.log("Google Sheets Response:", response);
                })
                .catch(err => {
                alert("Error placing order");
                console.error("Fetch error:", err);
                });
            });
        }, 100);
    });
    // the function call is important since form won't close without it
    CloseForm();





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
