
  // Select all FAQ boxes
  const faqBoxes = document.querySelectorAll('.faqbox');

  faqBoxes.forEach(box => {
    box.addEventListener('click', function () {
      // First, close any open box
      faqBoxes.forEach(b => {
        if (b !== box) {
          b.classList.remove('active');
        }
      });

      // Then, toggle the clicked one
      box.classList.toggle('active');
    });
  });
