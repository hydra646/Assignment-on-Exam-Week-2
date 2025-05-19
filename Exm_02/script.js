// script.js
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const successMessage = document.getElementById('successMessage');
    const savedDataContainer = document.getElementById('savedData');

    // Mobile Navigation Toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
    });

    // Form Validation
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Invalid email format.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        if (isValid) {
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            };

            localStorage.setItem('contactFormData', JSON.stringify(formData));
            successMessage.style.display = 'block';
            contactForm.reset();

            // Optionally display saved data
            const savedData = localStorage.getItem('contactFormData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                savedDataContainer.textContent = `Saved Data - Name: ${parsedData.name}, Email: ${parsedData.email}, Message: ${parsedData.message}`;
                savedDataContainer.style.display = 'block';
                setTimeout(() => {
                    savedDataContainer.style.display = 'none';
                }, 5000); // Hide after 5 seconds
            } else {
                savedDataContainer.style.display = 'none';
            }

            // Hide success message after a few seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
});