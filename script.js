function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('mobile-menu');
    const menuButton = event.target.closest('button');
    const menuContent = event.target.closest('#mobile-menu');
    
    if (!menu.classList.contains('hidden') && !menuButton && !menuContent) {
        menu.classList.add('hidden');
    }
});

// Close mobile menu when screen is resized above mobile breakpoint
window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) { // md breakpoint
        const menu = document.getElementById('mobile-menu');
        menu.classList.add('hidden');
    }
});

// Toggle expandable sections
function toggleSection(sectionId, buttonId) {
    const content = document.getElementById(sectionId);
    const button = document.getElementById(buttonId);
    content.classList.toggle('expanded');
    
    if (content.classList.contains('expanded')) {
        button.textContent = 'Show Less';
    } else {
        button.textContent = 'Learn More';
    }
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Modal handling
function showModal(message) {
    const modal = document.getElementById('thank-you-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('thank-you-modal');
    modal.classList.remove('show');
}

// Testimonials modal handling
function showTestimonialsModal() {
    const modal = document.getElementById('testimonials-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeTestimonialsModal() {
    const modal = document.getElementById('testimonials-modal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

// Form submission
document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        parent_name: this.parent_name.value,
        email: this.email.value,
        phone: this.phone.value,
        question: this.question.value,
        lead_type: 'parent',
        affiliate_id: 'UNKNOWN'
    };

    try {
        // TODO: Replace with actual API endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showModal('Thank you for your message. I will get back to you as soon as possible!');
            this.reset();
        } else {
            throw new Error('Failed to submit form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showModal('Sorry, there was an error submitting your message. Please try again later.');
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('thank-you-modal');
    if (event.target === modal) {
        closeModal();
    }
});