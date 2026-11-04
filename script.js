/* =====================================================
   Helper kecil: $ = ambil 1 elemen, $$ = ambil banyak
   ===================================================== */
const $  = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


/* =====================================================
   1. TAB PORTFOLIO (Projects / Certificates / Tech Stack)
   ===================================================== */
$$('.tabs button').forEach((btn) => {
  btn.addEventListener('click', () => {
    $$('.tabs button, .pane').forEach((el) => el.classList.remove('on'));
    btn.classList.add('on');
    $('#' + btn.dataset.t).classList.add('on');
  });
});


/* =====================================================
   2. MENU NAVBAR AKTIF SAAT SCROLL
   ===================================================== */
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    $$('nav a').forEach((link) => {
      link.classList.toggle('on', link.getAttribute('href') === '#' + entry.target.id);
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });

$$('section').forEach((s) => sectionObserver.observe(s));


/* =====================================================
   3. KARTU ID: BISA DITARIK LALU DILEPAS
   ===================================================== */
const swing = $('#sw');
let dragging = false;

swing.addEventListener('pointerdown', (e) => {
  dragging = true;
  swing.style.animation = 'none';
  swing.setPointerCapture(e.pointerId);
});

swing.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  const box = swing.getBoundingClientRect();
  const centerX = box.left + box.width / 2;
  const angle = Math.max(-25, Math.min(25, (e.clientX - centerX) / 6));
  swing.style.transform = `rotate(${angle}deg)`;
});

swing.addEventListener('pointerup', () => {
  dragging = false;
  swing.style.transition = 'transform 1.2s cubic-bezier(.3,1.6,.5,1)';
  swing.style.transform = 'rotate(0deg)';
  setTimeout(() => {
    swing.style.transition = '';
    swing.style.animation = '';
  }, 1200);
});


/* =====================================================
   4. FORM PESAN
   Catatan: ini baru validasi tampilan, belum mengirim email.
   ===================================================== */
$('#send').addEventListener('click', () => {
  const info = $('#ok');
  const nama = $('#n1'), email = $('#e1'), pesan = $('#m1');

  if (!nama.value || !email.value || !pesan.value) {
    info.style.color = '#f19a9a';
    info.textContent = 'Isi nama, email, dan pesan dulu.';
    return;
  }

  info.style.color = '#9ee6a8';
  info.textContent = 'Pesan terkirim. Terima kasih!';
  nama.value = email.value = pesan.value = '';
});


/* =====================================================
   5. KOMENTAR
   Catatan: komentar hanya tersimpan sementara di halaman.
   ===================================================== */
$('#post').addEventListener('click', () => {
  const nama = $('#n2'), isi = $('#c2');
  if (!nama.value.trim() || !isi.value.trim()) return;

  const item = document.createElement('div');
  const name = document.createElement('b');
  const text = document.createElement('span');
  name.textContent = nama.value.trim();
  text.textContent = isi.value.trim();
  item.append(name, text);
  $('#cm').prepend(item);

  nama.value = isi.value = '';
});
