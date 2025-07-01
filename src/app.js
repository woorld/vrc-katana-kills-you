const button = document.getElementById('toggle-active');

button.addEventListener('click', async () => {
  const isActive = await window.osc.toggleActive();
  button.textContent = isActive ? 'OFF' : 'ON';
});
