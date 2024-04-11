fetch('https://a07a71a56a924cb584355f24439a7f9b.api.mockbin.io/')
  .then(response => response.json())
  .then(data => {
    const serviceCards = document.getElementById('service-cards');
    const serviceModal = new bootstrap.Modal(document.getElementById('serviceModal'));

    // Loop through each service in the JSON data
    data.services.forEach(service => {
      // Create a card
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');

      // Update Dom
      card.innerHTML = `
        <div class="card">
          <img src="${service.image}" class="card-img-top" alt="${service.name}">
          <div class="card-body">
            <h5 class="card-title">${service.name}</h5>
            <p class="card-text">${service.description}</p>
            <p class="card-text"><strong>Pricing:</strong> ${service.pricing}</p>
            <div class="items-for-sale">
              ${service.items_for_sale.map(item => `
                <div class="item">
                <img src="${service.image}" class="card-img-top" alt="${service.name}">
                <div class="item-details">
                    <h6 class="item-name">${item.item}</h6>
                    <p class="item-description">${item.description}</p>
                    <p class="item-price"><strong>Price:</strong> ${item.price}</p>
                    <button class="btn btn-primary buy-btn">Buy</button>
                    <button class="btn btn-secondary request-quote-btn">Request Quote</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      // Add event listener to service card
      card.addEventListener('click', () => {
        serviceModal.show();
        // You can add logic here to populate the modal with service details
      });

      serviceCards.appendChild(card);
    });

    // Form Handling and validating Form
    const serviceForm = document.getElementById('serviceForm');
    serviceForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateForm()) {
        const formData = new FormData(serviceForm);
        const name = formData.get('name');
        const email = formData.get('email');
        console.log('Name:', name);
        console.log('Email:', email);
        serviceModal.hide();
      }
    });

    // Form validation function
    function validateForm() {
      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');

      if (nameInput.value.trim() === '') {
        alert('Please enter your name.');
        return false;
      }
      if (emailInput.value.trim() === '') {
        alert('Please enter your email.');
        return false;
      }
      return true;
    }
  })
  .catch(error => console.error('Error fetching data:', error));
