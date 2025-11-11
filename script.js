// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// Слайдер главной страницы
const heroSlides = document.querySelectorAll('.hero .slide');
const heroDotsContainer = document.getElementById('heroDots');
let currentHeroSlide = 0;

if (heroSlides.length > 0 && heroDotsContainer) {
  heroSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goToHeroSlide(i));
    heroDotsContainer.appendChild(dot);
  });

  const dots = heroDotsContainer.querySelectorAll('span');
  if (dots[0]) dots[0].classList.add('active');

  function goToHeroSlide(index) {
    heroSlides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    heroSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentHeroSlide = index;
  }

  function nextHeroSlide() {
    currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
    goToHeroSlide(currentHeroSlide);
  }

  setInterval(nextHeroSlide, 6000);
}

// Корзина
let cart = [];

function updateCart() {
  const cartList = document.getElementById('cart-list');
  const cartEmpty = document.getElementById('cart-empty');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');

  if (cart.length === 0) {
    cartEmpty.style.display = 'block';
    cartList.innerHTML = '';
    cartTotalEl.textContent = '';
    checkoutBtn.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    let total = 0;
    let html = '';
    cart.forEach((item, index) => {
      total += item.price;
      html += `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong><br>
            ${item.price > 0 ? item.price.toLocaleString('ru-RU') + ' ₽' : 'По запросу'}
          </div>
          <button class="remove-btn" data-index="${index}">Удалить</button>
        </div>
      `;
    });
    cartList.innerHTML = html;
    cartTotalEl.innerHTML = cart.length > 0 ? `Товаров: <strong>${cart.length}</strong>` : '';
    checkoutBtn.style.display = 'inline-block';

    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        updateCart();
      });
    });
  }
}

// Добавление в корзину
document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.collection-card');
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price) || 0;
    cart.push({ name, price });
    updateCart();
    alert(`«${name}» добавлен в корзину!`);
  });
});

// Оформление заказа
const checkoutBtn = document.getElementById('checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    alert('Спасибо за заказ! Мы свяжемся с вами для уточнения деталей.');
    cart = [];
    updateCart();
  });
}

// Анимация при прокрутке
window.addEventListener('scroll', () => {
  document.querySelectorAll('.fade-in').forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < window.innerHeight - 100) {
      el.classList.add('visible');
    }
  });
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
      if (nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    }
  });
});