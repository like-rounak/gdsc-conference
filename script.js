const conferenceContainer = document.getElementById('conferenceContainer');

fetch('https://gdscdev.vercel.app/api')
  .then(response => response.json())
  .then(data => {
    const conferences = data.content.data;

    conferences.forEach(conference => {
      const conferenceCard = document.createElement('div');
      conferenceCard.className = 'conference-card';

      const bannerImage = document.createElement('img');
      bannerImage.src = conference.banner_image;
      bannerImage.alt = conference.title;

      const titleElement = document.createElement('h2');
      titleElement.textContent = conference.title;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = conference.description;

      const dateTimeElement = document.createElement('p');
      const dateTime = new Date(conference.date_time).toLocaleString();
      dateTimeElement.textContent = `Date and Time: ${dateTime}`;

      const organiserElement = document.createElement('p');
      organiserElement.textContent = `Organizer: ${conference.organiser_name}`;

      const organiserIcon = document.createElement('img');
      organiserIcon.src = conference.organiser_icon;
      organiserIcon.alt = `${conference.organiser_name} Icon`;
      organiserIcon.className = 'organiser-icon'; // Make sure class name matches CSS

      const venueElement = document.createElement('p');
      venueElement.textContent = `Venue: ${conference.venue_name}, ${conference.venue_city}, ${conference.venue_country}`;

      conferenceCard.appendChild(bannerImage);
      conferenceCard.appendChild(titleElement);
      conferenceCard.appendChild(descriptionElement);
      conferenceCard.appendChild(dateTimeElement);

      // Append the organizer icon before the organizer's name
      organiserElement.prepend(organiserIcon);

      conferenceCard.appendChild(organiserElement);
      conferenceCard.appendChild(venueElement);

      conferenceContainer.appendChild(conferenceCard);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
