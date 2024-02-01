// linksLoader.js

// Function to display links in the linkList
function displayLinks(linkArray) {
    const linkList = document.getElementById('linkList');
  
    linkArray.forEach(link => {
      const listItem = document.createElement('li');
      listItem.textContent = link;
      linkList.appendChild(listItem);
    });
  }
  
  // Function to load links from a specified file
  async function loadLinks(fileName) {
    try {
      const response = await fetch(fileName);
      const links = await response.json();
      return links;
    } catch (error) {
      console.error('Error fetching or loading links:', error);
      return null;
    }
  }
  
  // Function to initialize the page by loading and displaying links
  async function initializePage() {
    const fileName = "links.json"; // Change the file name as needed
    const links = await loadLinks(fileName);
  
    if (links) {
      displayLinks(links);
    }
  }
  
  // Call initializePage when the DOM content is loaded
  document.addEventListener("DOMContentLoaded", initializePage);
  