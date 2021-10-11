class ImageCarousel {
  constructor(selector) {
    this.selector = selector;
    this.classModifier = null;
    this.currentImageIndex = 0;
    this.timer = null;
  }

  // Public
  initialize(modifier) {
    this.classModifier = modifier;
    this._renderImage();

    return this;
  }

  slider() {
    this.timer = setInterval(() => {
      this._getNextImage();
    }, 3000);

    return this;
  }

  renderNextImage() {
    this._getNextImage();

    if (this.timer !== null) {
      clearInterval(this.timer);
      this.slider();
    }

    return this;
  }

  renderPreviousImage() {
    this._getPreviousImage();

    if (this.timer !== null) {
      clearInterval(this.timer);
      this.slider();
    }

    return this;
  }


  
  // Private
  _getImages() {
    const imageArr = Array.from(document.querySelectorAll(this.selector));

    return imageArr;
  }

  _renderImage() {
    const imageArr = this._getImages();

    imageArr[this.currentImageIndex].classList.add(this.classModifier);
  }

  _getPreviousImage() {
    const imageArr = this._getImages();
    const imageArrLength = imageArr.length - 1;

    this._hidePreviousImage();

    if (this.currentImageIndex === 0) {
      this.currentImageIndex = imageArrLength;
    } else {
      this.currentImageIndex--;
    }

    this._renderImage();
  }

  _getNextImage() {
    const imageArr = this._getImages();
    const imageArrLength = imageArr.length - 1;

    this._hidePreviousImage();
    
    if (this.currentImageIndex < imageArrLength) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }

    this._renderImage();
  }

  _hidePreviousImage() {
    const imageArr = this._getImages();

    imageArr[this.currentImageIndex].classList.remove(this.classModifier);
  }
}

// Initialize Carousel
const carousel = new ImageCarousel('.carousel-item');

carousel.initialize('carousel-item--active');



// Events
const prevBtn = document.querySelector('.js-prev-btn');
const nextBtn = document.querySelector('.js-next-btn');

prevBtn.addEventListener('click', (e) => {
  e.preventDefault();

  carousel.renderPreviousImage();
});

nextBtn.addEventListener('click', (e) => {
  e.preventDefault();

  carousel.renderNextImage();
});