
/* DATA */
const EMAIL = "maruruyuli@gmail.com";

const LINKS = {
    email: "mailto:maruruyuli@gmail.com",
    gmail: "https://mail.google.com/mail/?view=cm&fs=1&to=maruruyuli@gmail.com",
    instagram: "https://www.instagram.com/yliixz_/",
    github: "https://github.com/yulimaruru"
};

const ROLES = ["Halo", "Selamat Datang di Website Saya", "Pencinta desain antarmuka"];
const SKILLS = [
  ["HTML5","Struktur halaman web: heading, section, form, dan semantik dasar."],
  ["CSS3","Tampilan dan layout: flexbox, grid, warna, dan animasi sederhana."],
  ["Bootstrap 5","Framework responsif agar tampilan nyaman di HP maupun laptop."],
  ["JavaScript","Interaksi halaman, seperti tombol, filter, dan perubahan tampilan."],
  ["Python","Dasar pemrograman: logika, fungsi, dan pengolahan data sederhana."],
  ["Flask","Dasar web framework Python untuk membuat aplikasi web."],
  ["Figma","Desain UI/UX: wireframe, komponen, dan prototipe antarmuka."],
  ["Teamwork","Kolaborasi dan komunikasi dalam proyek kelompok serta organisasi."]
];
const root = document.documentElement;
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];
const save = (k,v) => { try{ localStorage.setItem(k,v) }catch(e){} };
const load = k => { try{ return localStorage.getItem(k) }catch(e){ return null } };

/* Tautan sosial di bagian atas */
$('#lnk-ig').href = LINKS.instagram;
$('#lnk-gh').href = LINKS.github;
$('#lnk-mail').href = LINKS.gmail;
$('#lnk-mail').target = '_blank';
$('#lnk-mail').rel = 'noopener noreferrer';

/* Tema: warna aksen + mode gelap */
function setAccent(a){
  root.dataset.accent = a;
  $$('.dot').forEach(d => d.setAttribute('aria-pressed', d.dataset.accent === a));
  save('accent', a);
}
function setMode(m){
  root.dataset.mode = m;
  const b = $('#mode'); b.textContent = m === 'dark' ? 'Terang' : 'Gelap';
  b.setAttribute('aria-pressed', m === 'dark'); save('mode', m);
}
$$('.dot').forEach(d => d.onclick = () => setAccent(d.dataset.accent));
$('#mode').onclick = () => setMode(root.dataset.mode === 'dark' ? 'light' : 'dark');
setAccent(['pink','merah'].includes(load('accent')) ? load('accent') : 'pink');
setMode(load('mode') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

/* Efek cahaya pada nama */
const nama = $('#nama');
nama.addEventListener('pointermove', e => {
  const r = nama.getBoundingClientRect();
  nama.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  nama.style.setProperty('--my', (e.clientY - r.top) + 'px');
});

/* Teks mengetik */
(function typing(){
  const el = $('#typed'); let i = 0, j = 0, del = false;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches){ el.textContent = ROLES[0]; return; }
  (function tick(){
    const w = ROLES[i];
    el.textContent = w.slice(0, j);
    if (!del && j === w.length){ del = true; return setTimeout(tick, 1400); }
    if (del && j === 0){ del = false; i = (i + 1) % ROLES.length; }
    j += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 75);
  })();
})();

/* Keahlian */
const chips = $('#chips'), detail = $('#skill-detail');
SKILLS.forEach(([n, d], idx) => {
  const b = document.createElement('button');
  b.className = 'chip'; b.textContent = n; b.setAttribute('aria-pressed', 'false');
  b.onclick = () => show(idx);
  chips.appendChild(b);
});
function show(idx){
  $$('.chip', chips).forEach((c, k) => c.setAttribute('aria-pressed', k === idx));
  detail.innerHTML = '<h3></h3><p></p>';
  $('h3', detail).textContent = SKILLS[idx][0];
  $('p', detail).textContent = SKILLS[idx][1];
}
show(0);

/* Proyek: buka-tutup detail */
$$('.more').forEach(b => b.onclick = () => {
  const ex = b.nextElementSibling, open = ex.classList.toggle('open');
  b.setAttribute('aria-expanded', open);
  b.textContent = open ? 'Tutup' : 'Selengkapnya';
});

/* Perjalanan: filter */
$$('#filter .chip').forEach(b => b.onclick = () => {
  $$('#filter .chip').forEach(c => c.setAttribute('aria-pressed', c === b));
  $$('.tl li').forEach(li => li.hidden = b.dataset.f !== 'all' && li.dataset.t !== b.dataset.f);
});

/* Hubungi saya: membuka aplikasi email dengan isi formulir */
$('#form').onsubmit = e => {
  e.preventDefault();
  const n = $('#f-nama').value.trim(), m = $('#f-email').value.trim();
  const k = $('#f-perlu').value, p = $('#f-pesan').value.trim();
  const subject = '[' + k + '] Pesan dari ' + n;
  const body = 'Nama: ' + n + '\nEmail: ' + m + '\nKeperluan: ' + k + '\n\n' + p;
  location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  $('#status').textContent = 'Aplikasi email kamu akan terbuka. Tekan kirim di sana untuk menyelesaikan.';
};

/* Progres scroll + menu aktif */
const links = $$('.links a');
addEventListener('scroll', () => {
  const h = root.scrollHeight - innerHeight;
  $('#progress').style.width = (scrollY / h * 100) + '%';
  let cur = '';
  $$('main section').forEach(s => { if (s.getBoundingClientRect().top < 140) cur = '#' + s.id; });
  links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === cur));
}, {passive:true});
