const form = document.getElementById("sentenceForm");
const output = document.getElementById("output");

const templates = [
  ({ adjective, noun, verb }) => `The ${adjective} ${noun} ${verb} like it owns the place.`,
  ({ adjective, noun, verb }) => `I just saw a ${adjective} ${noun} that ${verb} at full volume.`,
  ({ adjective, noun, verb }) => `Never trust a ${adjective} ${noun} that ${verb} after midnight.`,
];

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const adjective = document.getElementById("adjective").value.trim();
  const noun = document.getElementById("noun").value.trim();
  const verb = document.getElementById("verb").value.trim();

  if (!adjective || !noun || !verb) {
  output.textContent = "Please fill in all the words 🙂";
  return;
}

  const pick = templates[Math.floor(Math.random() * templates.length)];
  output.textContent = pick({ adjective, noun, verb });
});
