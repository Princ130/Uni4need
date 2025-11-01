function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `product-${encodeURIComponent(product.name)}`;

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
    function toggleNavigator() {
        const nav = document.getElementById('navigator');
        const tg = document.getElementById("navigatorSwitch");
        const overlay = document.getElementById("overlay");
        nav.classList.toggle('square');
        overlay.classList.toggle("square")
        // Change button text based on state
        if(nav.classList.contains('square')) {
            tg.innerText = "*-*!";
        } else {
            tg.innerHTML = "<strong>Just exploring <br> (^-^)</strong>";
        }
    }
    const ffg = document.getElementById('product-container');
    products.forEach(product => {
        const card = createProductCard(product)
        ffg.appendChild(card)
    });

    const popup = document.getElementById("popup");
    const popupImage = document.getElementById("popupImage");
    const popupName = document.getElementById("popupName");
    const popupPrice = document.getElementById("popupPrice");
    const popupCategory = document.getElementById("popupCategory");
    const closeBtn = document.getElementById("closePopup");
    const buyNowBtn = document.getElementById("buyNow");
    let ssc = null;

    function highlightCard(productName) {
        const cardId = `product-${encodeURIComponent(productName)}`;
        const cardEl = document.getElementById(cardId);
        if (cardEl) {
            // Scroll into view
            cardEl.scrollIntoView({ behavior: "smooth", block: "center" });

            // Add highlight effect
            cardEl.classList.add("highlight");

            // Remove highlight after 4 seconds
            setTimeout(() => {
                cardEl.classList.remove("highlight");
            }, 4000);
        }
    }

    function openPopup(product) {
        ssc = product;
        popupImage.src = product.image;
        popupName.textContent = product.name;
        popupPrice.textContent = `Price: ₹${product.price}`;
        popupCategory.textContent = `Category: ${product.category}`;
        popup.style.display = "flex";
        
    }


    function CloseForm() {
        // Close product details popup
        const closeProductPopup = document.querySelector("#popup .close-btn") ;
        const closeFormPopup = document.querySelector("#Formal .close-btn");
        if (closeProductPopup ) {
            closeProductPopup.addEventListener("click", () => {
                popup.style.display = "none"
                ssc = null;
            });
        }

        // Close order form popup
        if (closeFormPopup) {
            closeFormPopup.addEventListener("click", () => {
                Formal.style.display = "none";
            });
        }
    }
    CloseForm()

    buyNowBtn.addEventListener("click", () => {
    alert(`Please fill the form to place the order!`);
    Formal.style.display = "flex";
    

        setTimeout(() => {
            CloseForm();
            const alpha = "https://script.google.com/macros/s/AKfycbzugPnBOSmnqCXiVw6y9xKBzZj3mct8uFGtWP6sPVZCf4VTGV-w4L1USgHM0wZ4YW8u/exec";
            const orderForm = document.getElementById("orderForm");
            orderForm.onsubmit = (event) => {
                event.preventDefault();
                const placeOrder = document.getElementById("placeOrder");
                const name = document.getElementById("name").value;
                const mobile = document.getElementById("mobile_no").value;
                const registration = document.getElementById("registration_no").value;
                const mailId = document.getElementById("mailId").value;
                if (placeOrder) {
                    placeOrder.disabled = true;
                    placeOrder.textContent = "Placing Order...";
                }

                const formData = new URLSearchParams();
                formData.append("mailId", mailId);
                formData.append("name", name);
                formData.append("mobile_no", mobile);
                formData.append("registration_no", registration);
                formData.append("product_name", ssc.name);
                formData.append("product_price", ssc.price);

                fetch(alpha, {
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
                Formal.style.display="none";
                })
                .catch(err => {
                alert("Error placing order");
                console.error("Fetch error:", err);
                })

                .finally(() => {
                    // Re-enable the button after request completes
                    if (placeOrder) {
                        placeOrder.disabled = false;
                        placeOrder.textContent = "Place Order";
                    }
                });            
            };
        }, 100);
    });
    // the function call is important since form won't close without it
    CloseForm();

    
const shareBtn = document.getElementById("shareProduct");
if (shareBtn) {
    shareBtn.addEventListener("click", () => {
        if (!ssc) {
            alert("No product selected to share.");
            return;
        }

        const shareUrl = `${window.location.origin}${window.location.pathname}#product-${encodeURIComponent(ssc.name)}`;

        navigator.clipboard.writeText(shareUrl)
            .then(() => {
                alert("✅ Product link copied to clipboard!\nPaste it anywhere to share.");
            })
            .catch((err) => {
                console.error("Copy failed:", err);
                alert("❌ Failed to copy the link. Please try again.");
            });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash;
    if (hash.startsWith("#product-")) {
        const productName = decodeURIComponent(hash.replace("#product-", ""));
        const matchedProduct = products.find(p => p.name === productName);

        if (matchedProduct) {
            highlightCard(matchedProduct.name);
            openPopup(matchedProduct);
        }
    }
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





// problem


// Pengind placing order animation