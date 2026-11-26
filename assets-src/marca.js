// Colégio Dom Bosco Vila Matilde: desenhos da marca (fonte única). Usado por build_index.js e make_og.py.
// Releitura própria do monograma atual "DB": D aberto em azul petróleo com o visto laranja no lugar da haste,
// B em laranja sobreposto e a palavra DOMBOSCO em letra condensada. Não é recorte do logo original.
var DB = (function () {
  var C = {
    marinho: "#12306B",   // azul dos posts de matrícula
    marinhoD: "#0B1F49",  // seções escuras
    petroleo: "#0E5C78",  // D do monograma (topo)
    teal: "#239394",      // cor principal do site atual da escola
    tealD: "#11696A",     // verde-azulado para texto sobre fundo claro (contraste AA)
    tealL: "#5CC9C6",     // verde-azulado sobre fundo escuro
    laranja: "#FF891C",   // visto, B e botões (mesmo laranja do site atual)
    laranjaD: "#B04F00",  // laranja para texto sobre fundo claro (contraste AA)
    amarelo: "#FFB21C",   // destaques (mesmo amarelo do site atual)
    azul: "#2F6BD0",      // fachada e detalhes de ilustração
    gelo: "#F4F8FB",      // fundo do site
    nuvem: "#E4EEF6",     // cartões
    tinta: "#14223A"      // texto
  };

  var uid = 0;
  // Monograma DB. viewBox 0 0 132 92.
  function mono(attrs, o) {
    o = o || {};
    var id = "db" + (++uid);
    var dA = o.dA || C.petroleo, dB = o.dB || C.teal, bA = o.bA || C.laranja, bB = o.bB || C.amarelo, chk = o.check || C.laranja;
    return '<svg ' + (attrs || "") + ' viewBox="0 0 132 92" aria-hidden="true">' +
      '<defs><linearGradient id="' + id + 'd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + dA + '"/><stop offset="1" stop-color="' + dB + '"/></linearGradient>' +
      '<linearGradient id="' + id + 'b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + bA + '"/><stop offset="1" stop-color="' + bB + '"/></linearGradient></defs>' +
      // B (atrás)
      '<path fill="url(#' + id + 'b)" d="M72 6h24c13 0 21 7 21 18 0 7-3.5 12-9 14.5 7.5 2.5 12 8.5 12 17 0 13-9.5 21-24 21H66l5-14h23c5.5 0 8.5-2.8 8.5-7.3S99.5 48 94 48H80l4.5-12H93c4.6 0 7.2-2.4 7.2-6.2S97.6 24 93 24H66z"/>' +
      // D (frente): barra de cima com ponta cortada, barriga e barra de baixo afinando
      '<path fill="url(#' + id + 'd)" d="M20 6h37c22 0 36 15 36 37.5S79 82 57 82H36l6.5-15H56c13 0 20.5-9.5 20.5-23.5S69 21 56 21H14z"/>' +
      // visto
      '<path fill="none" stroke="' + chk + '" stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round" d="M12 48l12 13L52 28"/>' +
      '</svg>';
  }

  // Assinatura completa: monograma + DOMBOSCO + "Vila Matilde". Precisa de Barlow Condensed carregada.
  function lockup(attrs, o) {
    o = o || {};
    var ink = o.ink || C.marinho, ink2 = o.ink2 || C.teal, sub = o.sub || C.laranjaD;
    return '<svg ' + (attrs || "") + ' viewBox="0 0 336 92" role="img" aria-label="Colégio Dom Bosco Vila Matilde">' +
      mono('x="0" y="0" width="132" height="92"', o) +
      '<text x="138" y="54" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="46" letter-spacing="1"><tspan fill="' + ink + '">DOM</tspan><tspan fill="' + ink2 + '">BOSCO</tspan></text>' +
      '<text x="140" y="78" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="17" letter-spacing="3.2" fill="' + sub + '">VILA MATILDE</text>' +
      '</svg>';
  }

  // Versão empilhada (como no avatar do Instagram): monograma em cima, DOMBOSCO embaixo. viewBox 0 0 200 170.
  function stack(attrs, o) {
    o = o || {};
    var ink = o.ink || C.marinho, ink2 = o.ink2 || C.teal, sub = o.sub || C.laranjaD;
    return '<svg ' + (attrs || "") + ' viewBox="0 0 200 170" role="img" aria-label="Colégio Dom Bosco Vila Matilde">' +
      mono('x="40" y="4" width="120" height="84"', o) +
      '<text x="100" y="136" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="50" letter-spacing="1.5"><tspan fill="' + ink + '">DOM</tspan><tspan fill="' + ink2 + '">BOSCO</tspan></text>' +
      '<text x="100" y="162" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="600" font-size="17" letter-spacing="4" fill="' + sub + '">VILA MATILDE</text>' +
      '</svg>';
  }


  // Ilustrações cheias com contorno (mesma linguagem das peças de matrícula). viewBox 0 0 64 64.
  var O = C.marinhoD;
  function g(inner, sw) { return '<g stroke="' + O + '" stroke-width="' + (sw || 2.6) + '" stroke-linejoin="round" stroke-linecap="round">' + inner + '</g>'; }
  var ICO = {
    blocos: g('<rect x="8" y="34" width="22" height="22" rx="3" fill="' + C.amarelo + '"/><rect x="34" y="34" width="22" height="22" rx="3" fill="' + C.teal + '"/><rect x="21" y="10" width="22" height="22" rx="3" fill="' + C.laranja + '"/><path d="M15 41l8 8M23 41l-8 8" fill="none"/><circle cx="45" cy="45" r="4.5" fill="#fff"/><path d="M27 21h10" fill="none"/>'),
    lapis: g('<path d="M14 50l4-14 28-28 10 10-28 28z" fill="' + C.amarelo + '"/><path d="M42 12l10 10" fill="none"/><path d="M18 36l10 10" fill="none"/><path d="M14 50l4-14 10 10z" fill="#FBE3C4"/><path d="M14 50l1.6-5.6 4 4z" fill="' + O + '"/><path d="M46 8l4-4 10 10-4 4z" fill="' + C.laranja + '"/>'),
    livro: g('<path d="M32 16c-7-5-16-6-24-4v38c8-2 17-1 24 4 7-5 16-6 24-4V12c-8-2-17-1-24 4z" fill="#fff"/><path d="M32 16v38" fill="none"/><path d="M8 12v38c8-2 17-1 24 4V16c-7-5-16-6-24-4z" fill="' + C.teal + '"/><path d="M38 24c4-2 8-2.5 12-2M38 32c4-2 8-2.5 12-2M38 40c4-2 8-2.5 12-2" fill="none" stroke-width="2.2"/>'),
    capelo: g('<path d="M4 24l28-12 28 12-28 12z" fill="' + C.marinho + '"/><path d="M16 30v12c0 5 7 9 16 9s16-4 16-9V30l-16 6z" fill="' + C.teal + '"/><path d="M52 27v16" fill="none"/><circle cx="52" cy="46" r="3.5" fill="' + C.amarelo + '"/>'),
    alvo: g('<circle cx="30" cy="34" r="22" fill="#fff"/><circle cx="30" cy="34" r="14" fill="' + C.laranja + '"/><circle cx="30" cy="34" r="6" fill="#fff"/><path d="M30 34L54 10" fill="none"/><path d="M48 6l6 4 4 6-6-1z" fill="' + C.amarelo + '"/>'),
    relogio: g('<circle cx="32" cy="34" r="22" fill="#fff"/><path d="M32 20v14l10 6" fill="none"/><path d="M14 12l-6 6M50 12l6 6" fill="none"/><path d="M32 12v-4" fill="none"/><circle cx="32" cy="34" r="3" fill="' + C.laranja + '"/>'),
    bola: g('<circle cx="32" cy="32" r="22" fill="#fff"/><path d="M32 24l7.6 5.5-2.9 9h-9.4l-2.9-9z" fill="' + O + '"/><path d="M32 24v-10M39.6 29.5l9.5-3M36.7 38.5l6 8M27.3 38.5l-6 8M24.4 29.5l-9.5-3" fill="none"/>'),
    prato: g('<circle cx="32" cy="34" r="20" fill="#fff"/><circle cx="32" cy="34" r="12" fill="' + C.amarelo + '"/><path d="M27 31c2-3 7-3 9 0M29 37c2 2 5 2 7 0" fill="none" stroke-width="2"/><path d="M6 14v14c0 3 2 4 4 4v18M10 14v10M14 14v14c0 3-2 4-4 4" fill="none"/><path d="M56 50V14c-5 4-7 10-7 18 0 3 2 5 7 5" fill="none"/>'),
    palco: g('<path d="M6 10h52v8H6z" fill="' + C.laranja + '"/><path d="M8 18c0 14 4 26 10 34H8zM56 18c0 14-4 26-10 34h10z" fill="' + C.marinho + '"/><path d="M4 52h56v6H4z" fill="' + C.amarelo + '"/><circle cx="32" cy="34" r="5" fill="#fff"/><path d="M26 52c0-8 2.5-12 6-12s6 4 6 12" fill="#fff"/>'),
    lousa: g('<rect x="6" y="10" width="52" height="34" rx="3" fill="' + C.teal + '"/><path d="M14 22l6 6 10-10M36 20h14M36 28h10" fill="none" stroke="#fff" stroke-width="2.6"/><path d="M22 44l-6 12M42 44l6 12M32 44v6" fill="none"/>'),
    coracao: g('<path d="M32 54S8 40 8 24c0-8 6-13 12.5-13C26 11 30 14 32 18c2-4 6-7 11.5-7C50 11 56 16 56 24c0 16-24 30-24 30z" fill="' + C.laranja + '"/><path d="M20 24c0-3 2-5 5-5" fill="none" stroke="#fff" stroke-width="2.4"/>'),
    escudo: g('<path d="M32 6l22 8v14c0 15-9.5 25-22 30C19.5 53 10 43 10 28V14z" fill="' + C.teal + '"/><path d="M22 31l7 7 13-14" fill="none" stroke="#fff" stroke-width="3.6"/>'),
    pin: g('<path d="M32 58S12 38 12 24a20 20 0 0 1 40 0c0 14-20 34-20 34z" fill="' + C.laranja + '"/><circle cx="32" cy="24" r="7.5" fill="#fff"/>'),
    calendario: g('<rect x="8" y="12" width="48" height="44" rx="4" fill="#fff"/><path d="M8 16a4 4 0 0 1 4-4h40a4 4 0 0 1 4 4v8H8z" fill="' + C.laranja + '"/><path d="M20 6v10M44 6v10" fill="none"/><rect x="16" y="32" width="8" height="7" rx="1.5" fill="' + C.teal + '" stroke-width="2"/><rect x="28" y="32" width="8" height="7" rx="1.5" fill="' + C.nuvem + '" stroke-width="2"/><rect x="40" y="32" width="8" height="7" rx="1.5" fill="' + C.nuvem + '" stroke-width="2"/><rect x="16" y="43" width="8" height="7" rx="1.5" fill="' + C.nuvem + '" stroke-width="2"/><rect x="28" y="43" width="8" height="7" rx="1.5" fill="' + C.amarelo + '" stroke-width="2"/>'),
    doc: g('<path d="M14 6h26l12 12v40H14z" fill="#fff"/><path d="M40 6v12h12" fill="' + C.nuvem + '"/><path d="M22 28h22M22 36h22M22 44h14" fill="none" stroke-width="2.4"/><circle cx="46" cy="48" r="9" fill="' + C.teal + '"/><path d="M42 48l3 3 5-6" fill="none" stroke="#fff" stroke-width="2.4"/>'),
    conversa: g('<path d="M6 12h34a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H20l-9 8v-8H6a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z" fill="' + C.amarelo + '"/><path d="M48 24h10a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4h-3v7l-8-7H30a4 4 0 0 1-4-4v-2" fill="' + C.teal + '"/><path d="M12 22h24M12 29h16" fill="none" stroke-width="2.4"/>'),
    trofeu: g('<path d="M20 8h24v14c0 9-5 15-12 15s-12-6-12-15z" fill="' + C.amarelo + '"/><path d="M20 12H10c0 9 4 14 11 15M44 12h10c0 9-4 14-11 15" fill="none"/><path d="M28 37h8v8h-8z" fill="' + C.laranja + '"/><path d="M20 45h24v9H20z" fill="' + C.marinho + '"/><path d="M27 17l2 4 4.5.5-3.3 3 1 4.5-4.2-2.3-4.2 2.3 1-4.5-3.3-3 4.5-.5z" fill="#fff" stroke-width="1.6"/>'),
    lampada: g('<path d="M32 6c-11 0-19 8-19 18 0 7 4 11 7 14 2 2 3 4 3 7h18c0-3 1-5 3-7 3-3 7-7 7-14 0-10-8-18-19-18z" fill="' + C.amarelo + '"/><path d="M23 45h18v5H23zM25 50h14v5c0 2-2 3-4 3h-6c-2 0-4-1-4-3z" fill="' + C.nuvem + '"/><path d="M27 30l5-6 5 6" fill="none" stroke-width="2.4"/>')
  };
  function ico(k, attrs) { return '<svg ' + (attrs || "") + ' viewBox="0 0 64 64" aria-hidden="true">' + ICO[k] + '</svg>'; }

  // Fachada ilustrada da escola (releitura do prédio azul da R. Atuaí). viewBox 0 0 360 300.
  function escola(attrs) {
    var w = function (x, y, c) { return '<rect x="' + x + '" y="' + y + '" width="34" height="30" rx="3" fill="' + (c || "#CFE7FF") + '"/><path d="M' + (x + 17) + ' ' + y + 'v30M' + x + ' ' + (y + 15) + 'h34" fill="none" stroke-width="2"/>'; };
    var mos = "", cols = [C.laranja, C.amarelo, C.teal, "#E2483A", C.azul, C.amarelo, C.laranja, C.teal];
    for (var i = 0; i < 8; i++) mos += '<rect x="' + (66 + i * 29) + '" y="214" width="25" height="18" rx="2" fill="' + cols[i] + '" stroke-width="2"/>';
    return '<svg ' + (attrs || "") + ' viewBox="0 0 360 300" aria-hidden="true">' + g(
      '<circle cx="300" cy="62" r="26" fill="' + C.amarelo + '"/>' +
      '<path d="M8 268c-4-26 4-46 18-54 12 12 14 34 6 54z" fill="#2FA86B"/>' +
      '<rect x="56" y="70" width="248" height="200" rx="6" fill="' + C.azul + '"/>' +
      '<path d="M48 70h264l-14-26H62z" fill="' + C.marinho + '"/>' +
      '<rect x="98" y="38" width="164" height="22" rx="4" fill="#fff" stroke-width="2.2"/>' +
      '<text x="180" y="54.5" text-anchor="middle" font-family="Barlow Condensed, sans-serif" font-weight="700" font-size="16" letter-spacing="1.5" fill="' + C.marinho + '" stroke="none">COLÉGIO DOM BOSCO</text>' +
      w(76, 88) + w(124, 88, "#FFE7B8") + w(202, 88) + w(250, 88, "#FFE7B8") +
      w(76, 142, "#FFE7B8") + w(124, 142) + w(202, 142) + w(250, 142, "#CFE7FF") +
      '<rect x="164" y="96" width="32" height="70" rx="3" fill="' + C.marinho + '"/>' +
      mono('x="166" y="112" width="28" height="20"', { dA: C.tealL, dB: "#9BE6E3" }) +
      '<path d="M172 146h16M174 154h12" fill="none" stroke="' + C.amarelo + '" stroke-width="2.4"/>' +
      mos +
      '<path d="M148 270v-28a32 20 0 0 1 64 0v28z" fill="' + C.laranja + '"/><path d="M180 222v48" fill="none"/>' +
      '<path d="M10 270h340" fill="none" stroke-width="3"/>' +
      '<path d="M318 268c-6-24 2-44 14-50 10 10 12 30 4 50z" fill="#2FA86B"/>', 3) + '</svg>';
  }

  return { C: C, mono: mono, lockup: lockup, stack: stack, ico: ico, ICO: ICO, escola: escola };
})();
if (typeof module !== "undefined") module.exports = DB;
