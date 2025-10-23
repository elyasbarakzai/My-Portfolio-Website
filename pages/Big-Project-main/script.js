// Enhanced Navigation and UI Improvements
document.addEventListener('DOMContentLoaded', function() {
  
  // Handle navigation logo click - scroll to top
  var navLogo = document.getElementById("navLogo");
  if (navLogo) {
    navLogo.addEventListener("click", function (e) {
      e.preventDefault();
      document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Handle navigation links with smooth scrolling (except sign up)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Don't scroll for sign up button - it opens modal instead
      if (this.classList.contains('sign-up')) {
        return; // Let the modal handler take care of this
      }
      
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Navigation highlighting removed - header links stay normal

  // Add fade-in animation for sections on scroll
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe all sections for fade-in effect
  sections.forEach(section => {
    observer.observe(section);
  });

  // Add hover effects for cards and buttons
  const cards = document.querySelectorAll('.collection-card, .artist-card, .category-card, .nft-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add loading animation for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
      console.log('Image loaded:', this.src);
    });
    
    img.addEventListener('error', function() {
      console.error('Image failed to load:', this.src);
    });
    
    // Set initial opacity for loading effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  });

  // Add button click animations
  const buttons = document.querySelectorAll('button, .sign-up, .marketplace, .rankings, .connect-a-wallet');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add parallax effect for hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add typing animation for main headline
  const headline = document.querySelector('.discover-digital-art');
  if (headline) {
    const text = headline.textContent;
    headline.textContent = '';
    headline.style.borderRight = '2px solid #a259ff';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        headline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        headline.style.borderRight = 'none';
      }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
  }

  // Add counter animation for statistics
  const counters = document.querySelectorAll('.k, .k1, .k2');
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = target.textContent.replace(/[^\d]/g, '');
        const suffix = target.textContent.replace(/[\d]/g, '');
        
        let current = 0;
        const increment = finalValue / 50;
        
        const updateCounter = () => {
          if (current < finalValue) {
            current += increment;
            target.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = finalValue + suffix;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(target);
      }
    });
  });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Add smooth reveal animation for NFT cards
  const nftCards = document.querySelectorAll('.nft-card, .collection-card');
  nftCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    const cardObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    });
    
    cardObserver.observe(card);
  });

  // Add floating animation for icons (but not the logo icons)
  const icons = document.querySelectorAll('.rocketlaunch-icon, .user-icon, .get-started-icon');
  icons.forEach(icon => {
    icon.style.animation = 'float 3s ease-in-out infinite';
  });

  // Add pulse animation for call-to-action buttons
  const ctaButtons = document.querySelectorAll('.sign-up, .button4, .button6');
  ctaButtons.forEach(button => {
    button.style.animation = 'pulse 2s infinite';
  });

  // Real-time Auction Timer
  function createAuctionTimer() {
    const hoursElement = document.querySelector('.semi-colon');
    const minutesElement = document.querySelector('.b2');
    const secondsElement = document.querySelector('.b3');
    
    if (!hoursElement || !minutesElement || !secondsElement) {
      return; // Exit if elements not found
    }

    // Always start fresh from 24 hours on every page load/refresh
    // This ensures the timer always starts from 24:00:00 when page loads
    const auctionEndTime = new Date();
    auctionEndTime.setHours(auctionEndTime.getHours() + 24);
    
    function updateTimer() {
      const now = new Date();
      const timeLeft = auctionEndTime - now;
      
      if (timeLeft <= 0) {
        // Auction ended
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        
        // Add ended styling
        const timerContainer = document.querySelector('.timer');
        if (timerContainer) {
          timerContainer.style.color = '#f87171';
          timerContainer.style.opacity = '0.7';
        }
        
        // Show auction ended message
        const auctionEndsIn = document.querySelector('.auction-ends-in');
        if (auctionEndsIn) {
          auctionEndsIn.textContent = 'Auction has ended';
          auctionEndsIn.style.color = '#f87171';
        }
        
        return; // Stop the timer
      }
      
      // Calculate time components
      const hours = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      
      // Update display with leading zeros
      hoursElement.textContent = hours.toString().padStart(2, '0');
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
      
      // Add urgency styling when time is running low
      if (hours < 1) {
        const timerContainer = document.querySelector('.timer');
        if (timerContainer) {
          timerContainer.style.color = '#f87171';
          timerContainer.style.animation = 'pulse 1s infinite';
        }
      } else if (hours < 6) {
        const timerContainer = document.querySelector('.timer');
        if (timerContainer) {
          timerContainer.style.color = '#fbbf24';
        }
      }
    }
    
    // Update timer immediately
    updateTimer();
    
    // Update timer every second
    const timerInterval = setInterval(updateTimer, 1000);
    
    // Store interval ID for potential cleanup
    window.auctionTimerInterval = timerInterval;
  }

  // Initialize auction timer when the section is visible
  const auctionSection = document.querySelector('.nft-highlight');
  if (auctionSection) {
    const auctionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          createAuctionTimer();
          auctionObserver.unobserve(entry.target);
        }
      });
    });
    
    auctionObserver.observe(auctionSection);
  }

  // Sign Up Modal Functionality
  const signupModal = document.getElementById('signupModal');
  const signupBtn = document.querySelector('.sign-up');
  const closeBtn = document.querySelector('.close');
  const signupForm = document.getElementById('signupForm');

  // Open modal when sign up button is clicked
  if (signupBtn) {
    signupBtn.addEventListener('click', function(e) {
      e.preventDefault();
      signupModal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
  }

  // Close modal when X is clicked
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      signupModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      resetForm();
    });
  }

  // Close modal when clicking outside of it
  window.addEventListener('click', function(e) {
    if (e.target === signupModal) {
      signupModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      resetForm();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && signupModal.style.display === 'block') {
      signupModal.style.display = 'none';
      document.body.style.overflow = 'auto';
      resetForm();
    }
  });

  // Form validation and submission
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      clearErrors();
      
      // Get form data
      const formData = new FormData(signupForm);
      const data = Object.fromEntries(formData);
      
      // Validate form
      let isValid = true;
      
      // Validate full name
      if (!data.fullName || data.fullName.trim().length < 2) {
        showError('fullName', 'Full name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate password
      if (!data.password || data.password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        isValid = false;
      }
      
      // Validate password confirmation
      if (data.password !== data.confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        isValid = false;
      }
      
      // Validate terms agreement
      if (!data.terms) {
        showError('terms', 'You must agree to the terms and conditions');
        isValid = false;
      }
      
      if (isValid) {
        // Show success message
        showSuccess();
        
        // Simulate form submission
        setTimeout(() => {
          console.log('Form submitted:', data);
          signupModal.style.display = 'none';
          document.body.style.overflow = 'auto';
          resetForm();
          
          // Show welcome message
          alert(`Welcome to NFT Marketplace, ${data.fullName}! Your account has been created successfully.`);
        }, 1500);
      }
    });
  }

  // Helper functions for form validation
  function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (field) {
      field.classList.add('error');
      
      // Remove existing error message
      const existingError = field.parentNode.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Add new error message
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.textContent = message;
      field.parentNode.appendChild(errorDiv);
    }
  }

  function clearErrors() {
    const errorFields = document.querySelectorAll('.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => message.remove());
  }

  function showSuccess() {
    const form = document.getElementById('signupForm');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = '✓ Account created successfully! Welcome to NFT Marketplace!';
    successDiv.style.display = 'block';
    
    form.insertBefore(successDiv, form.firstChild);
  }

  function resetForm() {
    const form = document.getElementById('signupForm');
    if (form) {
      form.reset();
      clearErrors();
      
      const successMessage = form.querySelector('.success-message');
      if (successMessage) {
        successMessage.remove();
      }
    }
  }

  // Add real-time validation
  const formInputs = document.querySelectorAll('#signupForm input, #signupForm textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    input.addEventListener('input', function() {
      if (this.classList.contains('error')) {
        validateField(this);
      }
    });
  });

  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Clear existing error
    field.classList.remove('error');
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
      errorMessage.remove();
    }
    
    // Validate based on field type
    switch (fieldName) {
      case 'fullName':
        if (value.length < 2) {
          showError(fieldName, 'Full name must be at least 2 characters');
        }
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          showError(fieldName, 'Please enter a valid email address');
        }
        break;
      case 'password':
        if (value.length > 0 && value.length < 6) {
          showError(fieldName, 'Password must be at least 6 characters');
        }
        break;
      case 'confirmPassword':
        const password = document.getElementById('password').value;
        if (value && value !== password) {
          showError(fieldName, 'Passwords do not match');
        }
        break;
    }
  }

});

// Add CSS animations via JavaScript
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  
  .collection-card, .artist-card, .category-card, .nft-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .collection-card:hover, .artist-card:hover, .category-card:hover, .nft-card:hover {
    box-shadow: 0 10px 30px rgba(162, 89, 255, 0.3);
  }
`;
document.head.appendChild(style);
