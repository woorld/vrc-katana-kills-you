const toggleActive = document.getElementById('toggle-active');
toggleActive.addEventListener('change', e => {
  window.osc.changeActive(e.target.checked);
});

const toggleAutoClose = document.getElementById('toggle-auto-close');
toggleAutoClose.addEventListener('change', e => {
  window.osc.changeAutoClose(e.target.checked);
});
