const CALENDLY_URL = 'https://calendly.com/REPLACE-ME';

document.querySelectorAll('[data-calendly]').forEach((link) => {
  link.href = CALENDLY_URL;
  link.addEventListener('click', (event) => {
    if (!window.Calendly) return;
    event.preventDefault();
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Service cards match the tallest closed card. The extra space goes above
// "What's included", so opening it grows only that card and nothing jumps.
const serviceCards = [...document.querySelectorAll('.service-card')];

function closedHeight(card) {
  const summaryBottom = card.querySelector('summary').getBoundingClientRect().bottom;
  return summaryBottom - card.getBoundingClientRect().top;
}

function matchServiceCardHeights() {
  const toolLines = serviceCards.map((card) => card.querySelector('.service-tools'));
  toolLines.forEach((line) => { line.style.marginBottom = ''; });
  const sideBySide = serviceCards.length > 1 && serviceCards[0].offsetTop === serviceCards[1].offsetTop;
  if (!sideBySide) return;
  const heights = serviceCards.map(closedHeight);
  const tallest = Math.max(...heights);
  toolLines.forEach((line, i) => { line.style.marginBottom = `${tallest - heights[i]}px`; });
}

if (serviceCards.length) {
  matchServiceCardHeights();
  document.fonts.ready.then(matchServiceCardHeights);
  window.addEventListener('resize', matchServiceCardHeights);
}
