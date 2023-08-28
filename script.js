const conferenceContainer = document.getElementById('conferenceContainer');

fetch('https://gdscdev.vercel.app/api')
  .then(response => response.json())
  .then(data => {
    const conferences = data.content.data;

    conferences.forEach(conference => {
      const conferenceCard = document.createElement('div');
      conferenceCard.className = 'conference-card';

      // Create HTML elements for conference details
      // You can use conference.title, conference.description, etc.

      conferenceContainer.appendChild(conferenceCard);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
