# SAVE ONE PERSON ALERT, approved format (Lauren, Nov 19 2026): title on top, the person's photo on a
# phone screen on the LEFT with a glowing halo and rotating light beams, the story typing out on the
# RIGHT (one caption pair every `seg` seconds), yellow band "HELP <NAME> FIND A / LIVING <ORGAN> DONOR /
# SAVEONEPERSONNOW.ORG", heavenly music (music.py). Used by v4.py (1080x1920) and v4w.py (1920x1080).
import json, sys, math, random, subprocess, os
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
BL = "/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO = "/usr/share/fonts/opentype/inter/Inter-Bold.otf"
NAVY = (15, 42, 74); GOLD = (255, 206, 64); FPS = 30
def F(s, f=BL): return ImageFont.truetype(f, s)
def fit(d, t, f, s, mw):
    while d.textlength(t, font=F(s, f)) > mw: s -= 2
    return F(s, f)
def wrap(d, t, font, mw):
    out, cur = [], ''
    for w in t.split():
        c = (cur + ' ' + w).strip()
        if d.textlength(c, font=font) <= mw: cur = c
        else: out.append(cur); cur = w
    return out + [cur]

def render(cfg, L):
    """L = layout dict: W,H, title (y, size1, size2), phone (x,y,w,h), cap (x,y,w), band (x,y,w,h,sizes)"""
    W, H = L['W'], L['H']; dur = cfg['seg'] * len(cfg['caps']); N = int(round(dur * FPS))
    px, py, pw, ph = L['phone']; CX, CY = px + pw // 2, py + ph // 2
    # background: navy-to-gold heaven
    yy = np.linspace(0, 1, H)[:, None]
    bg = np.zeros((H, W, 3), np.float32)
    bg[..., 0] = 14 + 40 * yy; bg[..., 1] = 24 + 18 * yy; bg[..., 2] = 64 - 6 * yy
    bgi = Image.fromarray(bg.clip(0, 255).astype(np.uint8)).convert('RGBA')
    g = Image.new('RGBA', (W, H), (0, 0, 0, 0)); gd = ImageDraw.Draw(g)
    for i in range(24, 0, -1):
        r = i * 40; gd.ellipse((CX - r, CY - r, CX + r, CY + r), fill=(255, 210, 130, int(5 + 6 * (1 - i / 24))))
    bgi.alpha_composite(g.filter(ImageFilter.GaussianBlur(40)))
    # rays (rotated each frame)
    S = int(2 * max(math.hypot(x - CX, y - CY) for x in (0, W) for y in (0, H)) / 2) // 2 * 2 + 8; ray = Image.new('RGBA', (S, S), (0, 0, 0, 0)); rd = ImageDraw.Draw(ray); c = S / 2
    for k in range(20):
        a = k * 2 * math.pi / 20; w = 0.05 if k % 2 else 0.09; R_ = S * 0.72
        rd.polygon([(c, c), (c + R_ * math.cos(a - w), c + R_ * math.sin(a - w)), (c + R_ * math.cos(a + w), c + R_ * math.sin(a + w))],
                   fill=(255, 236, 190, 60 if k % 2 else 90))
    m = Image.new('L', (S, S), 0); md = ImageDraw.Draw(m)
    for i in range(60, 0, -1): md.ellipse((c - i * S / 120, c - i * S / 120, c + i * S / 120, c + i * S / 120), fill=int(255 * (1 - i / 60) ** 0.6))
    ray.putalpha(Image.composite(ray.getchannel('A'), Image.new('L', (S, S), 0), m))
    ray = ray.filter(ImageFilter.GaussianBlur(3))
    # halo pulse frames (2 s loop)
    halos = []
    for i in range(60):
        p = 0.5 + 0.5 * math.sin(2 * math.pi * i / 60)
        h = Image.new('RGBA', (W, H), (0, 0, 0, 0)); hd = ImageDraw.Draw(h); e = 26 + 22 * p
        hd.rounded_rectangle((px - e, py - e, px + pw + e, py + ph + e), radius=int(pw * 0.16), fill=(255, 246, 220, int(140 + 100 * p)))
        halos.append(h.filter(ImageFilter.GaussianBlur(26 + 12 * p)))
    # sparkles (precomputed 4 s loop)
    random.seed(3); sp = []
    P = [(random.uniform(0, W), random.uniform(0, H), random.uniform(2.5, 7), random.uniform(0, 1), random.uniform(-25, -8)) for _ in range(int(70 * W * H / 2e6))]
    for i in range(120):
        s = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sd = ImageDraw.Draw(s)
        for x, y, rr, phs, vy in P:
            y2 = (y + vy * i / FPS * 4) % H; tw = 0.5 + 0.5 * math.sin(2 * math.pi * (i / 120 + phs)); a = int(50 + 170 * tw)
            sd.ellipse((x - rr, y2 - rr, x + rr, y2 + rr), fill=(255, 240, 200, a))
            if tw > 0.85:
                sd.line((x - rr * 3, y2, x + rr * 3, y2), fill=(255, 255, 255, a), width=2); sd.line((x, y2 - rr * 3, x, y2 + rr * 3), fill=(255, 255, 255, a), width=2)
        sp.append(s.filter(ImageFilter.GaussianBlur(1.1)))
    # static top layer: title, phone + photo, band
    top = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(top)
    ty, s1, s2 = L['title']
    tl = Image.new('RGBA', (W, H), (0, 0, 0, 0)); td = ImageDraw.Draw(tl)
    if L.get('title_one_line'):
        f1 = fit(td, "SAVE ONE PERSON ALERT", BL, s1, W - 160)
        a1, a2 = "SAVE ONE PERSON ", "ALERT"; tw_ = td.textlength(a1 + a2, font=f1); x0 = (W - tw_) / 2
        td.text((x0, ty), a1, font=f1, fill=(255, 255, 255, 255)); td.text((x0 + td.textlength(a1, font=f1), ty), a2, font=f1, fill=GOLD + (255,))
    else:
        f1 = fit(td, "SAVE ONE PERSON", BL, s1, W - 120); f2 = F(s2)
        td.text(((W - td.textlength("SAVE ONE PERSON", font=f1)) / 2, ty), "SAVE ONE PERSON", font=f1, fill=(255, 255, 255, 255))
        td.text(((W - td.textlength("ALERT", font=f2)) / 2, ty + f1.size + 4), "ALERT", font=f2, fill=GOLD + (255,))
    for b in (20, 8): top.alpha_composite(tl.filter(ImageFilter.GaussianBlur(b)))
    top.alpha_composite(tl)
    # phone body
    bez = int(pw * 0.045); rad = int(pw * 0.15)
    sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(sh).rounded_rectangle((px + 10, py + 18, px + pw + 10, py + ph + 18), radius=rad, fill=(0, 0, 0, 120))
    top.alpha_composite(sh.filter(ImageFilter.GaussianBlur(18)))
    d.rounded_rectangle((px - 3, py - 3, px + pw + 3, py + ph + 3), radius=rad + 3, fill=(205, 210, 222, 255))
    d.rounded_rectangle((px, py, px + pw, py + ph), radius=rad, fill=(18, 18, 22, 255))
    sx, sy, sw, shh = px + bez, py + bez, pw - 2 * bez, ph - 2 * bez
    pho = Image.open(cfg['photo']).convert('RGB').crop(tuple(cfg['crop']))
    k = max(sw / pho.width, shh / pho.height); pho = pho.resize((int(pho.width * k) + 1, int(pho.height * k) + 1), Image.LANCZOS)
    ox = (pho.width - sw) // 2; oy = int((pho.height - shh) * cfg.get('valign', 0.0))
    pho = pho.crop((ox, oy, ox + sw, oy + shh))
    mk = Image.new('L', (sw, shh), 0); ImageDraw.Draw(mk).rounded_rectangle((0, 0, sw, shh), radius=rad - bez, fill=255)
    top.paste(pho, (sx, sy), mk)
    # dynamic island + screen gloss
    iw = int(pw * 0.3); ih = int(pw * 0.075); d.rounded_rectangle((CX - iw // 2, sy + 14, CX + iw // 2, sy + 14 + ih), radius=ih // 2, fill=(8, 8, 10, 255))
    gl = Image.new('RGBA', (W, H), (0, 0, 0, 0)); ImageDraw.Draw(gl).polygon([(sx, sy), (sx + sw * 0.55, sy), (sx, sy + shh * 0.35)], fill=(255, 255, 255, 22))
    top.alpha_composite(gl)
    # band
    bx, by, bw, bh, bsz = L['band']
    d.rounded_rectangle((bx, by, bx + bw, by + bh), radius=36, fill=(255, 200, 0, 255))
    lines = (cfg['band1'], cfg['band2'], "SAVEONEPERSONNOW.ORG"); cols = (NAVY, NAVY, (20, 20, 20))
    fs = [fit(d, t, BL, sz, bw - 70) for t, sz in zip(lines, bsz)]
    tot = sum(f.size for f in fs) + 18 * 2 + 6; yb = by + (bh - tot) / 2 - 4
    for t, f, col in zip(lines, fs, cols):
        d.text((bx + (bw - d.textlength(t, font=f)) / 2, yb), t, font=f, fill=col); yb += f.size + (24 if f is fs[1] else 18)
    # caption layout (precompute wrapped lines per caption)
    cx, cy, cw, csz1, csz2 = L['cap']; dd = ImageDraw.Draw(Image.new('RGB', (10, 10)))
    caps = []
    for a, b in cfg['caps']:
        s = csz1
        while True:
            fa = F(s); la = wrap(dd, a, fa, cw)
            if len(la) <= 3 and all(dd.textlength(x, font=fa) <= cw for x in la): break
            s -= 2
        s = csz2
        while True:
            fb = F(s, BO); lb = wrap(dd, b, fb, cw)
            if len(lb) <= 3 and all(dd.textlength(x, font=fb) <= cw for x in lb): break
            s -= 2
        caps.append((la, fa, lb, fb))
    def cap_layer(i, tt):
        la, fa, lb, fb = caps[i]; seg = cfg['seg']
        tot = sum(map(len, la)) + sum(map(len, lb)); n = int(min(tot, tt * 34))
        hgt = len(la) * (fa.size + 10) + 26 + len(lb) * (fb.size + 10)
        im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); dl = ImageDraw.Draw(im)
        y = cy + (L['cap_h'] - hgt) / 2; left = n; cur = None
        for lines, f, col in ((la, fa, GOLD), (lb, fb, (255, 255, 255))):
            for ln in lines:
                shown = ln[:max(0, left)]; left -= len(ln)
                dl.text((cx, y), shown, font=f, fill=col + (255,))
                if shown and (left < 0 or (left == 0)): cur = (cx + dl.textlength(shown, font=f) + 6, y, f.size)
                y += f.size + 10
            y += 16
        if cur and (n < tot or int(tt * 2) % 2 == 0):
            dl.rectangle((cur[0], cur[1] + 4, cur[0] + max(5, cur[2] // 9), cur[1] + cur[2] * 0.95), fill=(255, 255, 255, 230))
        sh = Image.new('RGBA', (W, H), (0, 0, 0, 0)); sh.alpha_composite(im)
        a_ = np.array(sh); a_[..., :3] = 0; a_[..., 3] = (a_[..., 3] * 0.7).astype(np.uint8)
        out = Image.fromarray(a_).filter(ImageFilter.GaussianBlur(6)); out.alpha_composite(im)
        fade = min(1, tt / 0.25, (seg - tt) / 0.3)
        if fade < 1:
            a_ = np.array(out); a_[..., 3] = (a_[..., 3] * max(0, fade)).astype(np.uint8); out = Image.fromarray(a_)
        return out
    # music
    wav = cfg.get('music') or (os.path.splitext(cfg['out'])[0] + '.wav')
    if not os.path.exists(wav):
        subprocess.run([sys.executable, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'music.py'), str(dur), wav], check=True)
    ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                           '-i', wav, '-map', '0:v', '-map', '1:a', '-t', str(dur), '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
                           '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', cfg['out']], stdin=subprocess.PIPE)
    cache = {}
    for fi in range(N):
        t = fi / FPS
        fr = bgi.copy()
        rr = ray.rotate(-t * 9, resample=Image.BILINEAR, center=(S / 2, S / 2))
        rr = rr.crop((S // 2 - CX // 2, S // 2 - CY // 2, S // 2 - CX // 2 + W // 2, S // 2 - CY // 2 + H // 2)).resize((W, H), Image.BILINEAR)
        fr.alpha_composite(rr)
        fr.alpha_composite(sp[fi % 120]); fr.alpha_composite(halos[fi % 60]); fr.alpha_composite(top)
        i = min(len(caps) - 1, int(t / cfg['seg'])); tt = t - i * cfg['seg']
        key = (i, int(min(999, tt * 34)), int(tt * 2) % 2, int(min(1, tt / 0.25, (cfg['seg'] - tt) / 0.3) * 20))
        if key not in cache: cache = {key: cap_layer(i, tt)}
        fr.alpha_composite(cache[key])
        a = np.asarray(fr.convert('RGB'), dtype=np.float32)
        fade = min(1, t / 0.5, (dur - t) / 0.7)
        if fade < 1: a *= max(0, fade)
        ff.stdin.write(a.astype(np.uint8).tobytes())
    ff.stdin.close(); ff.wait(); print('ok', cfg['out'], dur)
