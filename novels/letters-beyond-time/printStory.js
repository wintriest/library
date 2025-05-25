export async function printStory() {
  const container = document.querySelector('.story');
  if (!container) return;

  // Get file name without extension (e.g., 'chapter-01')
  const path = window.location.pathname;
  const slug = path.substring(path.lastIndexOf('/') + 1).replace('.html', '');

  // Import the matching JS module
  try {
    const module = await import(`./${slug}.js`);
    const story = module.default;

    story.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      container.appendChild(p);
    });
  } catch (error) {
    console.error('Error loading story:', error);
    container.innerHTML = "<p>Sorry, this story could not be loaded.</p>";
  }
}

printStory();
