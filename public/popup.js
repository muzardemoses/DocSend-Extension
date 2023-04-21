// Get the DOM elements
const sequenceSelect = document.getElementById("sequence");
const submitButton = document.getElementById("submit-btn");
const refreshButton = document.getElementById("refresh-btn");

// Set up event listeners
submitButton.addEventListener("click", handleSubmit);
refreshButton.addEventListener("click", handleRefresh);

// Load the user's sequence on page load
window.onload = () => {
  loadSequence();
  const url = localStorage.getItem("url");
  document.getElementById("url").innerText = url;
  console.log("Current tab URL:", url);
   //eslint-disable-next-line no-undef
   chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.url) {
      document.getElementById("currentURL").innerText = (request.url);
      console.log("Current tab URL:", request.url);
    } else {
      console.error("Error: No URL found in request");
    }
  });
};

// Load the user's sequence
function loadSequence() {
  // Use the example sequence list for now
  const sequenceList = [
    "RSA - Cyber outreach",
    "AJB - Cybersecurity",
    "Allan B2B Outreach",
    "4.2023 - Miami Conference Outreach",
    "HCIT B2B - Generic",
    "Cybersecurity",
    "Perishable Ecom",
    "Cardiac Device Data",
    "Specialty Medication Management",
    "Generic Software / Email Testing",
  ];

  // Clear the sequence select element
  sequenceSelect.innerHTML = "";

  // Loop through the sequence data and add options to the select element
  sequenceList.forEach((url) => {
    const option = document.createElement("option");
    option.text = url;
    sequenceSelect.add(option);
  });

  // Get the current tab's URL
 
}

// Handle the form submit event
function handleSubmit(e) {
  e.preventDefault();

  // Save the updated sequence to the API
  saveSequence();
}

// Handle the refresh button click event
function handleRefresh() {
  // Reload the user's sequence
  loadSequence();
}

// Save the user's sequence to the API
function saveSequence() {
  // Get the current tab's URL
  const currentURL = localStorage.getItem("url");

  // Get the selected sequence from the select element
  const sequenceIndex = sequenceSelect.selectedIndex;
  const selectedSequence = sequenceSelect.options[sequenceIndex].text;
  console.log(selectedSequence)

  // Make an API call to save the user's sequence and current URL
  // Replace the placeholder URL with your own API endpoint
  fetch("https://example.com/api/sequence", {
    method: "POST",
    body: JSON.stringify({ currentURL, selectedSequence }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to save sequence.");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to save sequence.");
    });
}

