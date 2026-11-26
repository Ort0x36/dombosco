"""Gera og-image.png (1200x630), a imagem de prévia do link no WhatsApp. Uso: python3 assets-src/make_og.py
Regras (Looping, Pet Boss e Fornatta): nome da marca grande e legível na miniatura, frase que diz o que é,
ilustração cheia num arco à direita, fundo escuro da marca e dois selos embaixo."""
import pathlib
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
MARCA = (ROOT / "assets-src" / "marca.js").as_uri()
FONTS = (ROOT / "fonts").as_uri()
HTML = """<!DOCTYPE html><html><head><meta charset="utf-8">
<script src="MARCA"></script>
<style>
@font-face{font-family:"Barlow Condensed";font-weight:700;src:url(FONTS/barlow-condensed-700.woff2)}
@font-face{font-family:"Barlow Condensed";font-weight:600;src:url(FONTS/barlow-condensed-600.woff2)}
@font-face{font-family:Figtree;font-weight:400 700;src:url(FONTS/figtree.woff2)}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;background:#12306B;color:#fff;font-family:Figtree,sans-serif;position:relative}
body:before{content:"";position:absolute;left:-160px;bottom:-260px;width:560px;height:560px;border-radius:50%;background:radial-gradient(circle,rgba(255,137,28,.28),rgba(255,137,28,0) 70%)}
.col{position:absolute;left:66px;top:46px;bottom:52px;width:660px;display:flex;flex-direction:column}
.lk{display:flex;align-items:center;gap:16px}
.lk .m svg{width:132px;height:92px}
.lk b{display:block;font:700 76px/0.9 'Barlow Condensed';letter-spacing:1px}
.lk b span{color:#5CC9C6}
.lk small{display:block;font:600 22px 'Barlow Condensed';letter-spacing:.32em;color:#FFB21C;margin-top:6px}
h1{margin-top:auto;font:700 78px/0.98 'Barlow Condensed';letter-spacing:.2px}
h1 em{font-style:normal;color:#FFB21C}
p{margin:16px 0 auto;font:500 27px/1.36 Figtree;color:#D6E1F2}
.chips{display:flex;gap:12px}
.chip{display:inline-flex;align-items:center;height:56px;padding:0 26px;border-radius:99px;font:700 22px Figtree;white-space:nowrap}
.c1{border:2px solid rgba(255,255,255,.55);color:#fff}.c2{background:#FF891C;color:#0B1F49}
.arch{position:absolute;right:58px;top:50px;width:396px;height:530px;border-radius:198px 198px 28px 28px;background:linear-gradient(180deg,#2B7FB5,#239394);overflow:hidden;border:4px solid rgba(255,255,255,.14)}
.arch .sc{position:absolute;left:-46px;right:-46px;bottom:-6px}
.arch .sc svg{width:100%;height:auto}
.tag{position:absolute;right:30px;top:118px;background:#fff;color:#12306B;border-radius:18px;padding:14px 18px;font:700 21px/1.15 Figtree;box-shadow:0 18px 30px -14px rgba(0,0,0,.5);display:flex;gap:12px;align-items:center}
.tag svg{width:42px;height:42px}
</style></head><body>
<div class="col">
 <div class="lk"><div class="m" id="mono"></div><div><b>DOM<span>BOSCO</span></b><small>VILA MATILDE</small></div></div>
 <h1>Escola particular<br><em>na Vila Matilde.</em></h1>
 <p>Da educação infantil ao ensino médio.<br>Manhã, tarde e período integral.</p>
 <div class="chips"><span class="chip c1">Zona leste de São Paulo</span><span class="chip c2">Matrículas 2027 abertas</span></div>
</div>
<div class="arch"><div class="sc" id="sc"></div></div>
<div class="tag" id="tag"></div>
<script>
document.getElementById("mono").innerHTML=DB.mono('',{dA:"#5CC9C6",dB:"#9BE6E3"});
document.getElementById("sc").innerHTML=DB.escola();
document.getElementById("tag").innerHTML=DB.ico("calendario")+"<span>Agende<br>sua visita</span>";
</script>
</body></html>""".replace("MARCA", MARCA).replace("FONTS", FONTS)

tmp = ROOT / "assets-src" / "og-image.html"
tmp.write_text(HTML, encoding="utf-8")
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1200, "height": 630})
    pg.goto(tmp.as_uri())
    pg.wait_for_timeout(500)
    pg.screenshot(path=str(ROOT / "og-image.png"))
    b.close()
print("og-image.png", (ROOT / "og-image.png").stat().st_size // 1024, "KB")
