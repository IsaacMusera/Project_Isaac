fetch('https://e810edd3c3f449878162350611d4a905.api.mockbin.io/')
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



function validateContactForm() {
  // Get form elements
  const nameInput = document.querySelector('.contact-form input[type="text"]');
  const emailInput = document.querySelector('.contact-form input[type="email"]');
  const messageInput = document.querySelector('.contact-form textarea');

  // Get error message elements
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Reset error messages
  nameError.textContent = '';
  emailError.textContent = '';
  messageError.textContent = '';

  let isValid = true;

  // Validate name
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Please enter your name.';
    isValid = false;
  }

  // Validate email
  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Please enter your email.';
    isValid = false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  // Validate message
  if (messageInput.value.trim() === '') {
    messageError.textContent = 'Please enter your message.';
    isValid = false;
  }

  return isValid;
}

// Helper function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Event listener for form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  // Validate form
  if (validateContactForm()) {
    console.log('Form is valid. Submitting...');
  } else {
    console.log('Form is invalid. Please check the fields.');
  }
});
