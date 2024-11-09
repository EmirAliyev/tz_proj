// Создайте Observer для последнего элемента ленты
const observer = new IntersectionObserver(
  async (entries) => {
    const [entry] = entries

    if (entry.isIntersecting) {
      // Подгрузите новые данные, когда последний элемент виден
    }
  },
  {
    root: null, // Следим за видимостью внутри viewport
    rootMargin: '0px',
    threshold: 1.0, // Полностью в видимой области
  }
)

const lastItem = document.querySelector('.last-item')
if (lastItem) {
  observer.observe(lastItem)
}
