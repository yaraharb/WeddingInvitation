// Initialize Swiper for horizontal slide transitions
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    // Optional: add navigation, pagination, etc. if desired
  });

// Start Button: Move to the next slide & remove the first slide
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  // 1. Slide to the second slide (index 1) with a short transition (e.g., 500ms)
  swiper.slideTo(1, 500);

  // 2. After 500ms, remove the old first slide (index 0)
  setTimeout(() => {
    swiper.removeSlide(0); 
    // Now the new "first" slide is what used to be slide 2
  }, 500);
});


  // Hamburger Menu: Toggle side menu open/closed
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const closeMenu = document.querySelector('#side-menu .close-menu');
  
  // Toggle side menu via hamburger icon
  menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    if (sideMenu.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Close side menu via "x" icon inside the menu
  closeMenu.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    // Revert the hamburger icon back to fa-bars
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
  
document.addEventListener('DOMContentLoaded', () => {
  const musicToggle = document.getElementById('music-toggle');
  const audio = new Audio('../music/all of me.mp3'); // Ensure the path is correct
  let isPlaying = false;

  // Try to auto-play the music on page load
  audio.play().then(() => {
    isPlaying = true;
  }).catch((error) => {
    console.log('Autoplay was prevented. Music will start when the user clicks.', error);
  });

  // Toggle play/pause on click
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      audio.pause();
      isPlaying = false;

    } else {
      audio.play().then(() => {
        isPlaying = true;
      }).catch((error) => {
        console.log('Playback failed:', error);
      });
    }
  });
});



  const mapBtn = document.getElementById('map-btn');
  mapBtn.addEventListener('click', () => {
    // Open in a new tab
    window.open(
      'https://www.google.com/maps/place/33.623034,35.472572/data=!4m6!3m5!1s0!7e2!8m2!3d33.6230338!4d35.472572?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESCjExLjEyNi4xMTAYACDXggMqUSw5NDIyMjM1Myw5NDIxNjQxMyw5NDIxMjQ5Niw5NDIwNzM5NCw5NDIwNzUwNiw5NDIxNzUyMyw5NDIxODY1Myw0NzA4NzExOCw0NzA4NDM5M0ICTEI%3D',
      '_blank'
    );
  });
  document.addEventListener('DOMContentLoaded', () => {
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const attendingBlock = document.getElementById('attending-block');
    const notAttendingBlock = document.getElementById('not-attending-block');
    const guestsInput = document.getElementById('guests');
    const guestsFields = document.getElementById('guests-fields');
    const errorMessage = document.getElementById('error-message');
  
    // Function to update the dynamic guest fields based on the number input
    function updateGuestFields(count) {
      guestsFields.innerHTML = ''; // Clear any existing fields
      for (let i = 1; i <= count; i++) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('form-group');
  
        const label = document.createElement('label');
        label.setAttribute('for', `guestName${i}`);
        label.textContent = `Guest #${i} Name`;
  
        const input = document.createElement('input');
        input.type = 'text';
        input.id = `guestName${i}`;
        input.name = `guestName${i}`;
  
        groupDiv.appendChild(label);
        groupDiv.appendChild(input);
        guestsFields.appendChild(groupDiv);
      }
    }
  
    // Initialize with 1 guest field by default
    updateGuestFields(parseInt(guestsInput.value, 10));
  
    // Toggle blocks based on attendance selection
    attendanceRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        errorMessage.style.display = 'none'; // Hide error on change
        if (e.target.value === 'Attending') {
          attendingBlock.style.display = 'block';
          notAttendingBlock.style.display = 'none';
        } else {
          attendingBlock.style.display = 'none';
          notAttendingBlock.style.display = 'block';
        }
      });
    });
  
    // Update guest fields when the number input changes
    guestsInput.addEventListener('input', () => {
      let count = parseInt(guestsInput.value, 10);
      if (isNaN(count) || count < 1) {
        count = 1;
        guestsInput.value = '1';
      }
      updateGuestFields(count);
    });
  
    // Form submission validation
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let errors = [];
  
      // Determine the selected attendance option
      const attendance = document.querySelector('input[name="attendance"]:checked').value;
  
      if (attendance === 'Attending') {
        // Validate each guest name field for Attending
        const guestInputs = guestsFields.querySelectorAll('input[type="text"]');
        guestInputs.forEach((input, index) => {
          if (!input.value.trim()) {
            errors.push(`Guest #${index + 1} name is required.`);
          }
        });
      } else {
        // Validate the "Your Name" field for Not Attending
        const notAttendingName = document.getElementById('notAttendingName');
        if (!notAttendingName.value.trim()) {
          errors.push("Your name is required.");
        }
      }
  
      // If errors exist, display them; otherwise, proceed
      if (errors.length > 0) {
        errorMessage.innerHTML = errors.join('<br>');
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        return;
      }
    });
  });
  // Get the elements
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
      emailjs.init("trm32B0ebXh0zgIfZ");
  
    // Reference the RSVP form element
    const rsvpForm = document.getElementById('rsvp-form');
  
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Determine which attendance option is selected
      const attendance = document.querySelector('input[name="attendance"]:checked').value;
      
      // Build an object to send via EmailJS
      const formData = {
        attendance: attendance
      };
  
      if (attendance === "Attending") {
        // For Attending: collect number of guests and their names
        formData.guests = document.getElementById('guests').value;
  
        // Gather guest names from dynamic fields (if added)
        let guestNames = "";
        const guestInputs = document.querySelectorAll("#guests-fields input");
        guestInputs.forEach((input, index) => {
           guestNames += `Guest #${index + 1}: ${input.value}\n`;
        });
        formData.guestNames = guestNames;
      } else {
        // For Not Attending: collect the sender's name
        formData.Name = document.getElementById('notAttendingName').value;
      }
  
      // Send the form data using EmailJS
      emailjs.send("service_71ye3ac", "template_n2gtndv", formData)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Thank you for your RSVP!");
          rsvpForm.reset(); // Optionally reset the form after submission
        })
        .catch((error) => {
          console.error("FAILED...", error);
          alert("There was an error sending your RSVP. Please try again.");
        });
    });
  });
  