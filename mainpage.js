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
        <div class="imagee">
            <img src="${product.image}" alt="Product Image" />
        </div>
        <div class="popForm">
            <form id="orderForm">
                <fieldset>
                    <legend>MY INFO</legend>

                    <label for="mailId">E-mail</label>
                    <input type="email" id="mailId" name="mailId" placeholder="enter your mail id" required><br>

                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name" required><br>

                    <label for="mobile_no">Mobile no</label>
                    <input type="text" id="mobile_no" name="mobile_no" placeholder="Mobile no with country code" required><br>

                    <label for="registration_no">Registration no</label>
                    <input type="number" id="registration_no" name="registration_no" placeholder="enter Your college registration number" required><br>

                    <label for="idCard">ID Card</label>
                    <input type="file" id="idCard" name="idCard" required><br>

                    <button id="placeOrder" type="submit">Place Order</button>
                    <button type="button" id="closePopup" class="close-btn">Close</button>
                </fieldset>
            </form>
        </div>
    </div>
`;

        setTimeout(() => {
            CloseForm();
            const webAppUrl = "https://script.google.com/macros/s/AKfycbzugPnBOSmnqCXiVw6y9xKBzZj3mct8uFGtWP6sPVZCf4VTGV-w4L1USgHM0wZ4YW8u/exec";
            const placeOrderBtn = document.getElementById("placeOrder");
            placeOrderBtn.addEventListener("submit", (event) => {
                event.preventDefault();
                const name = document.getElementById("name").value;
                const mobile = document.getElementById("mobile_no").value;
                const registration = document.getElementById("registration_no").value;
                const mailId = document.getElementById("mailId").value;

                const formData = new URLSearchParams();
                formData.append("EmailId", mailId);
                formData.append("name", name);
                formData.append("mobile_no", mobile);
                formData.append("registration_no", registration);
                formData.append("product_name", product.name);
                formData.append("product_name", product.price);

                fetch(webAppUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formData.toString()
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
