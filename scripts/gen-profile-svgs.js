// Generates the animated profile SVGs for github.com/IvanFuentesB.
// Usage (from repo root): node scripts/gen-profile-svgs.js .
// Zero dependencies. Overwrites assets/*.svg and prints size + sha256 prefix per file.
function buildAll() {
  const BG = "#0f1216", CARD = "#15191e", CELL = "#1a1f25", ACCENT = "#3d444e", BRIGHT = "#ffa657",
    MINT = "#d0d4da", GLOW = "#f6f2ea", LEVELS = ["#1e232a", "#272d35", "#3a414b", "#8a5a33"],
    AMBER = "#ffa657", RED = "#e5534b", BLUE = "#4c8df0", YELLOW = "#e8c547", TEXT2 = "#9aa1a9";
  const MONO = "ui-monospace,SFMono-Regular,'SF Mono',Menlo,Consolas,'Liberation Mono','DejaVu Sans Mono',monospace";
  const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif";
  const f1 = x => x.toFixed(1), f2 = x => x.toFixed(2);
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  function rng(seed) {
    let a = seed >>> 0;
    const r = () => { a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    return { r, uniform: (lo, hi) => lo + (hi - lo) * r(), randint: (lo, hi) => lo + Math.floor(r() * (hi - lo + 1)), choice: arr => arr[Math.floor(r() * arr.length)] };
  }
  const GLYPHS = {
    A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"], B: ["####.", "#...#", "#...#", "####.", "#...#", "#...#", "####."],
    D: ["####.", "#...#", "#...#", "#...#", "#...#", "#...#", "####."], E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
    F: ["#####", "#....", "#....", "####.", "#....", "#....", "#...."], I: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "#####"],
    N: ["#...#", "##..#", "#.#.#", "#..##", "#...#", "#...#", "#...#"], R: ["####.", "#...#", "#...#", "####.", "#.#..", "#..#.", "#...#"],
    S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."], T: ["#####", "..#..", "..#..", "..#..", "..#..", "..#..", "..#.."],
    U: ["#...#", "#...#", "#...#", "#...#", "#...#", "#...#", ".###."], V: ["#...#", "#...#", "#...#", "#...#", "#...#", ".#.#.", "..#.."],
    " ": [".....", ".....", ".....", ".....", ".....", ".....", "....."],
  };
  function pixelCols(text) {
    const cols = [];
    [...text].forEach((ch, i) => {
      const g = GLYPHS[ch];
      for (let c = 0; c < 5; c++) cols.push([0, 1, 2, 3, 4, 5, 6].filter(r => g[r][c] === "#"));
      if (i !== text.length - 1) cols.push([]);
    });
    return cols;
  }
  const corners = (x, y, w, h, k) => [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]]
    .map(([px, py, dx, dy]) => `<path d="M${f1(px)} ${f1(py + dy * k)}V${f1(py)}H${f1(px + dx * k)}"/>`).join("");

  // ------------------------------------------------------------ header
  function header() {
    const W = 1000, H = 300, PITCH = 14, CS = 11, COLS = 71, ROWS = 21;
    const X0 = (W - (COLS * PITCH - (PITCH - CS))) / 2, Y0 = (H - (ROWS * PITCH - (PITCH - CS))) / 2;
    const NAME = "IVAN FUENTES BEDEREU", NP = 7, NS = 6, NAME_Y = 58, ROAD_Y = 262, CP = 4;
    const SUB = "MECHATRONICS ENGINEERING · ROBOTICS · AUTONOMOUS SYSTEMS";
    const TYPED = "ivan@eindhoven:~$ make robots-that-work-outside-the-demo";
    const CAR = ["............cccl.......", ".............m.........", ".............m.........", ".............m.........",
      ".....bbbbbbbbbbbbb.....", ".....b.g.g.g.g.g.b.....", ".rbbbbbbbbbbbbbbbbbbbbf", "aaaaaaaaaaaaaaaaaaaaaaa",
      "..wwww...........wwww..", "..whhw...........whhw..", "...ww.............ww..."];
    const CC = { c: MINT, l: GLOW, m: ACCENT, b: BRIGHT, a: ACCENT, w: "#4a525d", h: MINT, f: GLOW, r: RED, g: GLOW };
    const R = rng(7), o = [], a = s => o.push(s);
    const cw = 8.6, tw = TYPED.length * cw, tx = (W - tw) / 2;
    // typewriter keyframes: type, hold, clear
    const n = TYPED.length, total = 10, typeT = 4.2, holdEnd = 9.2, vals = [], kts = [];
    for (let i = 0; i <= n; i++) { vals.push(f1(tx + i * cw)); kts.push((i / n * typeT / total).toFixed(4)); }
    vals.push(f1(tx)); kts.push((holdEnd / total).toFixed(4));
    const anim = attr => `<animate attributeName="${attr}" dur="${total}s" repeatCount="indefinite" calcMode="discrete" values="${vals.join(";")}" keyTimes="${kts.join(";")}"/>`;
    a(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Ivan Fuentes Bedereu - Mechatronics, robotics, autonomous systems">`);
    a(`<title>Ivan Fuentes Bedereu</title><defs>`);
    a(`<pattern id="grid" x="${X0}" y="${Y0}" width="${PITCH}" height="${PITCH}" patternUnits="userSpaceOnUse"><rect width="${CS}" height="${CS}" rx="2" fill="${CELL}"/></pattern>`);
    a(`<radialGradient id="vig" cx="50%" cy="44%" r="62%"><stop offset="0" stop-color="${BG}" stop-opacity=".93"/><stop offset=".55" stop-color="${BG}" stop-opacity=".72"/><stop offset="1" stop-color="${BG}" stop-opacity="0"/></radialGradient>`);
    a(`<linearGradient id="cone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${MINT}" stop-opacity=".55"/><stop offset="1" stop-color="${MINT}" stop-opacity="0"/></linearGradient>`);
    a(`<linearGradient id="roadfade" x1="0" x2="1"><stop offset="0" stop-color="${ACCENT}" stop-opacity="0"/><stop offset=".15" stop-color="${ACCENT}"/><stop offset=".85" stop-color="${ACCENT}"/><stop offset="1" stop-color="${ACCENT}" stop-opacity="0"/></linearGradient>`);
    a(`<linearGradient id="scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${MINT}" stop-opacity="0"/><stop offset=".85" stop-color="${MINT}" stop-opacity=".07"/><stop offset="1" stop-color="${MINT}" stop-opacity=".16"/></linearGradient>`);
    a(`<clipPath id="frame"><rect width="${W}" height="${H}" rx="14"/></clipPath>`);
    a(`<clipPath id="typed"><rect x="0" y="160" height="30" width="0">${anim("width")}</rect></clipPath></defs>`);
    a(`<style>@keyframes tw{0%,100%{opacity:1}50%{opacity:.18}}.t1{animation:tw 3.1s ease-in-out infinite}.t2{animation:tw 4.3s ease-in-out infinite}.t3{animation:tw 5.7s ease-in-out infinite}.t4{animation:tw 7.2s ease-in-out infinite}` +
      `@keyframes boot{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}@keyframes sh{0%,64%,100%{fill:${GLOW}}72%{fill:${BRIGHT}}82%{fill:${GLOW}}}` +
      `.n{fill:${GLOW};animation:boot .45s cubic-bezier(.2,.8,.2,1) both,sh 7s linear infinite}` +
      `@keyframes drive{from{transform:translateX(-150px)}to{transform:translateX(1100px)}}.car{animation:drive 11s linear infinite}` +
      `@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-1.5px)}}.body{animation:bob .35s ease-in-out infinite}` +
      `@keyframes cone{0%,100%{opacity:.55}50%{opacity:1}}.cone{animation:cone 1.1s ease-in-out infinite}` +
      `@keyframes hub{0%,49%{opacity:1}50%,100%{opacity:.15}}.hub{animation:hub .18s steps(1) infinite}` +
      `@keyframes led{0%,40%{opacity:1}41%,100%{opacity:.2}}.led{animation:led 1.6s steps(1) infinite}` +
      `@keyframes scan{0%{transform:translateY(-40px)}100%{transform:translateY(340px)}}.scan{animation:scan 6.5s linear infinite}` +
      `@keyframes dash{to{stroke-dashoffset:-64}}.dash{animation:dash 1.2s linear infinite}` +
      `@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}.cur{animation:blink 1s steps(1) infinite}` +
      `@keyframes fadein{from{opacity:0}to{opacity:1}}.sub{animation:fadein 1.2s ease-out 1.1s both}</style>`);
    a(`<g clip-path="url(#frame)"><rect width="${W}" height="${H}" fill="${BG}"/><rect width="${W}" height="${H}" fill="url(#grid)"/>`);
    for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
      const dx = Math.abs(c - (COLS - 1) / 2) / ((COLS - 1) / 2), dy = Math.abs(r - (ROWS - 1) / 2) / ((ROWS - 1) / 2);
      const edge = Math.max(dx, dy * 0.6), p = 0.05 + 0.42 * Math.pow(edge, 2.2);
      if (R.r() < p) {
        const lvl = Math.min(3, Math.floor(R.r() * 4 * (0.45 + edge * 0.7)));
        let extra = "";
        if (R.r() < 0.35) extra = ` class="t${R.randint(1, 4)}" style="animation-delay:-${R.uniform(0, 7).toFixed(1)}s"`;
        a(`<rect x="${X0 + c * PITCH}" y="${Y0 + r * PITCH}" width="${CS}" height="${CS}" rx="2" fill="${LEVELS[lvl]}"${extra}/>`);
      }
    }
    a(`<rect width="${W}" height="${H}" fill="url(#vig)"/>`);
    const cols = pixelCols(NAME), nx0 = (W - (cols.length * NP - (NP - NS))) / 2;
    a(`<g>`);
    cols.forEach((rows, ci) => {
      if (!rows.length) return;
      const boot = 0.15 + ci * 0.009 + R.uniform(0, 0.12), shd = 1.6 + ci * 0.022;
      a(`<g class="n" style="animation-delay:${f2(boot)}s,${f2(shd)}s">` + rows.map(r => `<rect x="${f1(nx0 + ci * NP)}" y="${NAME_Y + r * NP}" width="${NS}" height="${NS}" rx="1"/>`).join("") + `</g>`);
    });
    a(`</g>`);
    const subW = 720;
    a(`<text class="sub" x="${(W - subW) / 2}" y="146" textLength="${subW}" lengthAdjust="spacingAndGlyphs" font-family="${MONO}" font-size="15" font-weight="700" fill="${MINT}">${esc(SUB)}</text>`);
    const pl = TYPED.indexOf("$") + 1;
    a(`<g clip-path="url(#typed)"><text x="${f1(tx)}" y="182" textLength="${f1(tw)}" lengthAdjust="spacingAndGlyphs" font-family="${MONO}" font-size="14.3"><tspan fill="${BRIGHT}">${esc(TYPED.slice(0, pl))}</tspan><tspan fill="#e6e8eb">${esc(TYPED.slice(pl))}</tspan></text></g>`);
    a(`<rect class="cur" y="170" width="8" height="16" fill="${BRIGHT}" x="${f1(tx)}">${anim("x")}</rect>`);
    a(`<rect x="0" y="${ROAD_Y + 1}" width="${W}" height="${H - ROAD_Y}" fill="${BG}" opacity=".85"/><rect x="0" y="${ROAD_Y}" width="${W}" height="2" fill="url(#roadfade)"/>`);
    a(`<line class="dash" x1="0" y1="${ROAD_Y + 14}" x2="${W}" y2="${ROAD_Y + 14}" stroke="#2a3038" stroke-width="3" stroke-dasharray="30 34"/>`);
    const carY = ROAD_Y - CAR.length * CP, lx = (CAR[0].indexOf("l") + 1) * CP, ly = carY + CP / 2;
    a(`<g class="car"><polygon class="cone" points="${lx},${ly} ${lx + 150},${ROAD_Y} ${lx + 38},${ROAD_Y}" fill="url(#cone)"/>`);
    a(`<rect class="cone" x="${lx + 38}" y="${ROAD_Y - 1}" width="112" height="3" fill="${GLOW}" opacity=".8"/><g class="body">`);
    CAR.forEach((line, r) => [...line].forEach((ch, c) => {
      if (ch === ".") return;
      let cls = ch === "h" ? ` class="hub"` : "";
      if (ch === "g") cls = ` class="led" style="animation-delay:-${f2(R.uniform(0, 1.6))}s"`;
      a(`<rect x="${c * CP}" y="${carY + r * CP}" width="${CP}" height="${CP}" fill="${CC[ch]}"${cls}/>`);
    }));
    a(`</g></g></g><rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="13.5" fill="none" stroke="#2b313a" stroke-width="1.5"/></svg>`);
    return o.join("\n");
  }

  // ------------------------------------------------------------ terminal / neofetch
  function terminal() {
    const W = 1000, H = 420, BAR = 36;
    const MAP = ["________________________________________________________________", "________________________________________________________________",
      "_______________________gdbbdbaabch_geeg_________________________", "___________________ecaaabcbaabcaabbaaabbbcdg____________________",
      "_________________faabaaadbaaaaaaabbaaaaaaaaac___________________", "________________daaaaaabbabcaaaabbabbbaaaabcabf_________________",
      "_______________caaaaaaaaaaabbabbbabbbaaabaacdbbe________________", "______________cbaaaaaaaaacbccbbccbdedccaabaacbaab_______________",
      "______________ecaaaaaaaabcbccffhijjjgedbabbbcbabab______________", "____________gegdaaaabccbdebdgjkklkkiecaabbaacbbbaah_____________",
      "____________gdbbaaabefggdfhjkkkklkkkfecaggbaaacdbbe_____________", "__________hfdedcaaabdehfgjkkkkkkkkklkhjfefebaabaabadgf__________",
      "____________hdbaaaabefggiijjkkkkkkkkjiffeegfbabaaaaf____________", "___________ggbcaaaacedcddccdfijkkjgeefghhgiieaaabaa_____________",
      "___________heaaaaaaefffeedffegikkjigfdefgijjibbecbeh____________", "_____________gcabbafghggghiihgikkkjjijjjjkkjiegfbabbh___________",
      "_______________gddcfgijjjkkjighkkkkkkkkklkkjighgaae_____________", "________________feeeghjkkkkjhgikkkjjkklllkkjijkebf______________",
      "_________________deefhjjkkjgfegjkjijjijkkkjjgfdaag______________", "________________hgabfghiihhggffgijjjjjhhjjjjdaaehh______________",
      "__________________gaefgjigedefghiiihhfihjjjhbbbdf_______________", "___________________fbfgikjhefijkkkkihjkjjjicaacg________________",
      "____________________ebfgijigfgghhiiijkkjjieaabe_________________", "_____________________icffghihhiijjjkkkjjiigc____________________",
      "_____________________gbffefhiijjjjjjjiihiijk____________________", "____________________ihcffeeefgijijiihghijjikk___________________",
      "___________________ihheeeeeeedeeffffghijjjilkkll________________", "_________________jiiiiifffffeeeffhiijjjjjikllkkllllll___________",
      "_____________kkjjiiiiiijggggggghjjjjjjjjjflllllllllllkkll_______", "__________kjjkkkjijjjjjkjghiihggijjjjjjieillllllllllkklkkkkll___",
      "_______jjiijlllljijjjkkkkkhhiihhghijjjiedllllllllllllklllllkkkkl", "____jjiijjkklllkjjjjjkkkklkhijiiiiijjifcilkjjkkklllllkklllllllkk",
      "__iiijjjkkkklllkjijiihggggijiijjiiiiigdhkjjjjkklllllllklllllllll", "iiijjkkkkkkllllkkkjjihggfggijijkjjiigfhkllllllllllllllkllkllllll",
      "ijjkkkkkkklllllkkkllllkkjihijiijjihghkllllllllllllllllklllklllll"];
    const RAMP = "@%#*+=~-:,..";
    const TONES = [GLOW, MINT, MINT, MINT, "#b4b9c0", "#b4b9c0", "#8f959d", "#8f959d", "#6c727a", "#6c727a", "#50565e", "#50565e"];
    const INFO = [["OS", "Mechatronics Engineering (BEng) @ Fontys"], ["Host", "Eindhoven, NL"],
      ["Kernel", "Embedded C · NXP S32K144 · Arduino"], ["Shell", "Python · C++ · MATLAB"],
      ["Packages", "OpenCV · MediaPipe · PyTorch · MQTT"], ["Tools", "Simulink · LabVIEW · KiCad · SolidWorks"],
      ["Focus", "robotics · autonomous systems · vision"], ["Projects", "NXP-Cup car · CV platformer · Doodle · Ghoti"],
      ["Contact", "ivanfb05@gmail.com"]];
    const grid = MAP.map(row => [...row].map(ch => ch === "_" ? null : "abcdefghijkl".indexOf(ch)));
    const nrows = grid.length, ncols = grid[0].length, PX = 30, PY = BAR + 22, CW = 5.2, LH = 9.45, FS = 8.7;
    const o = [], a = s => o.push(s);
    a(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Terminal card: ivan@eindhoven system info">`);
    a(`<title>ivan@eindhoven — neofetch</title><defs><clipPath id="win"><rect width="${W}" height="${H}" rx="14"/></clipPath>`);
    a(`<linearGradient id="sweep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${GLOW}" stop-opacity="0"/><stop offset=".9" stop-color="${GLOW}" stop-opacity=".06"/><stop offset="1" stop-color="${BRIGHT}" stop-opacity=".55"/></linearGradient>`);
    a(`<clipPath id="pclip"><rect x="${PX - 6}" y="${PY - 10}" width="${f1(ncols * CW + 12)}" height="${f1(nrows * LH + 14)}"/></clipPath></defs>`);
    a(`<style>@keyframes rowin{from{opacity:0}to{opacity:1}}.r{opacity:0;animation:rowin .25s ease-out forwards}` +
      `@keyframes sweep{0%{transform:translateY(-60px)}55%,100%{transform:translateY(360px)}}.sw{animation:sweep 5s cubic-bezier(.4,0,.6,1) 2.2s infinite both}` +
      `@keyframes box{0%,35%{opacity:0;transform:scale(1.08)}45%,88%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1)}}.bx{transform-box:fill-box;transform-origin:center;animation:box 5s ease-out 2.2s infinite both}` +
      `@keyframes lin{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}.l{opacity:0;animation:lin .35s ease-out forwards}` +
      `@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}.cur{animation:blink 1s steps(1) infinite}</style>`);
    a(`<g clip-path="url(#win)"><rect width="${W}" height="${H}" fill="${CARD}"/><rect width="${W}" height="${BAR}" fill="#1b2027"/><line x1="0" y1="${BAR}" x2="${W}" y2="${BAR}" stroke="#2b313a"/>`);
    ["#3a414b", "#3a414b", "#3a414b"].forEach((col, i) => a(`<circle cx="${22 + i * 20}" cy="${BAR / 2}" r="6" fill="${col}"/>`));
    a(`<text x="${W / 2}" y="${BAR / 2 + 4.5}" text-anchor="middle" font-family="${MONO}" font-size="13" fill="#8b929b">ivan@eindhoven: ~/profile — neofetch</text>`);
    a(`<g font-family="${MONO}" font-size="${FS}">`);
    grid.forEach((row, r) => {
      a(`<g class="r" style="animation-delay:${f2(0.25 + r * 0.04)}s">`);
      let c = 0;
      while (c < ncols) {
        if (row[c] === null) { c++; continue; }
        const tone = TONES[row[c]], start = c; let chars = "";
        while (c < ncols && row[c] !== null && TONES[row[c]] === tone) { chars += RAMP[row[c]]; c++; }
        a(`<text x="${f1(PX + start * CW)}" y="${f1(PY + r * LH)}" fill="${tone}" textLength="${f1(chars.length * CW)}" lengthAdjust="spacingAndGlyphs">${esc(chars)}</text>`);
      }
      a(`</g>`);
    });
    a(`</g><g clip-path="url(#pclip)"><rect class="sw" x="${PX - 6}" y="${PY - 10}" width="${f1(ncols * CW + 12)}" height="44" fill="url(#sweep)"/></g>`);
    const fx = PX + 16 * CW, fy = PY + 8.3 * LH - FS, fw = 31 * CW, fh = 16.4 * LH;
    a(`<g class="bx" fill="none" stroke="${BRIGHT}" stroke-width="2.2" stroke-linecap="round">${corners(fx, fy, fw, fh, 14)}`);
    a(`<rect x="${f1(fx)}" y="${f1(fy - 19)}" width="74" height="15" rx="3" fill="${BRIGHT}" stroke="none"/><text x="${f1(fx + 5)}" y="${f1(fy - 8)}" font-family="${MONO}" font-size="10.5" font-weight="700" fill="${BG}" stroke="none">face ✓ ivan</text></g>`);
    const dx = PX + ncols * CW + 28;
    a(`<line x1="${f1(dx)}" y1="${BAR + 18}" x2="${f1(dx)}" y2="${H - 18}" stroke="#2b313a" stroke-dasharray="2 5"/>`);
    const ix = dx + 30, cw = 8.2, head = "ivan@eindhoven", keyw = 10;
    let y = BAR + 44, t = 1.6;
    a(`<g font-family="${MONO}" font-size="14">`);
    a(`<text class="l" style="animation-delay:${f2(t)}s" x="${f1(ix)}" y="${y}" font-weight="700" textLength="${f1(head.length * cw)}" lengthAdjust="spacingAndGlyphs"><tspan fill="${BRIGHT}">ivan</tspan><tspan fill="${MINT}">@</tspan><tspan fill="${BRIGHT}">eindhoven</tspan></text>`);
    y += 16; t += 0.12;
    a(`<rect class="l" style="animation-delay:${f2(t)}s" x="${f1(ix)}" y="${y - 6}" width="${f1(head.length * cw)}" height="2" fill="#4a525d"/>`);
    y += 20;
    for (const [key, val] of INFO) {
      t += 0.12;
      const line = (key + ":").padEnd(keyw) + val;
      a(`<text class="l" style="animation-delay:${f2(t)}s" x="${f1(ix)}" y="${y}" textLength="${f1(line.length * cw)}" lengthAdjust="spacingAndGlyphs" xml:space="preserve"><tspan fill="${BRIGHT}" font-weight="700">${esc(key)}</tspan><tspan fill="#8f959d">:</tspan><tspan fill="#e6e8eb">${esc(" ".repeat(keyw - key.length - 1) + val)}</tspan></text>`);
      y += 25;
    }
    t += 0.15; y += 4;
    a(`<g class="l" style="animation-delay:${f2(t)}s">` + ["#1b2027", "#272d35", "#3d444e", "#6c727a", "#b4b9c0", GLOW, BRIGHT, RED]
      .map((col, i) => `<rect x="${f1(ix + i * 30)}" y="${y - 12}" width="26" height="16" rx="3" fill="${col}" stroke="#2b313a"/>`).join("") + `</g>`);
    y += 36; t += 0.15;
    const prompt = "ivan@eindhoven:~$";
    a(`<text class="l" style="animation-delay:${f2(t)}s" x="${f1(ix)}" y="${y}" fill="${BRIGHT}" textLength="${f1(prompt.length * cw)}" lengthAdjust="spacingAndGlyphs">${prompt}</text>`);
    a(`<g class="l" style="animation-delay:${f2(t)}s"><rect class="cur" x="${f1(ix + prompt.length * cw + 8)}" y="${y - 13}" width="9" height="17" fill="${BRIGHT}"/></g></g>`);
    a(`</g><rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="13.5" fill="none" stroke="#2b313a" stroke-width="1.5"/></svg>`);
    return o.join("\n");
  }

  // ------------------------------------------------------------ project cards
  const CW_ = 480, CH_ = 270, PANEL = 178;
  function frame(num, title, tagline, chips, motif, css) {
    const o = [], a = s => o.push(s), tag = `SHIP ${String(num).padStart(2, "0")}`;
    a(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CW_} ${CH_}" width="${CW_}" height="${CH_}" role="img" aria-label="${esc(title)} - ${esc(tagline)}">`);
    a(`<title>${esc(title)}</title><defs><clipPath id="c"><rect width="${CW_}" height="${CH_}" rx="12"/></clipPath>`);
    a(`<pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="1" fill="#20252c"/></pattern></defs>`);
    a(`<style>${css}</style><g clip-path="url(#c)"><rect width="${CW_}" height="${CH_}" fill="${CARD}"/><rect width="${CW_}" height="${PANEL}" fill="url(#dots)"/>`);
    a(motif);
    a(`<rect x="14" y="12" width="${f1(tag.length * 6.6 + 14)}" height="19" rx="4" fill="${BRIGHT}"/><text x="21" y="25.5" font-family="${MONO}" font-size="11" font-weight="700" fill="${BG}" textLength="${f1(tag.length * 6.6)}" lengthAdjust="spacingAndGlyphs">${tag}</text>`);
    a(`<rect y="${PANEL}" width="${CW_}" height="${CH_ - PANEL}" fill="#13171c"/><line x1="0" y1="${PANEL}" x2="${CW_}" y2="${PANEL}" stroke="#2b313a"/>`);
    a(`<text x="18" y="${PANEL + 30}" font-family="${SANS}" font-size="20" font-weight="700" fill="${GLOW}">${esc(title)}</text>`);
    a(`<text x="18" y="${PANEL + 50}" font-family="${MONO}" font-size="11.5" fill="${TEXT2}">${esc(tagline)}</text>`);
    let x = 18;
    for (const chip of chips) {
      const w = chip.length * 6.6;
      a(`<rect x="${f1(x)}" y="${PANEL + 62}" width="${f1(w + 14)}" height="20" rx="10" fill="#1f242b" stroke="#4a525d"/><text x="${f1(x + 7)}" y="${PANEL + 76}" font-family="${MONO}" font-size="11" fill="${MINT}" textLength="${f1(w)}" lengthAdjust="spacingAndGlyphs">${esc(chip)}</text>`);
      x += w + 22;
    }
    a(`</g><rect x=".75" y=".75" width="${CW_ - 1.5}" height="${CH_ - 1.5}" rx="11.5" fill="none" stroke="#2b313a" stroke-width="1.5"/></svg>`);
    return o.join("\n");
  }

  function nxp() {
    const track = "M121,40 H319 A50,50 0 0 1 319,140 H121 A50,50 0 0 1 121,40 Z", m = [], a = s => m.push(s);
    a(`<path d="${track}" fill="none" stroke="${MINT}" stroke-width="38" opacity=".9"/><path d="${track}" fill="none" stroke="#191d23" stroke-width="34"/><path d="${track}" fill="none" stroke="#4a525d" stroke-width="1.5" stroke-dasharray="7 9"/>`);
    a(`<rect x="216" y="21" width="4" height="38" fill="${MINT}" opacity=".5"/>`);
    a(`<g><animateMotion dur="6s" repeatCount="indefinite" rotate="auto" path="${track}" keyPoints="0;0.2765;0.5;0.7765;1" keyTimes="0;0.2;0.5;0.7;1" calcMode="linear"/>`);
    a(`<g fill="none" stroke="${MINT}" stroke-width="1.6" stroke-linecap="round"><path class="p1" d="M18,-7 A9,9 0 0 1 18,7"/><path class="p2" d="M23,-10 A13,13 0 0 1 23,10"/><path class="p3" d="M28,-13 A17,17 0 0 1 28,13"/></g>`);
    a(`<rect x="-15" y="-8" width="30" height="16" rx="4" fill="${BRIGHT}"/><rect x="-9" y="-5" width="13" height="10" rx="2" fill="#191d23"/><circle cx="11" cy="0" r="3.2" fill="${GLOW}"/>`);
    a(`<rect x="-12" y="-11" width="7" height="3" rx="1" fill="#4a525d"/><rect x="5" y="-11" width="7" height="3" rx="1" fill="#4a525d"/><rect x="-12" y="8" width="7" height="3" rx="1" fill="#4a525d"/><rect x="5" y="8" width="7" height="3" rx="1" fill="#4a525d"/></g>`);
    a(`<g font-family="${MONO}" font-size="10" fill="${TEXT2}"><text x="404" y="60">SPEED</text><rect x="404" y="66" width="56" height="6" rx="3" fill="#1f242b"/>`);
    a(`<rect x="404" y="66" height="6" rx="3" fill="${BRIGHT}" width="50"><animate attributeName="width" dur="6s" repeatCount="indefinite" values="52;52;30;30;52;52;30;30;52" keyTimes="0;.17;.23;.47;.53;.67;.73;.97;1"/></rect>`);
    a(`<text x="404" y="96">STEER</text><rect x="404" y="102" width="56" height="6" rx="3" fill="#1f242b"/><rect x="431" y="100" width="2" height="10" fill="#4a525d"/>`);
    a(`<rect y="102" height="6" width="10" rx="3" fill="${MINT}" x="427"><animate attributeName="x" dur="6s" repeatCount="indefinite" values="427;427;445;445;427;427;445;445;427" keyTimes="0;.18;.23;.47;.52;.68;.73;.97;1"/></rect>`);
    a(`<text x="404" y="132">US</text><circle cx="428" cy="129" r="3.5" fill="${BRIGHT}"><animate attributeName="opacity" values="1;.2;1" dur=".8s" repeatCount="indefinite"/></circle></g>`);
    const css = "@keyframes ping{0%{opacity:0}30%{opacity:1}100%{opacity:0}}.p1{animation:ping 1s ease-out infinite}.p2{animation:ping 1s ease-out .15s infinite}.p3{animation:ping 1s ease-out .3s infinite}";
    return frame(1, "NXP-Cup Autonomous Car", "camera-guided model car · embedded control", ["Embedded C", "S32K144", "Custom PCB", "Control loops"], m.join("\n"), css);
  }

  function sda() {
    const m = [], a = s => m.push(s), fx = 22, fy = 50, fw = 196, fh = 114;
    a(`<g fill="none" stroke="${MINT}" stroke-width="2" stroke-linecap="round">${corners(fx, fy, fw, fh, 12)}</g>`);
    a(`<text x="${fx + fw}" y="${fy - 6}" text-anchor="end" font-family="${MONO}" font-size="9.5" fill="${TEXT2}">640×480 · HSV</text>`);
    a(`<circle cx="${fx + 8}" cy="${fy - 9}" r="3" fill="${RED}"><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite"/></circle><text x="${fx + 15}" y="${fy - 6}" font-family="${MONO}" font-size="9.5" fill="${TEXT2}">REC</text>`);
    a(`<circle cx="62" cy="108" r="20" fill="${RED}" opacity=".9"/><rect x="100" y="88" width="38" height="38" rx="3" fill="${BLUE}" opacity=".9"/><polygon points="155,128 177,88 199,128" fill="${YELLOW}" opacity=".9"/>`);
    [[38, 84, 48, 48, "circle"], [95, 83, 48, 48, "square"], [150, 82, 54, 50, "triangle"]].forEach(([x, y, w, h, lab], i) => {
      a(`<g class="d${i}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${BRIGHT}" stroke-width="1.6" stroke-dasharray="4 3"/><rect x="${x}" y="${y - 13}" width="${f1(lab.length * 5.9 + 8)}" height="12" rx="2" fill="${BRIGHT}"/><text x="${x + 4}" y="${y - 4}" font-family="${MONO}" font-size="9.5" font-weight="700" fill="${BG}">${lab}</text></g>`);
    });
    a(`<line x1="228" y1="104" x2="292" y2="104" stroke="#4a525d" stroke-width="2" stroke-dasharray="3 4"/><text x="260" y="92" text-anchor="middle" font-family="${MONO}" font-size="9.5" fill="${MINT}">MQTT</text><text x="260" y="122" text-anchor="middle" font-family="${MONO}" font-size="9.5" fill="${TEXT2}">cv/shapes</text><circle class="pk" cx="228" cy="104" r="4" fill="${GLOW}"/>`);
    const gx = 300;
    a(`<rect x="${gx}" y="44" width="160" height="118" rx="6" fill="#101317" stroke="#2b313a"/><text x="${gx + 8}" y="58" font-family="${MONO}" font-size="9.5" fill="${TEXT2}">LEVEL 1/4</text>`);
    [[gx + 10, 140, RED], [gx + 62, 118, BLUE], [gx + 112, 96, YELLOW]].forEach(([x, y, col]) => a(`<rect class="pl" x="${x}" y="${y}" width="38" height="7" rx="2" fill="${col}"/>`));
    a(`<rect x="${gx + 140}" y="70" width="4" height="26" fill="${MINT}"/><path d="M${gx + 144} 70 l12 5 -12 5z" fill="${BRIGHT}"/>`);
    a(`<g><animateMotion dur="6s" repeatCount="indefinite" calcMode="linear" keyTimes="0;.45;.6;.75;.9;1" keyPoints="0;0;.33;.66;1;1" path="M${gx + 22},132 Q${gx + 50},96 ${gx + 74},110 Q${gx + 102},74 ${gx + 124},88 Q${gx + 140},60 ${gx + 134},88"/>`);
    [".##.", "####", ".##.", "#..#"].forEach((row, r) => [...row].forEach((ch, c) => { if (ch === "#") a(`<rect x="${c * 3}" y="${r * 3 - 12}" width="3" height="3" fill="${GLOW}"/>`); }));
    a(`</g>`);
    const css = "@keyframes d0{0%,8%{opacity:0}12%,85%{opacity:1}92%,100%{opacity:0}}@keyframes d1{0%,18%{opacity:0}22%,85%{opacity:1}92%,100%{opacity:0}}@keyframes d2{0%,28%{opacity:0}32%,85%{opacity:1}92%,100%{opacity:0}}" +
      ".d0{animation:d0 6s infinite}.d1{animation:d1 6s infinite}.d2{animation:d2 6s infinite}" +
      "@keyframes pk{0%,34%{transform:translateX(0);opacity:0}36%{opacity:1}44%{transform:translateX(64px);opacity:1}46%,100%{transform:translateX(64px);opacity:0}}.pk{animation:pk 6s linear infinite}" +
      "@keyframes pl{0%,42%{opacity:.18}46%,90%{opacity:1}96%,100%{opacity:.18}}.pl{animation:pl 6s infinite}";
    return frame(2, "SDA Computer Vision Platformer", "physical shapes → camera → MQTT → game", ["Python", "OpenCV", "MQTT", "Pygame"], m.join("\n"), css);
  }

  function doodle() {
    const m = [], a = s => m.push(s), cx = 92, cy = 102, PI = Math.PI, dot = (x, y, r) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}"/>`;
    let s = "";
    for (let i = 0; i < 22; i++) { const t = 2 * PI * i / 22; s += dot(cx + 40 * Math.cos(t), cy + 50 * Math.sin(t), 1.7); }
    a(`<g fill="${MINT}">${s}</g>`);
    s = "";
    for (const ex of [cx - 15, cx + 15]) for (let i = 0; i < 6; i++) { const t = 2 * PI * i / 6; s += dot(ex + 7 * Math.cos(t), cy - 10 + 3.5 * Math.sin(t), 1.5); }
    a(`<g fill="${BRIGHT}">${s}</g>`);
    s = "";
    for (const ex of [cx - 15, cx + 15]) for (let i = 0; i < 5; i++) s += dot(ex - 8 + i * 4, cy - 22 - (2 - Math.abs(i - 2)) * 1.5, 1.5);
    a(`<g class="brow" fill="${MINT}">${s}</g>`);
    a(`<g fill="${MINT}">${[0, 1, 2].map(i => dot(cx, cy - 4 + i * 5, 1.4)).join("")}</g>`);
    a(`<g class="m-smile" fill="${GLOW}">${[...Array(8).keys()].map(i => dot(cx - 14 + i * 4, cy + 22 + 5 * Math.sin(PI * i / 7), 1.7)).join("")}</g>`);
    a(`<g class="m-oh" fill="${GLOW}">${[...Array(9).keys()].map(i => dot(cx + 7 * Math.cos(2 * PI * i / 9), cy + 25 + 8 * Math.sin(2 * PI * i / 9), 1.7)).join("")}</g>`);
    const hx = 166, hy = 92;
    const pts = [[0, 30], [-14, 22], [-22, 12], [-28, 2], [-33, -6], [-8, 4], [-10, -10], [-11, -20], [-12, -29], [0, 2], [0, -14], [0, -25], [0, -35],
      [8, 4], [10, -10], [11, -21], [12, -30], [15, 8], [19, -3], [22, -11], [24, -18]];
    const fingers = [[0, 1, 2, 3, 4], [0, 5, 6, 7, 8], [5, 9, 10, 11, 12], [9, 13, 14, 15, 16], [13, 17, 18, 19, 20], [0, 17]];
    a(`<g class="hand"><g class="wave">` + fingers.map(f => `<path d="${f.map((j, i) => `${i ? "L" : "M"}${hx + pts[j][0]},${hy + pts[j][1]}`).join(" ")}" fill="none" stroke="#4a525d" stroke-width="1.4"/>`).join("") +
      pts.map(([x, y]) => `<circle cx="${hx + x}" cy="${hy + y}" r="1.8" fill="${BRIGHT}"/>`).join("") + `</g></g>`);
    a(`<line x1="210" y1="102" x2="262" y2="102" stroke="#4a525d" stroke-width="2"/><path d="M262 97 l8 5 -8 5z" fill="#4a525d"/><rect x="216" y="84" width="40" height="17" rx="4" fill="#1f242b" stroke="#4a525d"/>`);
    a(`<text x="236" y="96" text-anchor="middle" font-family="${MONO}" font-size="10" font-weight="700" fill="${MINT}">MLP</text><text x="240" y="122" text-anchor="middle" font-family="${MONO}" font-size="9" fill="${TEXT2}">landmarks</text>`);
    const X = 362, Y = 106, st = `fill="none" stroke="${GLOW}" stroke-linecap="round" stroke-linejoin="round"`;
    a(`<g ${st} stroke-width="2.4"><path d="M${X - 52},${Y + 10} C${X - 56},${Y - 40} ${X + 56},${Y - 42} ${X + 52},${Y + 10} C${X + 50},${Y + 48} ${X - 50},${Y + 50} ${X - 52},${Y + 10}Z" fill="#191d23"/>`);
    a(`<path d="M${X - 34},${Y - 26} c-8,-14 6,-22 14,-10"/><path d="M${X + 34},${Y - 26} c8,-14 -6,-22 -14,-10"/><path d="M${X - 22},${Y + 30} q22,14 44,0" stroke="#8f959d" stroke-width="1.6"/></g>`);
    a(`<circle cx="${X - 31}" cy="${Y + 8}" r="8" fill="${RED}" opacity=".35"/><circle cx="${X + 31}" cy="${Y + 8}" r="8" fill="${RED}" opacity=".35"/>`);
    a(`<g class="eyes" fill="${GLOW}"><circle cx="${X - 18}" cy="${Y - 6}" r="4"/><circle cx="${X + 18}" cy="${Y - 6}" r="4"/></g><path d="M${X - 4},${Y + 2} l4,3 4,-3" ${st} stroke-width="2"/>`);
    a(`<path class="m-smile" d="M${X - 12},${Y + 10} q6,8 12,0 q6,8 12,0" ${st} stroke-width="2"/><ellipse class="m-oh" cx="${X}" cy="${Y + 15}" rx="6" ry="8" ${st} stroke-width="2"/>`);
    a(`<g class="hand"><g class="wave2"><path d="M${X + 46},${Y + 2} q20,-6 22,-26" ${st} stroke-width="2.4"/><circle cx="${X + 69}" cy="${Y - 28}" r="6" ${st} stroke-width="2.4"/></g></g>`);
    const lbl = (cls, txt) => `<text class="${cls}" x="${X}" y="${Y - 50}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${TEXT2}">${txt}</text>`;
    a(lbl("lbl-smile", ":)  smile") + lbl("m-oh", ":O  surprise") + lbl("lbl-wave", "o/  wave"));
    const css = "@keyframes sm{0%,30%{opacity:1}33%,63%{opacity:0}66%,100%{opacity:1}}@keyframes oh{0%,30%{opacity:0}33%,63%{opacity:1}66%,100%{opacity:0}}@keyframes hd{0%,63%{opacity:0}66%,97%{opacity:1}100%{opacity:0}}" +
      "@keyframes ls{0%,30%{opacity:1}33%,97%{opacity:0}100%{opacity:1}}.lbl-smile{animation:ls 7.5s infinite}.lbl-wave{animation:hd 7.5s infinite}" +
      ".m-smile{animation:sm 7.5s infinite}.m-oh{animation:oh 7.5s infinite}.hand{animation:hd 7.5s infinite}" +
      "@keyframes br{0%,30%{transform:none}33%,63%{transform:translateY(-4px)}66%,100%{transform:none}}.brow{animation:br 7.5s infinite}" +
      "@keyframes wv{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(12deg)}}.wave,.wave2{transform-box:fill-box;transform-origin:50% 100%;animation:wv .6s ease-in-out infinite}" +
      "@keyframes bl{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}.eyes circle{transform-box:fill-box;transform-origin:center;animation:bl 3.2s infinite}";
    return frame(3, "Doodle-Hamster-Cam", "face + hand landmarks → hamster reactions", ["MediaPipe", "PyTorch MLP", "Webcam"], m.join("\n"), css);
  }

  function ghoti() {
    const m = [], a = s => m.push(s), y = 86, gx = 240;
    a(`<line x1="48" y1="${y}" x2="432" y2="${y}" stroke="#4a525d" stroke-width="2" stroke-dasharray="3 5"/>`);
    for (const [name, x] of [["task", 48], ["plan", 140], ["run", 340], ["log", 432]])
      a(`<g class="n-${name}"><rect x="${x - 32}" y="${y - 17}" width="64" height="34" rx="8" fill="#191d23" stroke="${ACCENT}" stroke-width="1.5"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-family="${MONO}" font-size="12" fill="${MINT}">${name}</text></g>`);
    a(`<g class="gate"><rect x="${gx - 44}" y="${y - 22}" width="88" height="44" rx="10" fill="#191d23" stroke-width="2"/><text x="${gx}" y="${y + 4.5}" text-anchor="middle" font-family="${MONO}" font-size="12" font-weight="700">approve</text></g>`);
    a(`<g class="lock" fill="none" stroke-width="2"><rect x="${gx - 8}" y="${y - 46}" width="16" height="12" rx="2"/><path class="shackle" d="M${gx - 5},${y - 46} v-5 a5,5 0 0 1 10,0 v5"/></g>`);
    a(`<g fill="none" stroke="${MINT}" stroke-width="2"><circle cx="${gx}" cy="${y + 52}" r="7"/><path d="M${gx - 13},${y + 74} a13,12 0 0 1 26,0"/></g><line x1="${gx}" y1="${y + 22}" x2="${gx}" y2="${y + 42}" stroke="${MINT}" stroke-width="1.5" stroke-dasharray="2 3"/>`);
    a(`<text x="${gx + 20}" y="${y + 58}" font-family="${MONO}" font-size="10" fill="${TEXT2}">human in the loop</text><text x="${gx + 20}" y="${y + 72}" font-family="${MONO}" font-size="10" fill="${TEXT2}">every step logged</text>`);
    a(`<text class="st-wait" x="${gx}" y="${y - 58}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${AMBER}">awaiting approval…</text><text class="st-ok" x="${gx}" y="${y - 58}" text-anchor="middle" font-family="${MONO}" font-size="10" fill="${GLOW}">approved ✓</text>`);
    a(`<circle r="6" cy="${y}" fill="${GLOW}"><animate attributeName="cx" dur="7s" repeatCount="indefinite" calcMode="linear" values="48;140;196;196;284;340;432;432" keyTimes="0;.14;.24;.56;.64;.72;.86;1"/><animate attributeName="opacity" dur="7s" repeatCount="indefinite" values="0;1;1;1;0;0" keyTimes="0;.03;.86;.9;.93;1"/></circle>`);
    const css = `@keyframes gate{0%,23%{stroke:${ACCENT};fill:${ACCENT}}25%,55%{stroke:${AMBER};fill:${AMBER}}57%,90%{stroke:${GLOW};fill:${GLOW}}100%{stroke:${ACCENT};fill:${ACCENT}}}` +
      `.gate rect{fill:#191d23!important;animation:gate 7s infinite}.gate text{animation:gate 7s infinite;stroke:none!important}.lock{animation:gate 7s infinite;fill:none!important}` +
      `@keyframes sh{0%,56%{transform:none}58%,90%{transform:translateY(-4px)}100%{transform:none}}.shackle{animation:sh 7s infinite}` +
      `@keyframes pw{0%,23%{opacity:0}25%,55%{opacity:1}57%,100%{opacity:0}}@keyframes po{0%,56%{opacity:0}58%,88%{opacity:1}92%,100%{opacity:0}}.st-wait{animation:pw 7s infinite}.st-ok{animation:po 7s infinite}` +
      `@keyframes lg{0%,84%{stroke:${ACCENT}}87%,97%{stroke:${GLOW}}100%{stroke:${ACCENT}}}.n-log rect{animation:lg 7s infinite}`;
    return frame(4, "Ghoti / Super-AI-Agent", "supervised AI operator · approval-gated", ["Python", "Node.js", "Local-first"], m.join("\n"), css);
  }

  // ------------------------------------------------------------ footer
  function footer() {
    const W = 1000, H = 70, PITCH = 14, SZ = 11, COLS = 71, X0 = (W - (COLS * PITCH - 3)) / 2, R = rng(11), o = [], a = s => o.push(s);
    a(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Footer"><defs><clipPath id="c"><rect width="${W}" height="${H}" rx="12"/></clipPath></defs>`);
    a(`<style>@keyframes rp{0%,100%{opacity:.25}12%{opacity:1}30%{opacity:.25}}.c{animation:rp 4s ease-in-out infinite}@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}.cur{animation:blink 1s steps(1) infinite}</style>`);
    a(`<g clip-path="url(#c)"><rect width="${W}" height="${H}" fill="${BG}"/>`);
    for (let r = 0; r < 4; r++) for (let c = 0; c < COLS; c++) {
      const lvl = R.choice([0, 0, 1, 1, 2, 3]), d = (c * 0.045 + r * 0.08) % 4;
      a(`<rect class="c" style="animation-delay:${f2(d)}s" x="${f1(X0 + c * PITCH)}" y="${7 + r * PITCH}" width="${SZ}" height="${SZ}" rx="2" fill="${LEVELS[lvl]}"/>`);
    }
    const txt = "ivan@eindhoven:~$ exit  # thanks for stopping by", cw = 8.2, tw = txt.length * cw;
    a(`<rect x="${f1((W - tw) / 2 - 18)}" y="18" width="${f1(tw + 36)}" height="34" rx="8" fill="${BG}" stroke="#2b313a"/>`);
    a(`<text x="${f1((W - tw) / 2)}" y="40" font-family="${MONO}" font-size="14" textLength="${f1(tw)}" lengthAdjust="spacingAndGlyphs" xml:space="preserve"><tspan fill="${BRIGHT}">ivan@eindhoven:~$</tspan><tspan fill="#e6e8eb"> exit  </tspan><tspan fill="#8f959d"># thanks for stopping by</tspan></text>`);
    a(`<rect class="cur" x="${f1((W + tw) / 2 + 4)}" y="27" width="8" height="16" fill="${BRIGHT}"/></g>`);
    a(`<rect x=".75" y=".75" width="${W - 1.5}" height="${H - 1.5}" rx="11.5" fill="none" stroke="#2b313a" stroke-width="1.5"/></svg>`);
    return o.join("\n");
  }

  return {
    "assets/header.svg": header(), "assets/terminal.svg": terminal(),
    "assets/card-nxp.svg": nxp(), "assets/card-sda.svg": sda(), "assets/card-doodle.svg": doodle(), "assets/card-ghoti.svg": ghoti(),
    "assets/footer.svg": footer(),
  };
}

if (typeof module !== "undefined" && require.main === module) {
  const fs = require("fs"), path = require("path"), crypto = require("crypto");
  const outDir = process.argv[2] || ".";
  for (const [p, content] of Object.entries(buildAll())) {
    fs.mkdirSync(path.dirname(path.join(outDir, p)), { recursive: true });
    fs.writeFileSync(path.join(outDir, p), content);
    console.log(p, content.length, crypto.createHash("sha256").update(content, "utf8").digest("hex").slice(0, 16));
  }
}
