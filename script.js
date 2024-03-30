document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.querySelector('.calendar');
    const appointments = new Map(); // Map to store scheduled appointments
  
    // Generate calendar days (dummy data)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    for (let day of days) {
      const calendarDay = document.createElement('div');
      calendarDay.classList.add('calendar-day');
      calendarDay.dataset.day = day;
      const dayHeader = document.createElement('h3');
      dayHeader.textContent = day;
      const slotList = document.createElement('ul');
      slotList.classList.add('slots');
      calendarDay.appendChild(dayHeader);
      calendarDay.appendChild(slotList);
      calendar.appendChild(calendarDay);
    }
  
    // Open modal on click
    const modal = document.getElementById('modal');
    const btn = document.querySelector('.calendar');
    const span = document.querySelector('.close');
    btn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
    span.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  
    // Handle form submission
    const form = document.getElementById('appointment-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name');
      const date = formData.get('date');
      const time = formData.get('time');
      const dateTime = `${date} ${time}`;
  
      // Check if the same time slot is already booked
      if (appointments.has(dateTime)) {
        alert('This slot is already booked.');
        return;
      }
  
      // Add appointment to the map and display confirmation
      appointments.set(dateTime, name);
      displayAppointments();
      displayBookedSlot(date, time, name);
      alert(`Appointment scheduled for ${name} on ${date} at ${time}`);
      form.reset();
      modal.style.display = 'none';
    });
  
    // Function to display scheduled appointments
    function displayAppointments() {
      const appointmentList = document.getElementById('appointment-list');
      appointmentList.innerHTML = '';
      for (let [dateTime, name] of appointments) {
        const appointmentEntry = document.createElement('li');
        appointmentEntry.textContent = `${name} - ${dateTime}`;
        appointmentList.appendChild(appointmentEntry);
      }
    }
  
    // Function to display booked slot below the days
    function displayBookedSlot(date, time, name) {
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      const dayElement = document.querySelector(`.calendar-day[data-day="${dayOfWeek}"] .slots`);
      const slotEntry = document.createElement('li');
      slotEntry.textContent = `${name} - ${time}`;
      dayElement.appendChild(slotEntry);
    }
  });
