const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
  });
const audio = document.getElementById('bg-music');
const startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
  swiper.slideTo(1, 500);
  setTimeout(() => {
    swiper.removeSlide(0);
  }, 500);
  audio.play();
});
  const menu = document.getElementById('side-menu');
  const toggle = document.getElementById('menu-toggle');
  const closeBtn = document.querySelector('#side-menu .close-menu');

  toggle.addEventListener('click', () => {
    menu.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
  });

  // Close menu when clicking a link
  document.querySelectorAll('#side-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
// document.addEventListener('DOMContentLoaded', () => {
//   const musicToggle = document.getElementById('music-toggle');
//   let isPlaying = false;
//  musicToggle.addEventListener('click', () => {
//     if (isPlaying) {
//       audio.pause();
//       isPlaying = false;

//     } else {
//       audio.play().then(() => {
//         isPlaying = true;
//       }).catch((error) => {
//         console.log('Playback failed:', error);
//       });
//     }
//   });
// });
  const mapBtn = document.getElementById('map-btn');
  mapBtn.addEventListener('click', () => {
    window.open('https://www.google.com/maps/place/33.623034,35.472572/data=!4m6!3m5!1s0!7e2!8m2!3d33.6230338!4d35.472572?utm_source=mstt_1&entry=gps&coh=192189&g_ep=CAESCjExLjEyNi4xMTAYACDXggMqUSw5NDIyMjM1Myw5NDIxNjQxMyw5NDIxMjQ5Niw5NDIwNzM5NCw5NDIwNzUwNiw5NDIxNzUyMyw5NDIxODY1Myw0NzA4NzExOCw0NzA4NDM5M0ICTEI%3D',
      '_blank');
  });
  document.addEventListener('DOMContentLoaded', () => {
    const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
    const attendingBlock = document.getElementById('attending-block');
    const notAttendingBlock = document.getElementById('not-attending-block');
    const guestsInput = document.getElementById('guests');
    const guestsFields = document.getElementById('guests-fields');
    const errorMessage = document.getElementById('error-message');

    function updateGuestFields(count) {
      guestsFields.innerHTML = '';
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

    updateGuestFields(parseInt(guestsInput.value, 10));
    attendanceRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        errorMessage.style.display = 'none';
        if (e.target.value === 'Attending') {
          attendingBlock.style.display = 'block';
          notAttendingBlock.style.display = 'none';
        } else {
          attendingBlock.style.display = 'none';
          notAttendingBlock.style.display = 'block';
        }
      });
    });

    guestsInput.addEventListener('input', () => {
      let count = parseInt(guestsInput.value, 10);
      if (isNaN(count) || count < 1) {
        count = 1;
        guestsInput.value = '1';
      }
      updateGuestFields(count);
    });
    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let errors = [];
      const attendance = document.querySelector('input[name="attendance"]:checked').value;
      if (attendance === 'Attending') {

        const guestInputs = guestsFields.querySelectorAll('input[type="text"]');
        guestInputs.forEach((input, index) => {
          if (!input.value.trim()) {
            errors.push(`Guest #${index + 1} name is required.`);
          }
        });
      } else {

        const notAttendingName = document.getElementById('notAttendingName');
        if (!notAttendingName.value.trim()) {
          errors.push("Your name is required.");
        }
      }

      if (errors.length > 0) {
        errorMessage.innerHTML = errors.join('<br>');
        errorMessage.style.display = 'block';
        errorMessage.style.color = 'red';
        return;
      }
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
      emailjs.init("trm32B0ebXh0zgIfZ");

    const rsvpForm = document.getElementById('rsvp-form');
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const attendance = document.querySelector('input[name="attendance"]:checked').value;
      const formData = {
        attendance: attendance
      };
      if (attendance === "Attending") {
        formData.guests = document.getElementById('guests').value;
        let guestNames = "";
        const guestInputs = document.querySelectorAll("#guests-fields input");
        guestInputs.forEach((input, index) => {
           guestNames += `Guest #${index + 1}: ${input.value}\n`;
        });
        formData.guestNames = guestNames;
      } else {
        formData.Name = document.getElementById('notAttendingName').value;
      }
      emailjs.send("service_71ye3ac", "template_n2gtndv", formData)
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Thank you for your RSVP!");
          rsvpForm.reset();
        })
        .catch((error) => {
          console.error("FAILED...", error);
          alert("There was an error sending your RSVP. Please try again.");
        });
    });
  });
