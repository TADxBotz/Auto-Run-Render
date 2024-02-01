const linkArray = loadLinks() || [];

displayLinks();

function addLink() {
  const linkInput = document.getElementById('linkInput');
  const linkList = document.getElementById('linkList');
  const validDomain = 'onrender.com';

  const urlRegex = new RegExp(`^(https?:\\/\\/)?([\\w.-]+\\.${validDomain})(\\/\\S*)?$`, 'i');

  const newLink = linkInput.value.trim();

  // Fetch existing links from links.json
  fetch("links.json")
    .then(response => response.json())
    .then(existingLinks => {
      // Check if the newLink already exists in the existing links
      if (existingLinks.some(link => link.trim() === newLink)) {
        alert('Link already exists in the Database!');
      } else if (urlRegex.test(newLink)) {
        // Add the new link to the linkArray and update the display
        linkArray.push(newLink);
        saveLink(newLink);
        linkInput.value = '';
        linkList.innerHTML = '';
        displayLinks(linkArray);
      } else {
        alert('Please enter a valid URL ending with onrender.com.');
      }
    })
    .catch(error => {
      console.error('Error fetching links:', error);
    });
}

function displayLinks() {
  const linkList = document.getElementById('linkList');

  linkArray.forEach(link => {
    const listItem = document.createElement('li');
    listItem.textContent = link;
    linkList.appendChild(listItem);
  });
}

function loadLinks() {
  try {
    return linkArray;
  } catch (error) {
    console.error('Error loading links:', error);
    return null;
  }
}

function saveLink(newLink) {
  try {
    fetch('appendLink.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ link: newLink })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Link appended successfully:', data);
    })
    .catch(error => {
      console.error('Error appending link:', error);
    });
  } catch (error) {
    console.error('Error saving link:', error);
  }
}
