const skills = {
  design: ['UI / UX Design', 'Visual Design', '2D Character Design', 'Storyboarding', 'Typography', 'Layout Composition'],
  motion: ['2D Animation', 'Character Animation', 'Motion Graphics', 'Timing Principles', 'Visual Storytelling'],
  web: ['HTML5 & CSS3', 'JavaScript', 'Interactive Web', 'Database SQL', 'Mini Game Development', 'Responsive Design'],
  tools: ['Figma', 'Adobe Photoshop', 'Illustrator', 'InDesign', 'After Effects', 'Adobe Animate', 'VS Code', 'Unreal Engine']
};

const skillPanel = document.getElementById('skillPanel');
function renderSkills(group = 'design') {
  skillPanel.innerHTML = skills[group].map((skill, i) => `<span class="skill-pill" style="animation-delay:${i * 35}ms">${skill}</span>`).join('');
}
renderSkills();

document.querySelectorAll('.skill-chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.skill-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderSkills(btn.dataset.skillGroup);
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll('main .section')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -45% 0px', threshold: 0 });
sections.forEach(section => sectionObserver.observe(section));

window.addEventListener('scroll', () => {
  document.getElementById('topbar').classList.toggle('scrolled', window.scrollY > 40);
});

document.querySelectorAll('[data-slider]').forEach(slider => {
  const slides = slider.querySelector('.slides');
  const imgs = slides.querySelectorAll('img');
  let index = 0;
  const move = step => {
    index = (index + step + imgs.length) % imgs.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
  };
  slider.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); move(1); });
  slider.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); move(-1); });
});

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden-filter', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const tilt = document.querySelector('.tilt-card');
if (tilt && window.matchMedia('(pointer:fine)').matches) {
  tilt.addEventListener('mousemove', e => {
    const rect = tilt.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    tilt.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) rotate(2deg)`;
  });
  tilt.addEventListener('mouseleave', () => tilt.style.transform = 'rotate(2deg)');
}
