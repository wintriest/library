export async function printStory() {
  const container = document.querySelector('.story');
  if (!container) return;

  const path = window.location.pathname;
  const slug = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');

  try {
    const module = await import(`./${slug}.js`);
    const story = module.default;

    story.forEach(paragraph => {
      const p = document.createElement('p');
      p.innerHTML = paragraph; // Use innerHTML to allow inline styling
      container.appendChild(p);
    });
  } catch (error) {
    console.error('Error loading story:', error);
    container.innerHTML = "<p>Sorry, this story could not be loaded.</p>";
  }
}

printStory();
