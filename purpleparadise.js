document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("gameForm");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const points = document.getElementById("points").value;
      const health = document.getElementById("health").value;
      const damage = document.getElementById("damage").value;
      const weapon = document.getElementById("weapons").value;

// Creates a pop up that displays what user input
      alert(
        `🌌 Welcome to Purple Paradise, ${username}!\n` +
        `✨ Points: ${points}\n` +
        `❤️ Health: ${health} | 💥 Damage: ${damage}\n` +
        `🔮 Weapon of Choice: ${weapon}\n` +
        `Let your magical journey begin!`
      );
    });
  } else {
    console.error("Form with ID 'gameForm' not found.");
  }
});
