const NUM = "919359166654"; // WhatsApp number with country code
const wa = t => "https://wa.me/" + NUM + "?text=" + encodeURIComponent(t);
document.querySelectorAll("[data-wa]").forEach(a => a.href = wa(a.dataset.wa));

/* mobile nav */
const burger = document.getElementById("burger"), nav = document.getElementById("nav");
function setNav(open) {
  nav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.onclick = () => setNav(!nav.classList.contains("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setNav(false)));
addEventListener("keydown", e => { if (e.key === "Escape") setNav(false); });
addEventListener("resize", () => { if (innerWidth > 760) setNav(false); });

/* highlight the section in view */
const links = [...nav.querySelectorAll("a")];
const targets = links.map(a => document.querySelector(a.getAttribute("href")));
function spy() {
  const y = scrollY + innerHeight * 0.35;
  let cur = 0;
  targets.forEach((t, i) => { if (t && t.offsetTop <= y) cur = i; });
  if (innerHeight + scrollY >= document.body.scrollHeight - 4) cur = targets.length - 1;
  links.forEach((a, i) => a.classList.toggle("active", i === cur));
}
addEventListener("scroll", spy, { passive: true }); addEventListener("resize", spy); spy();

/* food photos: replace files in /images or edit this list */
const S = [
  ["images/dish1.jpg", "Chilli Garlic Chicken"],
  ["images/dish2.jpg", "Chicken Fry"],
  ["images/dish3.jpg", "Mutton Masala"],
  ["images/dish4.jpg", "Mutton Rassa"]
];

/* hero slideshow */
const arch = document.getElementById("arch"), dots = document.getElementById("dots");
arch.innerHTML = S.map(s => `<img src="${s[0]}" alt="${s[1]}">`).join("") + '<div class="cap" id="cap"></div>';
const imgs = [...arch.querySelectorAll("img")], cap = document.getElementById("cap");
S.forEach((s, i) => {
  const b = document.createElement("button");
  b.setAttribute("aria-label", "Show " + s[1]);
  b.onclick = () => { go(i); restart(); };
  dots.appendChild(b);
});
let cur = 0, timer;
function go(i) {
  cur = i;
  imgs.forEach((m, k) => { m.classList.remove("on"); if (k === i) { void m.offsetWidth; m.classList.add("on"); } });
  [...dots.children].forEach((d, k) => d.setAttribute("aria-current", k === i));
  cap.textContent = S[i][1];
}
function restart() { clearInterval(timer); timer = setInterval(() => go((cur + 1) % S.length), 4500); }
go(0); restart();

/* gallery strip (list repeated so the loop never shows a gap) */
const card = s => `<div class="dish"><img src="${s[0]}" alt="${s[1]}" loading="lazy"><span>${s[1]}</span></div>`;
document.getElementById("track").innerHTML = S.concat(S, S, S).map(card).join("");

/* menu: [name, v=veg / n=non-veg, price, description] */
const MENU = {
  "Chicken": [
    ["Chicken Fry", "n", 260, "Crisp, spiced and shallow-fried"],
    ["Chilli Garlic Chicken", "n", 290, "Dry-tossed with whole chillies and garlic"],
    ["Chicken Sukka", "n", 280, "Dry masala, roasted coconut"],
    ["Chicken Handi", "n", 300, "Slow-cooked in a sealed pot"],
    ["Tandoori Chicken", "n", 340, "Overnight marinade, charred edges"],
    ["Chicken Thali", "n", 220, "Rassa, sukka, bhakri, rice, solkadhi"]],
  "Mutton & Fish": [
    ["Mutton Masala", "n", 420, "Thick gravy, house masala"],
    ["Mutton Rassa", "n", 430, "Spicy thin curry, lime on the side"],
    ["Mutton Sukka", "n", 440, "Dry-roasted on the bone"],
    ["Pomfret Fry", "n", 420, "Rawa-coated, fried to order"],
    ["Bombil Fry", "n", 220, "Bombay duck, crisp and light"],
    ["Fish Thali", "n", 260, "Fry, curry, bhakri, rice, solkadhi"]],
  "Veg": [
    ["Paneer Masala", "v", 240, "Rich tomato-onion gravy"],
    ["Dal Tadka", "v", 150, "Yellow dal, ghee, garlic tadka"],
    ["Mix Veg", "v", 170, "Seasonal vegetables, dry masala"],
    ["Zunka Bhakar", "v", 130, "Besan zunka with jowar bhakri"],
    ["Veg Thali", "v", 180, "Two sabzi, dal, rice, bhakri, sweet"],
    ["Veg Pulao", "v", 160, "Whole spices, served with raita"]],
  "Roti & Rice": [
    ["Jowar Bhakri", "v", 25, "Hand-rolled, cooked on a tawa"],
    ["Tandoori Roti", "v", 20, "Whole wheat, soft inside"],
    ["Butter Naan", "v", 50, "Brushed with butter"],
    ["Steamed Rice", "v", 80, "Fragrant, served hot"],
    ["Jeera Rice", "v", 110, "Tempered with cumin"],
    ["Solkadhi", "v", 40, "Cooling kokum and coconut drink"]]
};
const tabs = document.getElementById("tabs"), items = document.getElementById("items");
function show(k) {
  [...tabs.children].forEach(b => b.setAttribute("aria-selected", b.textContent === k));
  items.innerHTML = MENU[k].map(([n, t, p, d]) =>
    `<div class="item"><div class="row"><h3><i class="${t === "v" ? "veg" : "nv"}" title="${t === "v" ? "Veg" : "Non-veg"}"></i>${n}</h3><span class="dl"></span><em>&#8377;${p}</em></div><p>${d}</p></div>`).join("");
}
Object.keys(MENU).forEach(k => {
  const b = document.createElement("button");
  b.className = "tab"; b.role = "tab"; b.textContent = k; b.onclick = () => show(k);
  tabs.appendChild(b);
});
show("Chicken");

/* contact form -> WhatsApp */
const nm = document.getElementById("nm"), ms = document.getElementById("ms"), send = document.getElementById("send");
function upd() { send.href = wa((nm.value ? "Hi, I am " + nm.value + ". " : "Hello Adhira's Kitchen. ") + ms.value); }
nm.oninput = ms.oninput = upd; upd();
document.getElementById("y").textContent = new Date().getFullYear();
