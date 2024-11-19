document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.cars-gallery');
  const nextButton = document.querySelector('.next');
  const prevButton = document.querySelector('.prev');

  // Initial set of images
  const images = [
    "../media/car1.jpg",
    "../media/car2.jpg",
    "../media/car3.jpg",
    "../media/car4.jpg",
    "../media/car5.jpg",
    "../media/car6.jpg",
    "../media/car7.jpg",
    "../media/car8.jpg",
    "../media/car9.jpg",
  ];

  let previousSet = []; // To store the previous set of images

  // Function to shuffle and pick 3 unique images
  const getUniqueSet = (array, previous, count = 3) => {
    let newSet;
    do {
      newSet = array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item)
        .slice(0, count); // Take the first `count` items
    } while (JSON.stringify(newSet) === JSON.stringify(previous)); // Ensure uniqueness
    return newSet;
  };

  // Function to update the gallery
  const updateGallery = (newImages) => {
    gallery.innerHTML = ''; // Clear existing images
    newImages.forEach((imgSrc) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = "Car Image";
      gallery.appendChild(img);
    });
  };

  // Add event listeners for buttons
  nextButton.addEventListener('click', () => {
    const newSet = getUniqueSet(images, previousSet);
    previousSet = newSet; // Update the previous set
    updateGallery(newSet);
  });

  prevButton.addEventListener('click', () => {
    const newSet = getUniqueSet(images, previousSet);
    previousSet = newSet; // Update the previous set
    updateGallery(newSet);
  });

  // Initialize gallery with the first set of 3 images
  const initialSet = getUniqueSet(images, []);
  updateGallery(initialSet);
  previousSet = initialSet;
});
