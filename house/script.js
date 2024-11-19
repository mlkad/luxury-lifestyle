document.addEventListener("DOMContentLoaded", function () {
  // Все изображения домов
  const allImages = [
    "../media/house1.jpg", "../media/house2.jpg", "../media/house3.jpg", "../media/house4.jpg", "../media/house5.jpg",
    "../media/house6.jpg", "../media/house7.jpg", "../media/house8.jpg", "../media/house9.jpg", "../media/house10.jpg",
    "../media/house11.jpg", "../media/house12.jpg", "../media/house13.jpg", "../media/house14.jpg", "../media/house15.jpg"
    , "../media/house16.jpg", "../media/house17.jpg", "../media/house18.jpg", "../media/house19.jpg", "../media/house20.jpg"
    , "../media/house21.jpg", "../media/house22.jpg", "../media/house23.jpg", "../media/house24.jpg"
  ];

  const imagesPerPage = 8;
  const totalPages = 3;
  let currentPage = 1;

  const gallery = document.querySelector(".houses-gallery");
  const buttons = document.querySelectorAll(".pagination .page");
  const prevButton = document.querySelector(".pagination .prev");
  const nextButton = document.querySelector(".pagination .next");

  // Функция для случайного перемешивания массива
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // обмен элементов
    }
  }

  // Функция для отображения изображений на текущей странице
  function displayImages(page) {
    // Сначала перемешиваем все изображения
    const shuffledImages = [...allImages];
    shuffle(shuffledImages);

    // Выбираем только те изображения, которые должны быть на текущей странице
    const startIndex = (page - 1) * imagesPerPage;
    const selectedImages = shuffledImages.slice(startIndex, startIndex + imagesPerPage);

    // Очищаем галерею и добавляем новые изображения
    gallery.innerHTML = "";
    selectedImages.forEach(image => {
      const img = document.createElement("img");
      img.src = image;
      img.alt = "House Image";
      gallery.appendChild(img);
    });

    // Обновляем активную кнопку
    buttons.forEach(btn => btn.classList.remove("active"));
    document.querySelector(`.pagination .page[data-page="${page}"]`).classList.add("active");
  }

  // Слушатели событий для кнопок пагинации
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      currentPage = parseInt(button.getAttribute("data-page"));
      displayImages(currentPage);
    });
  });

  // Слушатели событий для кнопок "Prev" и "Next"
  prevButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayImages(currentPage);
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayImages(currentPage);
    }
  });

  displayImages(currentPage);
});
