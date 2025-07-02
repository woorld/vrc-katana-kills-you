const toggle = document.getElementById('toggle-active');

toggle.addEventListener('change', async e => {
  await window.osc.changeActive(e.target.checked);
});
