fetch('https://f51072e0231f4015a5d5aaa359f3dfa2.api.mockbin.io/')
    .then(response => response.json())
    .then(data => {
        const serviceCards = document.getElementById('service-cards');

        // Loop through each service in the JSON data
        data.services.forEach(service => {
            // Create a card
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');

            // Update Dom
            service.items_for_sale.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.classList.add('card', 'mb-3');

                itemCard.innerHTML = `
                    <img src="${item.image}" class="card-img-top" alt="${item.item}">
                    <div class="card-body">
                        <h5 class="card-title">${item.item}</h5>
                        <p class="card-text">${item.description}</p>
                        <p class="card-text"><strong>Price:</strong> ${item.price}</p>
                        <button class="btn btn-primary buy-btn">Buy</button>
                        <button class="btn btn-secondary request-quote-btn">Request Quote</button>
                    </div>
                `;

                card.appendChild(itemCard);
            });

            serviceCards.appendChild(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
