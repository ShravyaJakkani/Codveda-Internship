const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.close');

const techInfo = {
    HTML: "HTML (HyperText Markup Language) is used to structure web content.",
    CSS: "CSS (Cascading Style Sheets) styles the look and layout of web pages.",
    JS: "JavaScript adds interactivity to websites and applications.",
    React: "React is a JavaScript library for building user interfaces.",
    Node:"A JavaScript runtime that allows you to build fast, scalable server-side applications.",
    Express:" A lightweight web framework for Node.js used to build APIs and web apps efficiently.",
    Mongodb:"A NoSQL database that stores data in flexible, JSON-like documents."
  };

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const title = card.getAttribute('data-title');
    const description = card.getAttribute('data-description');
    modalTitle.textContent = title;
    modalDescription.textContent = techInfo[title];
    modal.style.display = 'block';
  });
});

closeBtn.onclick = () => {
  modal.style.display = 'none';
};

window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
