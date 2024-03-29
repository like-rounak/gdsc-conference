// Fetch conference data from the API
async function fetchConferences() {
  const response = await fetch("https://gdscdev.vercel.app/api");
  const data = await response.json();
  const conferences = data.content.data;

  const conferenceContainer = document.getElementById("conferenceContainer");
  conferenceContainer.innerHTML = "";

  conferences.forEach(conference => {
    const conferenceCard = createConferenceCard(conference);
    conferenceContainer.appendChild(conferenceCard);
  });
}

// Create conference card element
function createConferenceCard(conference) {
  const conferenceCard = document.createElement("div");
  conferenceCard.className = "conference-card";

  const image = document.createElement("img");
  image.src = conference.banner_image;
  conferenceCard.appendChild(image);

  const title = document.createElement("h2");
  title.textContent = conference.title;
  conferenceCard.appendChild(title);

  const description = document.createElement("p");
  description.textContent = conference.description;
  conferenceCard.appendChild(description);

  const organiserIcon = document.createElement("img");
  organiserIcon.className = "organiser-icon";
  organiserIcon.src = conference.organiser_icon;
  conferenceCard.appendChild(organiserIcon);

  const organiserName = document.createElement("span");
  organiserName.textContent = conference.organiser_name;
  conferenceCard.appendChild(organiserName);

  const venue = document.createElement("p");
  venue.className = "venue-country";
  venue.textContent = `${conference.venue_name}, ${conference.venue_city}, ${conference.venue_country}`;
  conferenceCard.appendChild(venue);

  const dateTimeContainer = document.createElement("div");
  dateTimeContainer.className = "date-time-container";

  const date = document.createElement("p");
  const dateTime = new Date(conference.date_time);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  date.textContent = dateTime.toLocaleDateString(undefined, options);
  dateTimeContainer.appendChild(date);

  const time = document.createElement("p");
  const timeString = dateTime.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  time.textContent = `Time: ${timeString}`;
  dateTimeContainer.appendChild(time);

  conferenceCard.appendChild(dateTimeContainer);

  return conferenceCard;
}

// Call fetchConferences to load data
fetchConferences();

// Filter func
document.getElementById("filterBy").addEventListener("change", function() {
  const filterBy = this.value.toLowerCase();
  const conferenceContainer = document.getElementById("conferenceContainer");

  const conferenceCards = Array.from(conferenceContainer.children);
  conferenceCards.forEach(card => {
    const country = card.querySelector(".venue-country").textContent.toLowerCase();

    if (filterBy === "all" || country.includes(filterBy)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Search func
document.getElementById("searchBox").addEventListener("input", function() {
  const searchTerm = this.value.toLowerCase();
  const conferenceContainer = document.getElementById("conferenceContainer");

  const conferenceCards = Array.from(conferenceContainer.children);
  conferenceCards.forEach(card => {
    const title = card.querySelector(".conference-card h2").textContent.toLowerCase();
    const description = card.querySelector(".conference-card p").textContent.toLowerCase();

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Apply sorting based on selected option
document.getElementById("sortOrder").addEventListener("change", function() {
  const sortOrder = this.value;
  const conferenceContainer = document.getElementById("conferenceContainer");
  const conferenceCards = Array.from(conferenceContainer.children);

  const sortedConferenceCards = [...conferenceCards];
  sortConferenceCards(sortedConferenceCards, sortOrder);

  conferenceContainer.innerHTML = ""; 

  sortedConferenceCards.forEach(card => {
    conferenceContainer.appendChild(card); 
  });
});


// sort cards
function sortConferenceCards(cards, sortOrder) {
  if (sortOrder === "Default") {
    sortedConferenceCards = conferenceCards.slice(); 
  } else if (sortOrder === "earlier") {
    cards.sort((a, b) => compareConferenceCards(a, b, "earlier"));
  } else if (sortOrder === "later") {
    cards.sort((a, b) => compareConferenceCards(a, b, "later"));
  }
}


// compare conference cards to sort
function compareConferenceCards(cardA, cardB, sortOrder) {
  const dateA = new Date(cardA.querySelector(".date-time-container p").textContent);
  const dateB = new Date(cardB.querySelector(".date-time-container p").textContent);

  if (sortOrder === "earlier") {
    return dateA - dateB;
  } else {
    return dateB - dateA;
  }
}
