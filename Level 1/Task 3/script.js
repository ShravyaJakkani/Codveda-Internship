document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault(); 
  
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const type = document.getElementById('type').value;
    const message = document.getElementById('message').value.trim();
  
    if (!name || !email || !type || !message) {
      alert("Please fill in all fields.");
      return;
    }
  
    const summary = `
      <strong>Name:</strong> ${name}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Type:</strong> ${type}<br>
      <strong>Message:</strong> ${message}
    `;
    document.getElementById('summary').innerHTML = summary;
    document.getElementById('modal').style.display = 'block';
  
    document.getElementById('feedbackForm').reset();
  });
  
  document.getElementById('closeBtn').onclick = function () {
    document.getElementById('modal').style.display = 'none';
  };
  
  window.onclick = function (event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };