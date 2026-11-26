// Gera site/index.html (arquivo único) a partir de marca.js. Rode: node assets-src/build_index.js
// Edite este gerador, não o index.html.
var fs = require("fs"), path = require("path");
var DB = require("./marca.js"), C = DB.C;
var ROOT = path.join(__dirname, "..");

// ---------- Configuração ----------
var SITE = "https://dombosco-vilamatilde.vercel.app/";
var OG_VER = 1;
var PREVIEW = true; // prévia: noindex até a escola aprovar e o domínio próprio entrar
var PHONE = "(11) 4327-7727", PHONE_TEL = "+551143277727";
var WA_BIO = "(11) 93386-1818"; // número da bio do Instagram (confirmar se é o oficial de matrícula)
var INSTAGRAM = "https://www.instagram.com/colegiodomboscovilamatilde/";
var FACEBOOK = "https://www.facebook.com/colegiodomboscovilamatilde/";
var BOLETO = "https://minhasfaturas.educbank.com.br/";
var ADDR = "R. Atuaí, 691", BAIRRO = "Vila Matilde", CEP = "03646-000";
var MAPS = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Colégio Dom Bosco Vila Matilde, Rua Atuaí 691, São Paulo SP");
var WAZE = "https://waze.com/ul?q=" + encodeURIComponent("Rua Atuaí 691, São Paulo") + "&navigate=yes";

var TITLE = "Colégio Dom Bosco Vila Matilde | Matrículas 2027 abertas";
var DESC = "Escola particular na Vila Matilde, zona leste de São Paulo, da educação infantil ao ensino médio e pré-vestibular. Turmas de manhã e à tarde, período integral e aulas extras. Agende sua visita.";

var SEGMENTOS = [
  { id: "infantil", ico: "blocos", nome: "Educação Infantil", idade: "Creche e pré-escola, até 5 anos",
    txt: "Os primeiros anos com rotina, brincadeira com propósito e um olhar atento para cada criança. Foi aqui que a escola começou.",
    tags: ["Manhã", "Tarde"] },
  { id: "fund1", ico: "lapis", nome: "Fundamental I", idade: "1º ao 5º ano, de 6 a 10 anos",
    txt: "Alfabetização, leitura e matemática com o material do Sistema de Ensino Dom Bosco e acompanhamento próximo da coordenação.",
    tags: ["Material Dom Bosco"] },
  { id: "fund2", ico: "livro", nome: "Fundamental II", idade: "6º ao 9º ano, de 11 a 14 anos",
    txt: "Mais autonomia, professores por disciplina e projetos como a Feira de Empreendedorismo.",
    tags: ["Turmas à tarde"] },
  { id: "medio", ico: "capelo", nome: "Ensino Médio", idade: "1ª à 3ª série, de 15 a 17 anos",
    txt: "Base sólida para o ENEM e os vestibulares, com orientação para as escolhas depois da escola.",
    tags: ["ENEM e vestibular"] },
  { id: "prevest", ico: "alvo", nome: "Pré-vestibular", idade: "Para quem terminou ou está terminando o médio",
    txt: "Revisão e treino de prova para quem quer chegar mais preparado ao ENEM e aos vestibulares.",
    tags: ["Revisão", "Simulados"] }
];

var ESTRUTURA = [
  ["lousa", "Lousas digitais e projetores", "nas salas de aula"],
  ["bola", "Quadra coberta", "para educação física e aulas extras"],
  ["palco", "Auditório", "para apresentações, reuniões e eventos"],
  ["livro", "Biblioteca", "com espaço de leitura"],
  ["prato", "Refeitório", "com nutricionista na equipe"],
  ["blocos", "Parque infantil e pátio coberto", "para a turma do infantil"],
  ["coracao", "Psicóloga na equipe", "para acompanhar alunos e famílias"],
  ["escudo", "Acessibilidade", "rampas e banheiro adaptado"]
];

var PASSOS = [
  ["calendario", "Agende a visita", "Escolha o dia pelo formulário ou pelo WhatsApp. Em seguida, a secretaria confirma o horário."],
  ["conversa", "Conheça a escola", "Você vê as salas, a quadra e o refeitório e conversa com a coordenação sobre a série do seu filho."],
  ["doc", "Receba a proposta", "Valores de 2027, material didático, uniforme e o período escolhido, tudo por escrito."],
  ["trofeu", "Faça a matrícula", "Entregue os documentos e assine o contrato. Depois vêm a lista de material e o primeiro dia de aula."]
];

var DOCS = [
  "Certidão de nascimento do aluno",
  "RG e CPF do aluno, se tiver",
  "RG e CPF do responsável financeiro",
  "Comprovante de endereço recente",
  "Carteira de vacinação atualizada (obrigatória em SP até os 18 anos)",
  "Declaração de transferência ou histórico escolar, para quem vem de outra escola"
];

var FAQ = [
  ["Qual o valor da mensalidade em 2027?", "Depende da série e do período. A secretaria passa os valores de 2027, o material didático e o uniforme na visita ou pelo WhatsApp, por escrito. Pela Lei 9.870/99, o contrato, os valores e o número de vagas por turma ficam disponíveis para consulta antes do fim do prazo de matrícula."],
  ["Em que série meu filho entra?", "Para quem vai começar a estudar, vale a data de corte de 31 de março: a criança entra na série da idade que tiver completado até essa data. Use a calculadora no começo da página. Para quem já estuda, vale a série em que a criança está agora. A secretaria confirma na visita."],
  ["Tem período integral?", "Sim. Na visita, a escola apresenta os horários, as refeições incluídas e as atividades do contraturno."],
  ["Quais são as aulas extras?", "As aulas extras acontecem no contraturno. A lista de modalidades e horários de 2027 é apresentada na visita."],
  ["Qual é o material didático?", "A escola trabalha com o material do Sistema de Ensino Dom Bosco, com coleções da educação infantil ao pré-vestibular."],
  ["Tem Fundamental II à tarde?", "Sim. O Fundamental II tem turmas no período da tarde."],
  ["Como é a alimentação?", "A escola tem refeitório e conta com nutricionista na equipe. O cardápio e o que está incluído em cada período são apresentados na visita."],
  ["Preciso levar meu filho na visita?", "Não é obrigatório. Muitas famílias fazem a primeira visita só com os responsáveis e voltam com a criança depois. Se quiser levar, avise no formulário."]
];

// ---------- Helpers ----------
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
var waIcon = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.2.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';
var arrow = '<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10h11m-4-5 5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ---------- JSON-LD ----------
var ld = [{
  "@context": "https://schema.org", "@type": "School", "@id": SITE + "#escola",
  name: "Colégio Dom Bosco Vila Matilde", url: SITE, image: SITE + "og-image.png", logo: SITE + "og-image.png",
  description: DESC, telephone: "+55 11 4327-7727", email: undefined,
  address: { "@type": "PostalAddress", streetAddress: "Rua Atuaí, 691", addressLocality: "São Paulo", addressRegion: "SP", postalCode: CEP, addressCountry: "BR" },
  areaServed: ["Vila Matilde", "Vila Esperança", "Penha", "Artur Alvim", "Carrão"],
  hasMap: MAPS, sameAs: [INSTAGRAM, FACEBOOK],
  legalName: "Centro Educacional Geraldo Paiva - IEGP Ltda", taxID: "18.282.985/0001-50"
}, {
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: FAQ.map(function (f) { return { "@type": "Question", name: f[0], acceptedAnswer: { "@type": "Answer", text: f[1] } }; })
}];

// ---------- CSS ----------
var css = `
@font-face{font-family:"Barlow Condensed";font-weight:600;font-display:swap;src:url(fonts/barlow-condensed-600.woff2) format("woff2")}
@font-face{font-family:"Barlow Condensed";font-weight:700;font-display:swap;src:url(fonts/barlow-condensed-700.woff2) format("woff2")}
@font-face{font-family:Figtree;font-weight:400 700;font-display:swap;src:url(fonts/figtree.woff2) format("woff2")}
:root{--marinho:${C.marinho};--marinhoD:${C.marinhoD};--teal:${C.teal};--tealD:${C.tealD};--tealL:${C.tealL};--laranja:${C.laranja};--laranjaD:${C.laranjaD};--amarelo:${C.amarelo};--gelo:${C.gelo};--nuvem:${C.nuvem};--tinta:${C.tinta};--suave:#4A5873;--linha:#D3DEEA;--r:18px;--sh:0 1px 2px rgba(11,31,73,.06),0 10px 30px -12px rgba(11,31,73,.18)}
*{box-sizing:border-box}html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation:none!important;transition:none!important}}
body{margin:0;background:var(--gelo);color:var(--tinta);font:400 17px/1.6 Figtree,system-ui,sans-serif;overflow-x:hidden}
img,svg{max-width:100%;display:block}a{color:inherit}
h1,h2,h3{font-family:"Barlow Condensed",system-ui,sans-serif;font-weight:700;line-height:1.02;margin:0;letter-spacing:.2px}
h2{font-size:clamp(36px,5vw,54px);color:var(--marinho)}h3{font-size:26px;color:var(--marinho)}
p{margin:0}
.wrap{width:min(1160px,100% - 40px);margin-inline:auto}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font:700 13px/1 Figtree,sans-serif;letter-spacing:1.6px;text-transform:uppercase;color:var(--laranjaD)}
.eyebrow:before{content:"";width:22px;height:3px;border-radius:3px;background:var(--laranja)}
.lead{font-size:19px;color:var(--suave);max-width:60ch}
.sec{padding:96px 0}.sec-h{display:grid;gap:14px;margin-bottom:44px;max-width:760px;align-content:start}
.skip{position:absolute;left:-999px;top:8px;background:#fff;padding:10px 14px;border-radius:8px;z-index:99}.skip:focus{left:8px}
:focus-visible{outline:3px solid var(--laranja);outline-offset:3px;border-radius:6px}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* botões */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 24px;border-radius:999px;font:700 16px/1 Figtree,sans-serif;text-decoration:none;border:0;cursor:pointer;transition:transform .15s,box-shadow .15s,background .15s}
.btn:hover{transform:translateY(-2px)}
.btn-or{background:var(--laranja);color:var(--marinhoD);box-shadow:0 8px 20px -8px rgba(255,137,28,.8)}
.btn-or:hover{background:#FF9B3D}
.btn-wa{background:#fff;color:var(--marinhoD)}
.btn-wa svg{color:#1A9E52}
.btn-line{background:transparent;color:var(--marinho);box-shadow:inset 0 0 0 2px var(--marinho)}
.btn-dark{background:var(--marinho);color:#fff}

/* topo */
.topbar{background:var(--marinhoD);color:#DCE6F5;font-size:14px}
.topbar .wrap{display:flex;justify-content:space-between;align-items:center;gap:16px;min-height:40px}
.topbar a{color:#fff;text-decoration:none;font-weight:600}.topbar a:hover{text-decoration:underline}
.topbar .tl{display:flex;gap:18px;flex-wrap:wrap}
.topbar b{color:var(--amarelo)}
header.hd{position:sticky;top:0;z-index:40;background:rgba(244,248,251,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid transparent;transition:border-color .2s}
header.hd.sc{border-color:var(--linha)}
.hd .wrap{display:flex;align-items:center;justify-content:space-between;gap:20px;min-height:76px}
.logo{display:flex;align-items:center;text-decoration:none}.logo svg{width:206px;height:auto}
nav.mn{display:flex;align-items:center;gap:26px}
nav.mn a{text-decoration:none;font-weight:600;font-size:15.5px;color:var(--tinta);padding:10px 0}
nav.mn a:hover{color:var(--tealD)}
nav.mn .btn{min-height:46px;padding:0 20px;color:var(--marinhoD)}

/* hero */
.hero{background:var(--marinho);color:#fff;position:relative;overflow:hidden}
.hero:before{content:"";position:absolute;right:-180px;top:-200px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(92,201,198,.28),rgba(92,201,198,0) 68%)}
.hero:after{content:"";position:absolute;left:-120px;bottom:-260px;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(255,137,28,.22),rgba(255,137,28,0) 70%)}
.hero .wrap{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;padding:72px 0 88px}
.chip{display:inline-flex;align-items:center;gap:10px;background:rgba(255,178,28,.14);color:var(--amarelo);border:1px solid rgba(255,178,28,.45);font-weight:700;font-size:14px;padding:8px 14px;border-radius:999px;letter-spacing:.3px}
.chip i{width:8px;height:8px;border-radius:50%;background:var(--amarelo);box-shadow:0 0 0 0 rgba(255,178,28,.7);animation:pulse 2s infinite}
@keyframes pulse{70%{box-shadow:0 0 0 10px rgba(255,178,28,0)}100%{box-shadow:0 0 0 0 rgba(255,178,28,0)}}
.hero h1{font-size:clamp(46px,6.6vw,84px);margin:22px 0 22px;text-wrap:balance}
.hero h1 em{font-style:normal;color:var(--amarelo)}
.hero p.sub{font-size:19.5px;color:#D6E1F2;max-width:54ch}
.hero .ctas{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}
.facts{display:flex;flex-wrap:wrap;gap:10px 26px;margin-top:38px;padding-top:26px;border-top:1px solid rgba(255,255,255,.16);color:#E7EEF8;font-size:15px}
.facts span{display:inline-flex;align-items:center;gap:8px}.facts svg{width:26px;height:26px}
.art{position:relative}
.arch{background:linear-gradient(180deg,#2B7FB5 0%,${C.teal} 100%);border-radius:220px 220px 28px 28px;padding:56px 28px 0;box-shadow:0 30px 60px -30px rgba(0,0,0,.5);border:4px solid rgba(255,255,255,.12)}
.arch svg{width:100%;height:auto}
.badge{position:absolute;background:#fff;color:var(--tinta);border-radius:16px;padding:12px 16px;display:flex;gap:12px;align-items:center;box-shadow:0 18px 40px -16px rgba(0,0,0,.45);font-size:14.5px;line-height:1.3;max-width:240px}
.badge svg{width:40px;height:40px;flex:none}.badge b{display:block;font-size:15.5px;color:var(--marinho)}
.b1{left:-34px;top:64px}.b2{right:-18px;bottom:38px}

/* calculadora */
.calc{margin-top:-46px;position:relative;z-index:2}
.calc .box{background:#fff;border-radius:24px;box-shadow:var(--sh);padding:30px 34px;display:grid;grid-template-columns:auto 1fr auto;gap:28px;align-items:center;border:1px solid var(--linha)}
.calc .box>svg{width:64px;height:64px}
.calc h2{font-size:30px}
.calc p{color:var(--suave);font-size:15.5px;margin-top:4px}
.calc form{display:flex;gap:10px;align-items:end}
.fld label{display:block;font-weight:700;font-size:14px;margin-bottom:6px;color:var(--marinho)}
input,select,textarea{font:inherit;font-size:16px;color:var(--tinta);background:#fff;border:1.5px solid #B9C7D8;border-radius:12px;min-height:50px;padding:10px 14px;width:100%}
input:focus,select:focus,textarea:focus{border-color:var(--teal);outline:3px solid rgba(35,147,148,.25);outline-offset:0}
.calc input{width:190px}
.res{grid-column:1/-1;display:none;background:var(--nuvem);border-radius:16px;padding:18px 22px;gap:18px;align-items:center;justify-content:space-between;flex-wrap:wrap}
.res.on{display:flex}
.res .serie{font:700 30px/1.05 "Barlow Condensed",sans-serif;color:var(--marinho)}
.res small{display:block;color:var(--suave);font-size:14px;margin-top:4px;max-width:62ch}

/* segmentos */
.segs{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.seg{background:#fff;border:1px solid var(--linha);border-radius:var(--r);padding:24px 20px 22px;display:flex;flex-direction:column;gap:12px;transition:transform .2s,box-shadow .2s}
.seg:hover{transform:translateY(-4px);box-shadow:var(--sh)}
.seg>svg{width:56px;height:56px}
.seg .id{font-size:14px;font-weight:600;color:var(--tealD)}
.seg p{font-size:15.5px;color:var(--suave);flex:1}
.tags{display:flex;flex-wrap:wrap;gap:6px}
.tags span{font-size:12.5px;font-weight:700;background:var(--nuvem);color:var(--marinho);padding:5px 10px;border-radius:999px}
.seg a.more{display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:15px;color:var(--laranjaD);text-decoration:none;min-height:44px}
.seg a.more:hover{text-decoration:underline}
.plus{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px}
.plus>div{border-radius:var(--r);padding:28px;display:grid;grid-template-columns:72px 1fr;gap:18px;align-items:start}
.plus svg{width:64px;height:64px}
.plus .p1{background:var(--marinho);color:#fff}.plus .p1 h3{color:#fff}.plus .p1 p{color:#D6E1F2}
.plus .p2{background:#FFE9CC}.plus .p2 p{color:#5A4524}
.plus p{margin-top:8px;font-size:16px}

/* escola */
.esc{background:#fff}
.esc .grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:56px;align-items:start}
.quote{background:var(--marinho);color:#fff;border-radius:24px;padding:36px 34px;position:relative;overflow:hidden}
.quote:after{content:"";position:absolute;right:-60px;bottom:-60px;width:200px;height:200px;border-radius:50%;background:rgba(92,201,198,.18)}
.quote .q{font:700 34px/1.08 "Barlow Condensed",sans-serif}
.quote .q em{font-style:normal;color:var(--amarelo)}
.quote p{color:#D6E1F2;margin-top:16px;font-size:16px}
.vals{display:flex;flex-wrap:wrap;gap:8px;margin-top:22px;position:relative;z-index:1}
.vals span{border:1px solid rgba(255,255,255,.3);border-radius:999px;padding:6px 12px;font-size:14px;font-weight:600}
.nums{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px}
.nums div{background:var(--nuvem);border-radius:16px;padding:18px 16px}
.nums b{display:block;font:700 42px/1 "Barlow Condensed",sans-serif;color:var(--marinho)}
.nums span{font-size:14px;color:var(--suave)}
.src{font-size:13px;color:var(--suave);margin-top:10px}
.est{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.est div{display:grid;grid-template-columns:52px 1fr;gap:14px;align-items:center;padding:16px;border-radius:16px;border:1px solid var(--linha);background:var(--gelo)}
.est svg{width:48px;height:48px}.est b{display:block;font-size:16.5px;color:var(--marinho);line-height:1.25}.est span{font-size:14.5px;color:var(--suave)}

/* vida */
.vida{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:16px}
.card{border-radius:var(--r);padding:28px;display:flex;flex-direction:column;justify-content:space-between;gap:28px;min-height:280px;position:relative;overflow:hidden}
.card svg.i{width:72px;height:72px}
.card .k{font-size:13px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase}
.card h3{margin-top:8px}
.card p{margin-top:10px;font-size:15.5px}
.c1{background:var(--amarelo);color:var(--marinhoD)}.c1 h3{color:var(--marinhoD);font-size:32px}
.c2{background:var(--tealD);color:#fff}.c2 h3{color:#fff}.c2 .k{color:#DFF7F6}
.c3{background:var(--marinho);color:#fff}.c3 h3{color:#fff}.c3 .k{color:var(--amarelo)}
.c3 a{color:#fff;font-weight:700}
.c1 .k{color:#5B3A00}

/* matrícula */
.mat{background:var(--nuvem)}
.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;counter-reset:s}
.step{background:#fff;border-radius:var(--r);padding:26px 22px;position:relative;counter-increment:s}
.step:before{content:counter(s);position:absolute;right:18px;top:14px;font:700 54px/1 "Barlow Condensed",sans-serif;color:var(--nuvem)}
.step svg{width:54px;height:54px;margin-bottom:14px}
.step h3{font-size:24px}.step p{font-size:15.5px;color:var(--suave);margin-top:8px}
.docs{display:grid;grid-template-columns:1.1fr .9fr;gap:16px;margin-top:16px}
.docs>div{background:#fff;border-radius:var(--r);padding:28px}
.docs ul{list-style:none;padding:0;margin:14px 0 0;display:grid;gap:10px}
.docs li{display:grid;grid-template-columns:24px 1fr;gap:10px;font-size:15.5px}
.docs li:before{content:"";width:20px;height:20px;margin-top:3px;border-radius:6px;background:var(--teal) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M5 10.5l3 3 7-7' fill='none' stroke='white' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/16px no-repeat}
.docs .lei{background:var(--marinho);color:#fff}.docs .lei h3{color:#fff}.docs .lei p{color:#D6E1F2;font-size:15.5px;margin-top:10px}
.note{font-size:13.5px;color:var(--suave);margin-top:14px}

/* formulário */
.vis .grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:48px;align-items:start}
.vis .side{position:sticky;top:110px;display:grid;gap:18px}
.alt{background:#fff;border-radius:var(--r);padding:22px;border:1px solid var(--linha);display:grid;gap:12px}
.alt a{display:flex;align-items:center;gap:10px;font-weight:700;text-decoration:none;color:var(--marinho);min-height:44px}
.alt a:hover{color:var(--tealD)}
form.f{background:#fff;border-radius:24px;padding:34px;box-shadow:var(--sh);border:1px solid var(--linha);display:grid;gap:20px}
.row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.kid{display:grid;grid-template-columns:1.2fr 1fr 1.2fr auto;gap:12px;align-items:end;background:var(--gelo);border-radius:16px;padding:16px}
.kid .x{min-height:50px;width:50px;border-radius:12px;border:1.5px solid #B9C7D8;background:#fff;cursor:pointer;font-size:22px;color:var(--suave)}
.kid .x[hidden]{display:none}
.addk{justify-self:start;background:none;border:0;color:var(--tealD);font:700 15px Figtree,sans-serif;cursor:pointer;min-height:44px;padding:0}
.addk:hover{text-decoration:underline}
fieldset{border:0;padding:0;margin:0;min-width:0}
legend{font-weight:700;font-size:14px;margin-bottom:8px;color:var(--marinho);padding:0}
.opts{display:flex;flex-wrap:wrap;gap:8px}
.opts label{position:relative}
.opts input{position:absolute;opacity:0;width:1px;height:1px;min-height:0}
.opts span{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:12px;border:1.5px solid #B9C7D8;background:#fff;font-weight:600;font-size:15px;cursor:pointer;transition:background .15s,border-color .15s}
.opts input:checked+span{background:var(--marinho);border-color:var(--marinho);color:#fff}
.opts input:focus-visible+span{outline:3px solid var(--laranja);outline-offset:2px}
.days span{flex-direction:column;justify-content:center;min-width:66px;line-height:1.15;padding:6px 10px;font-size:14px}
.days span b{font-size:17px}
.ck{display:grid;grid-template-columns:22px 1fr;gap:10px;font-size:14.5px;color:var(--suave);align-items:start}
.ck input{width:20px;height:20px;min-height:0;margin:2px 0 0;accent-color:var(--marinho)}
.send{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
.send .btn{min-height:56px;font-size:17px}
.wn{font-size:14px;color:var(--suave)}
.err{color:#B42318;font-size:14px;font-weight:600}

/* faq */
.faq{display:grid;grid-template-columns:.8fr 1.2fr;gap:48px}
details{background:#fff;border:1px solid var(--linha);border-radius:16px;margin-bottom:10px}
summary{list-style:none;cursor:pointer;padding:18px 54px 18px 22px;font-weight:700;font-size:17px;position:relative;color:var(--marinho);min-height:44px}
summary::-webkit-details-marker{display:none}
summary:after{content:"";position:absolute;right:22px;top:50%;width:12px;height:12px;border-right:2.5px solid var(--laranjaD);border-bottom:2.5px solid var(--laranjaD);transform:translateY(-70%) rotate(45deg);transition:transform .2s}
details[open] summary:after{transform:translateY(-30%) rotate(-135deg)}
details p{padding:0 22px 20px;color:var(--suave);font-size:16px}

/* local */
.loc{background:var(--marinho);color:#fff}
.loc .grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.loc h2{color:#fff}.loc .lead{color:#D6E1F2}
.addr{font:700 30px/1.15 "Barlow Condensed",sans-serif;margin-top:22px}
.addr span{display:block;font:400 16px/1.5 Figtree,sans-serif;color:#C9D6EA;margin-top:6px}
.loc .ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.loc .btn-line{color:#fff;box-shadow:inset 0 0 0 2px rgba(255,255,255,.6)}
.map{background:#0E2758;border-radius:24px;padding:22px;border:1px solid rgba(255,255,255,.12)}
.map svg{width:100%;height:auto}

/* cta final + rodapé */
.fim{padding:84px 0}
.fim .box{background:linear-gradient(120deg,var(--laranja),var(--amarelo));border-radius:28px;padding:48px;display:grid;grid-template-columns:1fr auto;gap:28px;align-items:center;color:var(--marinhoD)}
.fim h2{color:var(--marinhoD)}.fim p{margin-top:10px;font-size:18px}
.fim .ctas{display:flex;gap:12px;flex-wrap:wrap}
footer{background:var(--marinhoD);color:#C9D6EA;padding:56px 0 110px;font-size:15px}
footer .grid{display:grid;grid-template-columns:1.2fr 1fr 1fr 1fr;gap:32px}
footer h2{color:#fff;font:700 15px Figtree,sans-serif;margin:0 0 12px;letter-spacing:.4px}
footer a{color:#fff;text-decoration:none;display:inline-flex;min-height:36px;align-items:center}footer a:hover{text-decoration:underline}
footer ul{list-style:none;margin:0;padding:0}
footer .lg svg{width:190px}
footer .legal{border-top:1px solid rgba(255,255,255,.12);margin-top:40px;padding-top:22px;display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;font-size:13.5px}

/* barra fixa no celular */
.mbar{position:fixed;left:12px;right:12px;bottom:12px;z-index:50;display:none;gap:10px;background:rgba(11,31,73,.96);padding:10px;border-radius:20px;box-shadow:0 16px 40px -10px rgba(0,0,0,.5);transform:translateY(140%);transition:transform .3s}
.mbar.on{transform:none}
.mbar .btn{flex:1;min-height:50px;font-size:15.5px;padding:0 12px}

@media (max-width:1080px){
 nav.mn a:not(.btn){display:none}
 .hero .wrap{grid-template-columns:1fr;gap:40px}
 .art{max-width:520px;margin-inline:auto;width:100%}
 .segs{grid-template-columns:repeat(2,1fr)}.segs .seg:last-child{grid-column:1/-1}
 .esc .grid,.vis .grid,.faq,.loc .grid{grid-template-columns:1fr;gap:36px}
 .vis .side{position:static}
 .vida{grid-template-columns:1fr 1fr}.vida .c1{grid-column:1/-1}
 .steps{grid-template-columns:1fr 1fr}
 footer .grid{grid-template-columns:1fr 1fr}
}
@media (max-width:720px){
 body{font-size:16.5px}
 .sec{padding:72px 0}.sec-h{margin-bottom:32px}
 .wrap{width:calc(100% - 32px)}
 .topbar .tl a.hide-s{display:none}.topbar .wrap{font-size:13px}
 .logo svg{width:168px}
 nav.mn .btn{min-height:44px;padding:0 16px;font-size:15px}
 .hero .wrap{padding:44px 0 80px}
 .hero p.sub{font-size:17.5px}
 .hero .ctas .btn{flex:1 1 100%}
 .b1{left:-6px;top:28px}.b2{right:-6px;bottom:20px}.badge{max-width:200px;font-size:13.5px;padding:10px 12px}.badge svg{width:32px;height:32px}
 .arch{padding:44px 18px 0}
 .calc .box{grid-template-columns:1fr;padding:24px 20px;gap:16px}.calc .box>svg{display:none}
 .calc form{flex-wrap:wrap}.calc form .fld{flex:1 1 100%}.calc input{width:100%}.calc form .btn{flex:1 1 100%}
 .segs,.plus,.est,.vida,.steps,.docs,.row,.nums{grid-template-columns:1fr}
 .nums{grid-template-columns:repeat(3,1fr)}.nums b{font-size:34px}
 .plus>div{grid-template-columns:56px 1fr;padding:22px}.plus svg{width:52px;height:52px}
 .kid{grid-template-columns:1fr 1fr}.kid .fn{grid-column:1/-1}.kid .x{grid-column:2;justify-self:end}
 form.f{padding:22px 18px}
 .send .btn{flex:1 1 100%}
 .fim .box{grid-template-columns:1fr;padding:32px 22px}
 .fim .ctas .btn{flex:1 1 100%}
 footer .grid{grid-template-columns:1fr}
 .mbar{display:flex}
}
`;

// ---------- HTML ----------
function seg(s) {
  return '<article class="seg" id="seg-' + s.id + '">' + DB.ico(s.ico) +
    '<div><h3>' + s.nome + '</h3><div class="id">' + s.idade + '</div></div><p>' + s.txt + '</p>' +
    '<div class="tags">' + s.tags.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>' +
    '<a class="more" href="#visita" data-seg="' + s.id + '">Agendar visita ' + arrow + '</a></article>';
}

var mapa = '<svg viewBox="0 0 520 340" role="img" aria-label="Mapa ilustrado da região da Rua Atuaí, Vila Matilde">' +
  '<rect width="520" height="340" rx="16" fill="#0B2150"/>' +
  '<g fill="#132E66"><rect x="20" y="20" width="150" height="90" rx="8"/><rect x="200" y="20" width="120" height="90" rx="8"/><rect x="350" y="20" width="150" height="90" rx="8"/><rect x="20" y="140" width="150" height="80" rx="8"/><rect x="350" y="140" width="150" height="80" rx="8"/><rect x="20" y="250" width="150" height="70" rx="8"/><rect x="200" y="250" width="120" height="70" rx="8"/><rect x="350" y="250" width="150" height="70" rx="8"/></g>' +
  '<rect x="200" y="140" width="120" height="80" rx="8" fill="' + C.azul + '" stroke="' + C.amarelo + '" stroke-width="3"/>' +
  '<path d="M0 125h520M0 235h520M185 0v340M335 0v340" stroke="#2A4C8F" stroke-width="12"/>' +
  '<path d="M0 125h520" stroke="' + C.tealL + '" stroke-width="12" opacity=".9"/>' +
  '<text x="40" y="129.5" font-family="Figtree,sans-serif" font-size="11" font-weight="800" letter-spacing="1.5" fill="#0B2150">RUA ATUAÍ</text>' +
  '<g transform="translate(228 128)">' + DB.ICO.pin.replace(/<g /, '<g transform="scale(1)" ') + '</g>' +
  '<text x="260" y="206" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-size="18" font-weight="700" fill="#fff">Nº 691</text>' +
  '</svg>';

function dayOpts() { return '<div class="opts days" id="dias"></div>'; }

var html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(TITLE)}</title>
<meta name="description" content="${esc(DESC)}">
${PREVIEW ? '<meta name="robots" content="noindex,nofollow">' : ''}
<link rel="canonical" href="${SITE}">
<meta name="theme-color" content="${C.marinho}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Colégio Dom Bosco Vila Matilde">
<meta property="og:title" content="Colégio Dom Bosco Vila Matilde: matrículas 2027 abertas">
<meta property="og:description" content="Da educação infantil ao ensino médio na Vila Matilde, zona leste de SP. Agende sua visita.">
<meta property="og:url" content="${SITE}">
<meta property="og:image" content="${SITE}og-image.png?v=${OG_VER}">
<meta property="og:image:secure_url" content="${SITE}og-image.png?v=${OG_VER}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Colégio Dom Bosco Vila Matilde. Escola particular na Vila Matilde, da educação infantil ao ensino médio. Matrículas 2027 abertas.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Colégio Dom Bosco Vila Matilde: matrículas 2027 abertas">
<meta name="twitter:description" content="Da educação infantil ao ensino médio na Vila Matilde, zona leste de SP. Agende sua visita.">
<meta name="twitter:image" content="${SITE}og-image.png?v=${OG_VER}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preload" href="fonts/barlow-condensed-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/figtree.woff2" as="font" type="font/woff2" crossorigin>
<style>${css.replace(/\n\s*/g, "\n")}</style>
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body>
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<aside class="topbar" aria-label="Matrículas e acesso rápido"><div class="wrap">
 <span><b>Matrículas 2027 abertas.</b> Agende uma visita.</span>
 <span class="tl"><a href="tel:${PHONE_TEL}" class="hide-s">${PHONE}</a><a href="${BOLETO}" target="_blank" rel="noopener">Boleto</a><a href="${INSTAGRAM}" target="_blank" rel="noopener" class="hide-s">Instagram</a></span>
</div></aside>
<header class="hd" id="hd"><div class="wrap">
 <a class="logo" href="#topo" aria-label="Colégio Dom Bosco Vila Matilde, início">${DB.lockup('width="206" height="56"')}</a>
 <nav class="mn" aria-label="Principal">
  <a href="#segmentos">Segmentos</a><a href="#escola">A escola</a><a href="#matricula">Matrícula 2027</a><a href="#duvidas">Dúvidas</a><a href="#local">Como chegar</a>
  <a class="btn btn-or" href="#visita">Agendar visita</a>
 </nav>
</div></header>

<main id="conteudo">
<section class="hero" id="topo"><div class="wrap">
 <div>
  <span class="chip"><i></i>Matrículas 2027 abertas</span>
  <h1>Da educação infantil ao ensino médio, <em>na Vila Matilde.</em></h1>
  <p class="sub">Escola de bairro com material do Sistema de Ensino Dom Bosco, turmas de manhã e à tarde, período integral e aulas extras. Venha conhecer a escola por dentro.</p>
  <div class="ctas">
   <a class="btn btn-or" href="#visita">Agendar uma visita ${arrow}</a>
   <a class="btn btn-wa" href="#visita" data-wa="geral">${waIcon} Falar no WhatsApp</a>
  </div>
  <div class="facts">
   <span>${DB.ico("capelo")}Infantil ao pré-vestibular</span>
   <span>${DB.ico("relogio")}Manhã, tarde e integral</span>
   <span>${DB.ico("pin")}${ADDR}, ${BAIRRO}</span>
  </div>
 </div>
 <div class="art">
  <div class="arch">${DB.escola()}</div>
  <div class="badge b1">${DB.ico("calendario")}<div><b>Visitas para 2027</b>Agende o dia pelo site</div></div>
  <div class="badge b2">${DB.ico("trofeu")}<div><b>Ouro por equipes</b>Ginástica artística, Copa Pan-Americana 2026</div></div>
 </div>
</div></section>

<section class="calc" aria-labelledby="calc-t"><div class="wrap"><div class="box">
 ${DB.ico("lampada")}
 <div><h2 id="calc-t">Em que série seu filho entra em 2027?</h2><p>Coloque a data de nascimento. A conta segue a data de corte de 31 de março.</p></div>
 <form id="calcf" novalidate>
  <div class="fld"><label for="nasc">Data de nascimento</label><input type="date" id="nasc" required min="2005-01-01"></div>
  <button class="btn btn-dark" type="submit">Ver a série</button>
 </form>
 <div class="res" id="res" role="status" aria-live="polite"><div><div class="serie" id="serie"></div><small id="serie-n"></small></div><a class="btn btn-or" href="#visita" id="res-go">Agendar visita para essa série ${arrow}</a></div>
</div></div></section>

<section class="sec" id="segmentos"><div class="wrap">
 <div class="sec-h"><span class="eyebrow">Segmentos</span><h2>Uma escola para todas as fases</h2><p class="lead">A escola começou na educação infantil e cresceu junto com os alunos. Hoje acompanha a criança do primeiro dia de aula até o vestibular.</p></div>
 <div class="segs">${SEGMENTOS.map(seg).join("")}</div>
 <div class="plus">
  <div class="p1">${DB.ico("relogio")}<div><h3>Período integral</h3><p>Para quem trabalha o dia todo: aula em um turno e atividades acompanhadas no outro. Horários e refeições são apresentados na visita.</p></div></div>
  <div class="p2">${DB.ico("bola")}<div><h3>Aulas extras</h3><p>Esporte, movimento e cultura no contraturno, com a quadra coberta da escola. As modalidades de 2027 são apresentadas na visita.</p></div></div>
 </div>
</div></section>

<section class="sec esc" id="escola"><div class="wrap">
 <div class="sec-h"><span class="eyebrow">A escola</span><h2>Rigor no ensino e acolhimento no dia a dia</h2><p class="lead">O Colégio Dom Bosco Vila Matilde nasceu do sonho de dois pedagogos. Depois de anos dedicados à educação infantil, a escola ampliou o trabalho para o fundamental e o médio, sem perder o olhar atento de quem cuida dos pequenos.</p></div>
 <div class="grid">
  <div>
   <div class="quote">
    <div class="q">O Dom de desenvolver o conhecimento <em>desde os primeiros passos.</em></div>
    <p>Nossa missão é formar cidadãos críticos, éticos e protagonistas, com uma educação que une o rigor acadêmico ao acolhimento socioemocional.</p>
    <div class="vals"><span>Acolhimento</span><span>Protagonismo juvenil</span><span>Excelência com propósito</span><span>Responsabilidade com o amanhã</span><span>Ética e respeito</span></div>
   </div>
   <div class="nums"><div><b>484</b><span>alunos</span></div><div><b>29</b><span>professores</span></div><div><b>30</b><span>turmas</span></div></div>
   <p class="src">Números do Censo Escolar 2025 (INEP).</p>
  </div>
  <div class="est">${ESTRUTURA.map(function (e) { return '<div>' + DB.ico(e[0]) + '<p><b>' + e[1] + '</b><span>' + e[2] + '</span></p></div>'; }).join("")}</div>
 </div>
</div></section>

<section class="sec" id="vida"><div class="wrap">
 <div class="sec-h"><span class="eyebrow">Vida na escola</span><h2>O que acontece por aqui</h2></div>
 <div class="vida">
  <article class="card c1"><div><span class="k">Conquista de 2026</span><h3>Ouro por equipes na Copa Pan-Americana de Ginástica Artística</h3><p>Uma aluna do 7º ano trouxe ouro por equipes e o prêmio de elegância, e ficou em 1º lugar na classificação para todas as finais.</p></div>${DB.ico("trofeu", 'class="i"')}</article>
  <article class="card c2"><div><span class="k">Projeto</span><h3>Feira de Empreendedorismo</h3><p>Os alunos criam, apresentam e vendem as próprias ideias para as famílias.</p></div>${DB.ico("lampada", 'class="i"')}</article>
  <article class="card c3"><div><span class="k">Todo dia no Instagram</span><h3>A rotina da escola, em tempo real</h3><p>Eventos, projetos e recados para as famílias no <a href="${INSTAGRAM}" target="_blank" rel="noopener">@colegiodomboscovilamatilde</a>.</p></div>${DB.ico("palco", 'class="i"')}</article>
 </div>
</div></section>

<section class="sec mat" id="matricula"><div class="wrap">
 <div class="sec-h"><span class="eyebrow">Matrícula 2027</span><h2>Como funciona, passo a passo</h2><p class="lead">Sem surpresa: você conhece a escola, recebe a proposta por escrito e decide com calma.</p></div>
 <div class="steps">${PASSOS.map(function (p) { return '<div class="step">' + DB.ico(p[0]) + '<h3>' + p[1] + '</h3><p>' + p[2] + '</p></div>'; }).join("")}</div>
 <div class="docs">
  <div><h3>Documentos para a matrícula</h3><ul>${DOCS.map(function (d) { return '<li>' + d + '</li>'; }).join("")}</ul><p class="note">Lista geral. A secretaria confirma o que vale para cada série.</p></div>
  <div class="lei"><h3>Valores e contrato por escrito</h3><p>Os valores de 2027 variam por série e período. Você recebe a proposta completa na visita ou pelo WhatsApp, com mensalidade, material e uniforme.</p><p>Pela Lei 9.870/99, o contrato, os valores e o número de vagas por turma ficam disponíveis para consulta antes do fim do prazo de matrícula.</p></div>
 </div>
</div></section>

<section class="sec vis" id="visita"><div class="wrap"><div class="grid">
 <div class="side">
  <div class="sec-h" style="margin:0"><span class="eyebrow">Agende sua visita</span><h2>Venha conhecer a escola</h2><p class="lead">Preencha em menos de um minuto. A mensagem chega pronta no WhatsApp da secretaria, e ela confirma o horário.</p></div>
  <div class="alt"><a href="tel:${PHONE_TEL}">${DB.ico("conversa", 'width="32" height="32"')} Prefere ligar? ${PHONE}</a><a href="${MAPS}" target="_blank" rel="noopener">${DB.ico("pin", 'width="32" height="32"')} ${ADDR}, ${BAIRRO}</a></div>
 </div>
 <form class="f" id="f" novalidate>
  <div class="fld"><label for="resp">Seu nome</label><input id="resp" autocomplete="name" required></div>
  <div id="kids"></div>
  <button type="button" class="addk" id="addk">+ Adicionar outro filho</button>
  <fieldset><legend>Período de interesse</legend><div class="opts">
   ${["Manhã", "Tarde", "Integral", "Ainda não sei"].map(function (o, i) { return '<label><input type="radio" name="per" value="' + o + '"' + (i == 3 ? " checked" : "") + '><span>' + o + '</span></label>'; }).join("")}
  </div></fieldset>
  <fieldset><legend>Melhor dia para a visita</legend>${dayOpts()}</fieldset>
  <fieldset><legend>Horário</legend><div class="opts">
   ${["De manhã", "À tarde"].map(function (o, i) { return '<label><input type="radio" name="hor" value="' + o + '"' + (i == 0 ? " checked" : "") + '><span>' + o + '</span></label>'; }).join("")}
  </div></fieldset>
  <div class="row">
   <div class="fld"><label for="orig">Como conheceu a escola?</label><select id="orig"><option value="">Escolha uma opção</option><option>Indicação de outra família</option><option>Instagram</option><option>Google</option><option>Passei na frente</option><option>Site de bolsas</option><option>Outro</option></select></div>
   <div class="fld"><label for="obs">Alguma dúvida? (opcional)</label><input id="obs" placeholder="Ex.: transporte, integral, irmãos"></div>
  </div>
  <label class="ck"><input type="checkbox" id="lgpd" required><span>Autorizo a escola a usar estes dados para responder sobre a visita e a matrícula.</span></label>
  <div class="send"><button class="btn btn-or" type="submit">${waIcon} Enviar pelo WhatsApp</button><span class="wn" id="wn"></span></div>
  <p class="err" id="ferr" role="alert"></p>
 </form>
</div></div></section>

