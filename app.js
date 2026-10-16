/* Chondam trial site — shared data + behaviour. Plain JS, no build step. */
(function () {
  'use strict';

  // ---- Photos: free images from Wikimedia Commons (hotlinked for the trial) ----
  var IMG = {
    bibimbap:  { file: 'Seoul Bibimbap (beef) - Time For Kimchi.jpg', lic: 'CC0', by: 'Andy Li' },
    samgyeop:  { file: 'Korean.cuisine-Samgyeopsal-01.jpg', lic: 'CC BY 2.0', by: 'hellochris' },
    samgyeop2: { file: 'Samgyeopsal dinner 2.jpg', lic: 'CC BY 4.0', by: '에그란' },
    samgyetang:{ file: 'Samgye-tang 2.jpg', lic: 'CC0', by: 'wizdata' },
    pajeon:    { file: 'Haemul-pajeon 1.jpg', lic: 'CC BY 2.0', by: 'Jirka Matousek' },
    tteok:     { file: 'Korean.snacks-Tteokbokki-08.jpg', lic: 'CC BY 2.0', by: 'jetalone' },
    gimbap:    { file: 'Gimbap (pixabay).jpg', lic: 'CC0', by: 'changupn' },
    chapchae:  { file: 'Korean.food-Chapchae-01.jpg', lic: 'CC BY-SA 2.0', by: 'ayustety' },
    bulgogi:   { file: 'Bulgogi (Marinated beef. Served with rice) - Kogi 2023-09-11.jpg', lic: 'CC0', by: 'Andy Li' },
    sundubu:   { file: 'Korean stew-Sundubu jjigae-05.jpg', lic: 'CC BY-SA 2.0', by: 'titanium22' },
    sundubu2:  { file: 'Sundubu jjigae with seafood and beef from Lighthouse Tofu.jpg', lic: 'CC BY-SA 4.0', by: 'Ser Amantio di Nicolao' },
    kimchifr:  { file: 'Kimchi fried rice.jpg', lic: 'CC0', by: 'Sharon Ang' },
    budae:     { file: 'Budae-jjigae 1.jpg', lic: 'CC BY 2.0', by: 'lazy fri13th' },
    ramyeon:   { file: 'Ramyeon 1.jpg', lic: 'CC BY-SA 2.0', by: 'stu_spivack' },
    seolleong: { file: 'Seolleongtang.jpg', lic: 'CC0', by: '이동원' },
    jeyuk:     { file: 'Jeyuk-bokkeum 1.jpg', lic: 'CC BY-SA 2.0', by: 'Charles Haynes' },
    mandu:     { file: 'Mandu in Korean restaurant.jpg', lic: 'CC BY-SA 3.0', by: 'Lionel Allorge' },
    nakji:     { file: 'Nakji-bokkeum.jpg', lic: 'CC BY 4.0', by: '박家상민' }
  };

  function fileUnderscored(key) { return IMG[key].file.replace(/ /g, '_'); }
  function imgUrl(key, w) {
    return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(fileUnderscored(key)) + '?width=' + (w || 640);
  }
  function pageUrl(key) {
    return 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fileUnderscored(key));
  }

  // ---- Menu data ----
  // cat: rice | soup | share   type: set (定食) | side (単品)
  // spice: 0 辛くない, 1 ピリ辛, 2 しっかり辛い, -1 未分類（店舗確認待ち）
  var ITEMS = [
    { name: 'ビビンバ', desc: '四種の野菜をアツアツご飯に。コチュジャンで好みの辛さに。', cat: 'rice', type: 'set', spice: 1, img: 'bibimbap' },
    { name: 'サムギョプサル', desc: '焼いた豚バラを自家製チョレギソースのサラダにのせて。', cat: 'rice', type: 'set', spice: 0, img: 'samgyeop' },
    { name: '豚キムチ丼', desc: '豚肉とキムチの甘辛炒め。少し辛め。', cat: 'rice', type: 'set', spice: 1, img: null },
    { name: 'キムチチャーハン', desc: '自家製キムチの味。玉子焼きをのせて。', cat: 'rice', type: 'set', spice: 1, img: 'kimchifr' },
    { name: 'ブルコギチャーハン', desc: 'ブルコギの旨みをご飯にまとわせた一品。', cat: 'rice', type: 'set', spice: -1, img: null },
    { name: 'ブルコギ丼', desc: '自家製の甘めのたれ。お子さまにも人気。', cat: 'rice', type: 'set', spice: 0, img: 'bulgogi' },
    { name: 'レッドブルコギ', desc: '辛みそ味の豚肉丼。辛いもの好きな方に。', cat: 'rice', type: 'set', spice: 2, img: 'jeyuk' },
    { name: 'スンドゥブラーメン', desc: '旨辛のスンドゥブにラーメンを合わせて。', cat: 'soup', type: 'set', spice: 2, img: 'ramyeon' },
    { name: 'ブデチゲラーメン', desc: 'チゲ仕立ての温かいラーメン。', cat: 'soup', type: 'set', spice: -1, img: 'budae' },
    { name: 'スンドゥブ', desc: 'やわらかい豆腐の辛口チゲ。', cat: 'soup', type: 'set', spice: 2, img: 'sundubu' },
    { name: 'サムゲタン', desc: 'やさしい味で体の芯から温まる。', cat: 'soup', type: 'set', spice: 0, img: 'samgyetang' },
    { name: 'ソルロンタン', desc: 'じっくり煮込んだ、やさしい牛骨スープ。', cat: 'soup', type: 'set', spice: -1, img: 'seolleong' },
    { name: 'ダックゴムタン', desc: '鶏を煮込んだ滋味深いスープ。', cat: 'soup', type: 'set', spice: -1, img: null },
    { name: 'チヂミ', desc: '野菜・海鮮・キムチ・チーズ・ブルコギの5種類。', cat: 'share', type: 'side', spice: -1, img: 'pajeon' },
    { name: 'トッポキ', desc: '特製の甘辛ソース。チーズ、ラポッキも。', cat: 'share', type: 'side', spice: 1, img: 'tteok' },
    { name: 'キンパ', desc: '野菜のみと、牛肉入りブルコギキンパ。', cat: 'share', type: 'side', spice: 0, img: 'gimbap' },
    { name: '餅入りブルコギ', desc: '甘いたれと餅の食感。おつまみにも人気。', cat: 'share', type: 'side', spice: 0, img: null },
    { name: 'チョレギサムギョプサル', desc: 'チョレギサラダに餅と豚バラをのせて。', cat: 'share', type: 'side', spice: -1, img: 'samgyeop2' },
    { name: 'ホルモン炒め', desc: 'コチュジャン味で、ご飯にもお酒にも合う。', cat: 'share', type: 'side', spice: 2, img: null },
    { name: '水餃子', desc: '韓国風の水餃子。', cat: 'share', type: 'side', spice: -1, img: 'mandu' },
    { name: 'タコキムチ', desc: 'タコとキムチを合わせた一品。', cat: 'share', type: 'side', spice: -1, img: 'nakji' },
    { name: '海鮮スンドゥブ', desc: 'エビ・イカ・アサリを使った旨みたっぷりのチゲ。', cat: 'soup', type: 'side', spice: 2, img: 'sundubu2' },
    { name: '餃子スンドゥブ', desc: '肉餃子の肉汁が辛いスンドゥブに溶け合う。', cat: 'soup', type: 'side', spice: 2, img: 'sundubu' },
    { name: 'チャプチェ', desc: '春雨と野菜を炒めた伝統料理。丼にしても。', cat: 'share', type: 'side', spice: 0, img: 'chapchae' }
  ];
  var POPULAR = ['ビビンバ', 'サムギョプサル', 'サムゲタン', 'チヂミ'];

  function spiceLabel(s) { return s === 0 ? '辛くない' : s === 1 ? 'ピリ辛' : s === 2 ? 'しっかり辛い' : '辛さはスタッフへ'; }
  function spiceClass(s) { return s === 0 ? 's0' : s === 1 ? 's1' : s === 2 ? 's2' : ''; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // ---- Business status (Asia/Tokyo). Mon/Tue/Thu/Fri/Sat 11-15 & 17-21, closed Wed/Sun ----
  var DAYS = ['日', '月', '火', '水', '木', '金', '土'];
  function isClosedDay(d) { return d === 0 || d === 3; }
  function statusAt(now) {
    var d = now.getDay(), m = now.getHours() * 60 + now.getMinutes();
    var nextD = (d + 1) % 7;
    while (isClosedDay(nextD)) nextD = (nextD + 1) % 7;
    var nextTxt = '次の営業は' + DAYS[nextD] + '曜 11:00から';
    if (isClosedDay(d)) return { label: '本日は定休日', sub: nextTxt, color: '#CDBBA5' };
    if (m < 660) return { label: '開店前', sub: '11:00から営業', color: '#FFC93C' };
    if (m < 900) return { label: '営業中', sub: '15:00まで（夜は17:00から）', color: '#7ED6A0' };
    if (m < 1020) return { label: '中休み', sub: '17:00から営業', color: '#FFC93C' };
    if (m < 1260) return { label: '営業中', sub: '21:00まで', color: '#7ED6A0' };
    return { label: '本日の営業は終了', sub: nextTxt, color: '#CDBBA5' };
  }
  function tokyoNow() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  }

  // ---- Rendering helpers ----
  function dishCard(it, opts) {
    opts = opts || {};
    var photo = it.img
      ? '<img src="' + imgUrl(it.img, opts.w || 640) + '" alt="' + esc(it.name) + '（イメージ写真）" loading="lazy" width="640" height="480">'
      : '<span>写真準備中</span>';
    var tag = opts.tag ? '<span class="rec-tag">' + esc(opts.tag) + '</span>' : '';
    var html = '<div class="ph">' + photo + '</div><div class="body">' + tag +
      '<strong>' + esc(it.name) + '</strong><span class="desc">' + esc(it.desc) + '</span>' +
      '<span class="meta">' + spiceLabel(it.spice) + (opts.price === false ? '' : '　[価格]') + '</span></div>';
    var cls = 'dish reveal ' + spiceClass(it.spice);
    return opts.href
      ? '<a class="' + cls + '" href="' + opts.href + '">' + html + '</a>'
      : '<div class="' + cls + '">' + html + '</div>';
  }
  function chipBtn(label, pressed, cls) {
    return '<button type="button" class="chip' + (cls ? ' ' + cls : '') + '" aria-pressed="' + (pressed ? 'true' : 'false') + '">' + esc(label) + '</button>';
  }
  function bindChips(container, handlers) {
    var btns = container.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) (function (i) { btns[i].addEventListener('click', handlers[i]); })(i);
  }

  // ---- Scroll reveal (also called after dynamic re-renders) ----
  var io = null;
  function observeReveals() {
    var els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('in');
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
    }
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }
  function markStaticReveals() {
    var sel = '.eyebrow,.lead,h2.display,.voices figure,.access .cols>div,.page-head>*';
    var els = document.querySelectorAll(sel);
    for (var i = 0; i < els.length; i++) {
      els[i].classList.add('reveal');
      if (els[i].parentNode && els[i].parentNode.className === 'voices') els[i].style.transitionDelay = (i % 3) * 0.12 + 's';
    }
  }

  // ---- Hero slideshow ----
  function initHero(hero) {
    var slides = [['samgyeop', 'サムギョプサル'], ['bibimbap', 'ビビンバ'], ['samgyetang', 'サムゲタン'], ['pajeon', 'チヂミ']];
    hero.innerHTML = slides.map(function (s, i) {
      return '<img src="' + imgUrl(s[0], 1400) + '" alt="' + s[1] + '（イメージ写真）" width="1400" height="1050"' + (i ? ' loading="lazy"' : '') + (i === 0 ? ' class="on"' : '') + '>';
    }).join('') + '<span class="hero-cap" aria-hidden="true">' + slides[0][1] + '</span>';
    var imgs = hero.querySelectorAll('img');
    var cap = hero.querySelector('.hero-cap');
    var idx = 0;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    setInterval(function () {
      imgs[idx].classList.remove('on');
      idx = (idx + 1) % imgs.length;
      imgs[idx].classList.add('on');
      cap.textContent = slides[idx][1];
    }, 5000);
  }

  // ---- Status pill ----
  function renderStatus() {
    var el = document.getElementById('status');
    if (!el) return;
    var s = statusAt(tokyoNow());
    el.innerHTML = '<span class="pill" style="color:' + s.color + ';border-color:' + s.color + '"><span class="dot"></span>' + esc(s.label) + '</span><small>' + esc(s.sub) + '</small>';
  }

  // ---- Quiz (index) ----
  function initQuiz() {
    var root = document.getElementById('quiz');
    if (!root) return;
    var st = { spice: null, cat: null };
    var spiceBox = root.querySelector('[data-q="spice"]');
    var catBox = root.querySelector('[data-q="cat"]');
    var out = root.querySelector('[data-q="out"]');
    var spiceOpts = [['辛くないのがいい', 0], ['ピリ辛くらい', 1], ['辛いの大好き', 2]];
    var catOpts = [['ごはんでしっかり', 'rice'], ['あたたかい汁もの', 'soup'], ['つまみ・シェア', 'share']];
    function draw() {
      spiceBox.innerHTML = spiceOpts.map(function (o) { return chipBtn(o[0], st.spice === o[1], 'y'); }).join('');
      catBox.innerHTML = catOpts.map(function (o) { return chipBtn(o[0], st.cat === o[1], 'y'); }).join('');
      bindChips(spiceBox, spiceOpts.map(function (o) { return function () { st.spice = o[1]; draw(); }; }));
      bindChips(catBox, catOpts.map(function (o) { return function () { st.cat = o[1]; draw(); }; }));
      if (st.spice === null || st.cat === null) {
        out.innerHTML = '<div class="empty">上の2つを選ぶと、ここにおすすめが表示されます。</div>';
        return;
      }
      var res = ITEMS.filter(function (it) { return it.cat === st.cat && it.spice >= 0; })
        .sort(function (a, b) { return Math.abs(a.spice - st.spice) - Math.abs(b.spice - st.spice); })
        .slice(0, 3);
      out.innerHTML = '<div class="grid quiz-res">' + res.map(function (it) { return dishCard(it, { tag: 'おすすめ', price: false, w: 560 }); }).join('') + '</div>';
      observeReveals();
    }
    draw();
  }

  // ---- Popular (index) ----
  function initPopular() {
    var el = document.getElementById('popular');
    if (!el) return;
    el.innerHTML = POPULAR.map(function (n) {
      var it = ITEMS.filter(function (x) { return x.name === n; })[0];
      return dishCard(it, { href: 'menu.html', price: false, w: 560 });
    }).join('');
  }

  // ---- Menu explorer (menu.html) ----
  function initMenu() {
    var root = document.getElementById('menu-app');
    if (!root) return;
    var st = { mode: 'all', spice: 'all' };
    var modeBox = root.querySelector('[data-f="mode"]');
    var spiceBox = root.querySelector('[data-f="spice"]');
    var grid = root.querySelector('[data-f="grid"]');
    var modes = [['すべて', 'all'], ['ランチ・定食', 'set'], ['夜・おつまみ・単品', 'side']];
    var spices = [['すべて', 'all'], ['辛くない', 0], ['ピリ辛', 1], ['しっかり辛い', 2]];
    function draw() {
      modeBox.innerHTML = modes.map(function (o) { return chipBtn(o[0], st.mode === o[1]); }).join('');
      spiceBox.innerHTML = spices.map(function (o) { return chipBtn(o[0], st.spice === o[1]); }).join('');
      bindChips(modeBox, modes.map(function (o) { return function () { st.mode = o[1]; draw(); }; }));
      bindChips(spiceBox, spices.map(function (o) { return function () { st.spice = o[1]; draw(); }; }));
      var list = ITEMS.filter(function (it) {
        return (st.mode === 'all' || it.type === st.mode) && (st.spice === 'all' || it.spice === st.spice);
      });
      grid.innerHTML = list.length
        ? list.map(function (it) { return dishCard(it); }).join('')
        : '<div class="empty" style="flex:1 1 100%">この条件に合う料理はありません。条件を変えてみてください。</div>';
      observeReveals();
    }
    draw();
  }

  // ---- Credits (every image actually used on the page) ----
  function renderCredits() {
    var el = document.getElementById('credits-list');
    if (!el) return;
    // List every photo the site can show (quiz / filters reveal more images after load).
    var keys = Object.keys(IMG);
    el.innerHTML = keys.map(function (k) {
      var m = IMG[k];
      return '<li><a href="' + pageUrl(k) + '" rel="noopener">' + esc(m.file) + '</a> — ' + esc(m.by) + ' / ' + esc(m.lic) + '</li>';
    }).join('');
  }

  // Expose for tests
  window.__chondam = { statusAt: statusAt, ITEMS: ITEMS, imgUrl: imgUrl };

  document.addEventListener('DOMContentLoaded', function () {
    renderStatus();
    setInterval(renderStatus, 60000);
    initQuiz();
    initPopular();
    initMenu();
    var hero = document.getElementById('hero-img');
    if (hero) initHero(hero);
    markStaticReveals();
    observeReveals();
    renderCredits();
  });
})();
