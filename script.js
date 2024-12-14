// API URL
const apiURL = "http://localhost:3000/players";

// Function to create a new player
async function addPlayer() {
  const playerId = parseInt(document.getElementById('playerId').value);
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const role = document.getElementById('role').value;

  // Ensure inputs are valid
  if (!playerId || !name || age < 0 || !role) {
      alert('Please provide valid inputs for all fields.');
      return;
  }

  const playerData = { playerId, name, age, role };

  try {
      const response = await fetch(apiURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(playerData),
      });

      const result = await response.json();

      if (response.ok) {
          alert('Player added successfully!');
          console.log('Player added:', result.player);
          fetchPlayers(); // Refresh the players list
      } else {
          console.error('Failed to add player:', result.error);
      }
  } catch (error) {
      console.error('Network or server error:', error);
  }
}

// Function to get all players and display them
async function getAllPlayers() {
    const response = await fetch(apiURL);
    const result = await response.json();

    if (response.ok) {
        displayPlayers(result.players);
    } else {
        alert(`Error: ${result.message}`);
    }
}

// Function to edit a player
async function editPlayer(playerId) {
    const response = await fetch(`${apiURL}/${playerId}`);
    const result = await response.json();

    if (response.ok) {
        // Pre-fill the form with the player data
        document.getElementById('playerId').value = result.playerId;
        document.getElementById('name').value = result.name;
        document.getElementById('age').value = result.age;
        document.getElementById('role').value = result.role;

        // Change form action to update this player
        document.getElementById('playerForm').onsubmit = async function (event) {
            event.preventDefault();

            const updatedData = {
                name: document.getElementById('name').value,
                age: parseInt(document.getElementById('age').value),
                role: document.getElementById('role').value,
            };

            const updateResponse = await fetch(`${apiURL}/${playerId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });

            const updateResult = await updateResponse.json();
            if (updateResponse.ok) {
                alert(`Player updated: ${updateResult.player.name}`);
                getAllPlayers(); // Refresh players list
            } else {
                alert(`Error: ${updateResult.message}`);
            }

            // Reset form
            document.getElementById('playerForm').reset();
        };
    } else {
        alert(`Error: ${result.message}`);
    }
}

// Function to delete a player
async function deletePlayer(playerId) {
    const response = await fetch(`${apiURL}/${playerId}`, {
        method: 'DELETE',
    });

    const result = await response.json();
    if (response.ok) {
        alert(`Player deleted: ${result.player.name}`);
        getAllPlayers(); // Refresh players list
    } else {
        alert(`Error: ${result.message}`);
    }
}

// Function to display players in the table
function displayPlayers(players) {
    const playerList = document.getElementById('playerList');
    playerList.innerHTML = '';  // Clear previous list

    players.forEach(player => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${player.playerId}</td>
            <td>${player.name}</td>
            <td>${player.age}</td>
            <td>${player.role}</td>
            <td>
                <button onclick="editPlayer('${player.playerId}')">Edit</button>
                <button onclick="deletePlayer('${player.playerId}')">Delete</button>
            </td>
        `;

        playerList.appendChild(row);
    });
}

// Form submission logic
document.getElementById('playerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const playerId = document.getElementById('playerId').value;
    if (playerId) {
        // If playerId exists, perform update
        editPlayer(playerId);
    } else {
        // Otherwise, create new player
        createPlayer();
    }
});

// Toggle the player data visibility
function togglePlayerData(show) {
    const playerList = document.getElementById('playerList');
    playerList.style.display = show ? 'table-row-group' : 'none';
    if (show) getAllPlayers();  // Load players when showing data
}