<section class="sec" id="duvidas" style="padding-top:0"><div class="wrap faq">
 <div class="sec-h"><span class="eyebrow">Dúvidas</span><h2>Perguntas das famílias</h2><p class="lead">Não achou a sua? Pergunte pelo WhatsApp ou na visita.</p></div>
 <div>${FAQ.map(function (f) { return '<details><summary>' + f[0] + '</summary><p>' + f[1] + '</p></details>'; }).join("")}</div>
</div></section>

<section class="sec loc" id="local"><div class="wrap grid">
 <div>
  <span class="eyebrow" style="color:var(--amarelo)">Como chegar</span>
  <h2 style="margin-top:14px">Perto de casa, na zona leste</h2>
  <p class="lead" style="margin-top:14px">Escola de bairro, com fácil acesso para quem mora na Vila Matilde, na Vila Esperança, na Penha e arredores.</p>
  <p class="addr">${ADDR}, ${BAIRRO}<span>São Paulo, SP, CEP ${CEP} · Telefone ${PHONE}</span></p>
  <div class="ctas"><a class="btn btn-or" href="${MAPS}" target="_blank" rel="noopener">Abrir no Google Maps</a><a class="btn btn-line" href="${WAZE}" target="_blank" rel="noopener">Ir com o Waze</a></div>
 </div>
 <div class="map">${mapa}</div>
</div></section>

<section class="fim"><div class="wrap"><div class="box">
 <div><h2>Vagas de 2027 são por turma</h2><p>Quanto antes você visita, mais opções de período e série encontra.</p></div>
 <div class="ctas"><a class="btn btn-dark" href="#visita">Agendar visita</a><a class="btn btn-wa" href="#visita" data-wa="geral">${waIcon} WhatsApp</a></div>
</div></div></section>
</main>

<footer><div class="wrap">
 <div class="grid">
  <div class="lg">${DB.lockup('width="190" height="52"', { ink: "#fff", ink2: C.tealL, sub: C.amarelo, dA: C.tealL, dB: "#9BE6E3" })}<p style="margin-top:14px">Educação infantil, fundamental, médio e pré-vestibular na Vila Matilde.</p></div>
  <div><h2>Contato</h2><ul><li><a href="tel:${PHONE_TEL}">${PHONE}</a></li><li><a href="#visita" data-wa="geral">WhatsApp</a></li><li><a href="${INSTAGRAM}" target="_blank" rel="noopener">Instagram</a></li><li><a href="${FACEBOOK}" target="_blank" rel="noopener">Facebook</a></li></ul></div>
  <div><h2>Famílias</h2><ul><li><a href="${BOLETO}" target="_blank" rel="noopener">Boleto e área financeira</a></li><li><a href="#matricula">Matrícula 2027</a></li><li><a href="#duvidas">Dúvidas</a></li></ul></div>
  <div><h2>Endereço</h2><p>${ADDR}<br>${BAIRRO}, São Paulo, SP<br>CEP ${CEP}</p></div>
 </div>
 <div class="legal"><span>Centro Educacional Geraldo Paiva (IEGP) · CNPJ 18.282.985/0001-50</span><span>Site desenvolvido por <a href="https://www.instagram.com/sentiero.ai/" target="_blank" rel="noopener"><strong>Sentiero AI</strong></a></span></div>
</div></footer>

<nav class="mbar" id="mbar" aria-label="Ações rápidas"><a class="btn btn-or" href="#visita">Agendar visita</a><a class="btn btn-wa" href="#visita" data-wa="geral">${waIcon} WhatsApp</a></nav>

<script>
(function(){"use strict";
var WHATSAPP_NUMBER=""; // prévia: preencher com o número oficial de matrícula, só dígitos com 55
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
function wa(t){return "https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(t)}
function openWA(t){var u=wa(t),w=window.open(u,"_blank");if(w){try{w.opener=null}catch(_){}}else location.href=u}
function track(ev,d){try{(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:ev},d||{}));if(window.fbq&&ev=="visita_enviada")fbq("track","Lead")}catch(_){}}

// data de hoje no fuso de São Paulo
var tz=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Sao_Paulo",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date()).split("-").map(Number);
var TODAY=new Date(Date.UTC(tz[0],tz[1]-1,tz[2]));
var ANO=TODAY.getUTCMonth()>=6?TODAY.getUTCFullYear()+1:TODAY.getUTCFullYear(); // de julho em diante, a conta é para o ano seguinte

// série pela data de corte de 31/03 (Resolução CNE/CEB nº 2/2018)
function serie(iso){
 if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(iso))return null;
 var p=iso.split("-").map(Number),b=Date.UTC(p[0],p[1]-1,p[2]);
 if(isNaN(b)||b>TODAY.getTime())return {erro:"Confira a data: ela está no futuro."};
 var a=ANO-p[0]-((p[1]>3||(p[1]==3&&p[2]>31))?1:0);
 var r;
 if(a<1)r={s:"Berçário",seg:"infantil",n:"Educação Infantil, creche"};
 else if(a<=3)r={s:"Turma de "+a+(a==1?" ano":" anos"),seg:"infantil",n:"Educação Infantil, creche"};
 else if(a<=5)r={s:(a==4?"Pré I":"Pré II")+", turma de "+a+" anos",seg:"infantil",n:"Educação Infantil, pré-escola"};
 else if(a<=10)r={s:(a-5)+"º ano",seg:"fund1",n:"Ensino Fundamental I"};
 else if(a<=14)r={s:(a-5)+"º ano",seg:"fund2",n:"Ensino Fundamental II"};
 else if(a<=17)r={s:(a-14)+"ª série",seg:"medio",n:"Ensino Médio"};
 else r={s:"Pré-vestibular",seg:"prevest",n:"Para quem já concluiu ou está concluindo o médio"};
 r.label=r.s+(r.seg=="prevest"?"":" · "+r.n);return r;
}
var SEGN={infantil:"Educação Infantil",fund1:"Fundamental I",fund2:"Fundamental II",medio:"Ensino Médio",prevest:"Pré-vestibular"};

// calculadora
var lastCalc=null;
document.getElementById("calcf").addEventListener("submit",function(e){e.preventDefault();
 var v=document.getElementById("nasc").value,r=serie(v),box=document.getElementById("res");
 if(!r){document.getElementById("serie").textContent="Coloque a data de nascimento";document.getElementById("serie-n").textContent="";box.classList.add("on");return}
 if(r.erro){document.getElementById("serie").textContent=r.erro;document.getElementById("serie-n").textContent="";box.classList.add("on");return}
 lastCalc={nasc:v,r:r};
 document.getElementById("serie").textContent="Em "+ANO+": "+r.s;
 document.getElementById("serie-n").textContent=(r.seg=="prevest"?r.n:r.n)+". Conta pela data de corte de 31 de março. Para quem já estuda, vale a série atual. A secretaria confirma na visita.";
 box.classList.add("on");track("calculo_serie",{segmento:r.seg});
});
document.getElementById("res-go").addEventListener("click",function(){if(lastCalc){var k=document.querySelector(".kid");k.querySelector(".kn").value=lastCalc.nasc;fillSerie(k)}});

// filhos (vários alunos no mesmo pedido)
var kids=document.getElementById("kids"),kc=0;
function serieOptions(){var o='<option value="">Escolha</option>',L=["Berçário","Turma de 1 ano","Turma de 2 anos","Turma de 3 anos","Pré I (4 anos)","Pré II (5 anos)"];
 L.forEach(function(x){o+="<option>"+x+"</option>"});for(var i=1;i<=9;i++)o+="<option>"+i+"º ano</option>";for(i=1;i<=3;i++)o+="<option>"+i+"ª série do médio</option>";return o+"<option>Pré-vestibular</option>"}
function addKid(){if(kc>=4)return;kc++;var d=document.createElement("div");d.className="kid";var id="k"+kc;
 d.innerHTML='<div class="fld fn"><label for="'+id+'n">Nome do aluno</label><input id="'+id+'n" class="knm" autocomplete="off"></div>'+
 '<div class="fld"><label for="'+id+'d">Nascimento</label><input type="date" id="'+id+'d" class="kn" min="2005-01-01"></div>'+
 '<div class="fld"><label for="'+id+'s">Série em '+ANO+'</label><select id="'+id+'s" class="ks">'+serieOptions()+'</select></div>'+
 '<button type="button" class="x" aria-label="Remover este aluno"'+(kc==1?" hidden":"")+'>&times;</button>';
 kids.appendChild(d);d.querySelector(".kn").addEventListener("change",function(){fillSerie(d)});
 d.querySelector(".x").addEventListener("click",function(){d.remove();kc--;document.getElementById("addk").hidden=false});
 if(kc>=4)document.getElementById("addk").hidden=true;return d}
function fillSerie(d){var r=serie(d.querySelector(".kn").value);if(!r||r.erro)return;var s=d.querySelector(".ks"),want=r.seg=="medio"?r.s+" do médio":r.seg=="infantil"&&/^Pré/.test(r.s)?r.s.replace(", turma de "," (").replace(" anos"," anos)"):r.s;
 for(var i=0;i<s.options.length;i++)if(s.options[i].text==want){s.selectedIndex=i;break}}
addKid();document.getElementById("addk").addEventListener("click",function(){var d=addKid();if(d)d.querySelector(".knm").focus()});

// dias úteis dos próximos 14 dias
(function(){var box=document.getElementById("dias"),W=["dom","seg","ter","qua","qui","sex","sáb"],h="",n=0;
 for(var i=1;i<=21&&n<8;i++){var d=new Date(TODAY.getTime()+i*864e5),w=d.getUTCDay();if(w==0||w==6)continue;n++;
  var lab=W[w]+", "+d.getUTCDate()+"/"+(d.getUTCMonth()+1);
  h+='<label><input type="radio" name="dia" value="'+lab+'"'+(n==1?" checked":"")+'><span>'+W[w]+'<b>'+d.getUTCDate()+'/'+(d.getUTCMonth()+1)+'</b></span></label>'}
 h+='<label><input type="radio" name="dia" value="Combinar pelo WhatsApp"><span>Combinar<b>depois</b></span></label>';box.innerHTML=h})();

// segmento escolhido nos cards
var segPref="";
document.querySelectorAll("[data-seg]").forEach(function(a){a.addEventListener("click",function(){segPref=SEGN[a.dataset.seg]||""})});

// envio
function val(n){var e=document.querySelector('input[name="'+n+'"]:checked');return e?e.value:""}
document.getElementById("f").addEventListener("submit",function(e){e.preventDefault();var err=document.getElementById("ferr");err.textContent="";
 var resp=document.getElementById("resp").value.trim();
 if(!resp){err.textContent="Coloque o seu nome.";document.getElementById("resp").focus();return}
 if(!document.getElementById("lgpd").checked){err.textContent="Marque a autorização para a escola responder.";document.getElementById("lgpd").focus();return}
 var al=[];document.querySelectorAll(".kid").forEach(function(k){var nm=k.querySelector(".knm").value.trim(),dn=k.querySelector(".kn").value,s=k.querySelector(".ks").value;
  if(!nm&&!dn&&!s)return;var t="- "+(nm||"Aluno");if(dn){var p=dn.split("-");t+=", nascido(a) em "+p[2]+"/"+p[1]+"/"+p[0]}if(s)t+=" ("+s+" em "+ANO+")";al.push(t)});
 var m="Olá! Gostaria de agendar uma visita ao Colégio Dom Bosco Vila Matilde.\\n\\nResponsável: "+resp;
 if(al.length)m+="\\n"+(al.length>1?"Alunos":"Aluno")+":\\n"+al.join("\\n");else if(segPref)m+="\\nInteresse: "+segPref;
 m+="\\nPeríodo de interesse: "+val("per")+"\\nVisita: "+val("dia")+(val("dia").indexOf("Combinar")?", "+val("hor").toLowerCase():"");
 var o=document.getElementById("orig").value;if(o)m+="\\nConheci a escola por: "+o;
 var ob=document.getElementById("obs").value.trim();if(ob)m+="\\nDúvida: "+ob;
 track("visita_enviada",{alunos:al.length,periodo:val("per"),origem:o||"nao_informado"});openWA(m);
});
document.querySelectorAll("[data-wa]").forEach(function(a){a.addEventListener("click",function(e){e.preventDefault();track("clique_whatsapp",{local:a.closest("section,footer,nav")?((a.closest("section,footer,nav").id)||a.closest("section,footer,nav").className):""});
 openWA("Olá! Gostaria de saber mais sobre as matrículas 2027 no Colégio Dom Bosco Vila Matilde.")})});
document.addEventListener("click",function(e){var a=e.target.closest("a");if(!a)return;var h=a.getAttribute("href")||"";
 if(h.indexOf("tel:")==0)track("clique_telefone");else if(h.indexOf("google.com/maps")>-1||h.indexOf("waze.com")>-1)track("clique_rota");else if(h.indexOf("instagram.com/colegio")>-1)track("clique_instagram");else if(h.indexOf("educbank")>-1)track("clique_boleto")});
if(!WHATSAPP_NUMBER)document.getElementById("wn").textContent="Prévia: o número oficial ainda não foi configurado, então o WhatsApp vai pedir para você escolher o contato.";

// cabeçalho e barra fixa
var hd=document.getElementById("hd"),bar=document.getElementById("mbar"),pastHero=false,atForm=false;
function sync(){bar.classList.toggle("on",pastHero&&!atForm)}
addEventListener("scroll",function(){hd.classList.toggle("sc",scrollY>10)},{passive:true});
if("IntersectionObserver" in window){
 new IntersectionObserver(function(es){pastHero=!es[0].isIntersecting;sync()}).observe(document.querySelector(".hero .ctas"));
 new IntersectionObserver(function(es){atForm=es.some(function(x){return x.isIntersecting});sync()},{threshold:.05}).observe(document.getElementById("f"));
}
})();
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "index.html"), html);
fs.writeFileSync(path.join(ROOT, "favicon.svg"), DB.mono('xmlns="http://www.w3.org/2000/svg"').replace('aria-hidden="true"', ''));
fs.writeFileSync(path.join(ROOT, "robots.txt"), "User-agent: *\nAllow: /\n\nSitemap: " + SITE + "sitemap.xml\n");
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>' + SITE + '</loc></url></urlset>\n');
console.log("index.html", (html.length / 1024).toFixed(1) + " KB");
