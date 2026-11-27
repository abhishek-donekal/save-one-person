# Saturday rockstar spot (fictional rockstar, real Urgent Requests person on the jumbotron, no money ask).
# Run from repo root: python3 ops/video/rockstar/make.py  -> public/social/dramas/rockstar-gavin-phone.mp4
import numpy as np, wave, subprocess, math, os, random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS, DUR = 1080, 1920, 30, 16.0
NF = int(FPS * DUR)
OUT = 'public/social/dramas/rockstar-gavin-phone.mp4'
PHOTO = 'public/images/urgent/gavin-durham.jpg'
TMP = os.environ.get('TMPDIR', '/tmp') + '/rock_audio.wav'
F = '/usr/share/fonts/opentype/inter/'
def font(n, s): return ImageFont.truetype(F + n, s)
BLACK, XB = 'InterDisplay-Black.otf', 'InterDisplay-ExtraBold.otf'
random.seed(7); np.random.seed(7)

# ---------------- audio ----------------
SR = 44100; N = int(SR * DUR); BPM = 132; B = 60 / BPM
au = np.zeros((N, 2))
def add(sig, t, g=1.0, pan=0.0):
    i = int(t * SR); s = sig[:max(0, N - i)] * g
    au[i:i + len(s), 0] += s * (1 - max(0, pan)); au[i:i + len(s), 1] += s * (1 + min(0, pan))
def kick():
    t = np.arange(int(.3 * SR)) / SR; f = 45 + 120 * np.exp(-t * 35)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 10)
def snare():
    t = np.arange(int(.22 * SR)) / SR; n = np.random.randn(len(t))
    return (n * .6 + np.sin(2 * np.pi * 200 * t) * .4) * np.exp(-t * 16)
def hat():
    t = np.arange(int(.05 * SR)) / SR; n = np.random.randn(len(t)); n -= np.convolve(n, np.ones(4) / 4, 'same')
    return n * np.exp(-t * 70) * .3
nf = lambda m: 440 * 2 ** ((m - 69) / 12)
def power(m, d):  # distorted power chord
    t = np.arange(int(d * SR)) / SR; s = 0
    for mm in (m, m + 7, m + 12):
        f = nf(mm); s = s + sum(np.sin(2 * np.pi * f * k * t * (1 + .003 * j)) / k for k in range(1, 7) for j in (0, 1))
    s = np.tanh(s * 1.8) * np.minimum(1, t / .01) * np.exp(-t * 1.2)
    return s
def crowd(d, swell):
    n = np.random.randn(int(d * SR))
    for _ in range(3): n = np.convolve(n, np.ones(6) / 6, 'same')
    t = np.arange(len(n)) / SR
    return n * swell(t)
# intro: crowd murmur then guitar
add(crowd(DUR, lambda t: .25 + .9 * np.exp(-((t - 3.4) ** 2) / .8) + .7 * np.exp(-((t - 10.6) ** 2) / 1.2)
          + 1.0 * np.clip((t - 13.2) / .6, 0, 1)), 0, g=.5)
riff = [40, 40, 43, 45, 40, 40, 47, 45]
bars = int(DUR / (4 * B)) + 1
for bar in range(bars):
    t0 = bar * 4 * B
    for b in range(4):
        tb = t0 + b * B
        if tb < .9: continue
        soft = 0.45 if 4.0 < tb < 10.0 else 1.0   # duck under the jumbotron reveal text
        add(kick(), tb, g=.9 * soft)
        if b in (1, 3): add(snare(), tb, g=.55 * soft)
        add(hat(), tb, g=.7 * soft, pan=.3); add(hat(), tb + B / 2, g=.5 * soft, pan=.3)
        add(power(riff[(bar * 2 + b // 2) % 8], B * .95), tb, g=.07 * soft, pan=-.15)
# big chord hits at reveal + end card
for t in (3.2, 13.0):
    add(power(40, 2.5), t, g=.16); add(kick(), t, g=1.2)
fade = int(1.0 * SR); au[-fade:] *= np.linspace(1, 0, fade)[:, None]
au = np.tanh(au * 1.2); au /= np.abs(au).max(); au *= .9
w = wave.open(TMP, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((au * 32767).astype(np.int16).tobytes()); w.close()

# ---------------- visuals ----------------
# static stadium background
yy = np.linspace(0, 1, H)[:, None]
bg = np.zeros((H, W, 3))
bg[..., 0] = 8 + 30 * yy; bg[..., 1] = 6 + 10 * yy; bg[..., 2] = 30 + 40 * (1 - yy)
bgimg = Image.fromarray(bg.astype(np.uint8))
d = ImageDraw.Draw(bgimg)
# stands rings in the distance
for i in range(6):
    y = 1040 + i * 18
    d.rectangle([0, y, W, y + 10], fill=(25 + i * 4, 20 + i * 3, 45 + i * 4))
# stage
d.polygon([(60, 1200), (1020, 1200), (1080, 1300), (0, 1300)], fill=(30, 30, 38))
d.rectangle([0, 1300, W, 1320], fill=(255, 190, 40))
# speaker stacks
for x in (40, 900):
    d.rectangle([x, 820, x + 140, 1200], fill=(18, 18, 22), outline=(60, 60, 70), width=4)
    for k in range(3): d.ellipse([x + 30, 850 + k * 115, x + 110, 930 + k * 115], fill=(40, 40, 48))
# crowd heads (several rows)
crowd_pts = []
for row in range(9):
    y = 1340 + row * 68
    for x in range(-30, W + 30, 52 - row):
        xx = x + random.randint(-12, 12); r = 26 + row * 3
        crowd_pts.append((xx, y + random.randint(-8, 8), r))
for (x, y, r) in crowd_pts:
    c = (12, 10, 18)
    d.ellipse([x - r, y - r, x + r, y + r], fill=c)
    d.rectangle([x - r * 1.3, y + r * .6, x + r * 1.3, y + r * 3], fill=c)
BG = np.asarray(bgimg).astype(np.float32)

# jumbotron
JX0, JY0, JX1, JY1 = 270, 200, 810, 880
photo = Image.open(PHOTO).convert('RGB')
pw, ph = JX1 - JX0 - 30, JY1 - JY0 - 30
s = max(pw / photo.width, ph / photo.height)
photo = photo.resize((int(photo.width * s), int(photo.height * s)), Image.LANCZOS)
ox = (photo.width - pw) // 2; photo = photo.crop((ox, 0, ox + pw, ph))

phones = [(random.randint(0, W), random.randint(1360, 1880), random.random() * 6.28) for _ in range(140)]
arms = [(random.randint(20, W - 20), random.randint(1380, 1800), random.random() * 6.28) for _ in range(26)]

def text_c(dr, y, s, f, fill=(255, 255, 255), stroke=0, sc=(0, 0, 0)):
    tw = dr.textlength(s, font=f); dr.text(((W - tw) / 2, y), s, font=f, fill=fill, stroke_width=stroke, stroke_fill=sc)

def rocker(dr, t):
    # silhouette rockstar at centre stage, strumming
    cx, base = 540, 1262
    bob = 6 * math.sin(t * 2 * math.pi * BPM / 60)
    c = (5, 5, 8)
    dr.ellipse([cx - 34, base - 330 + bob, cx + 34, base - 262 + bob], fill=c)              # head
    dr.polygon([(cx - 30, base - 270 + bob), (cx - 52, base - 255 + bob), (cx - 38, base - 150), (cx + 38, base - 150),
                (cx + 52, base - 255 + bob), (cx + 30, base - 270 + bob)], fill=c)           # jacket
    dr.line([(cx - 22, base - 150), (cx - 60, base)], fill=c, width=26)                      # legs
    dr.line([(cx + 22, base - 150), (cx + 60, base)], fill=c, width=26)
    # mic stand
    dr.line([(cx, base), (cx, base - 280)], fill=(40, 40, 45), width=6)
    # guitar body + neck
    dr.ellipse([cx - 70, base - 210 + bob, cx + 20, base - 130 + bob], fill=(150, 20, 30))
    dr.line([(cx + 10, base - 180 + bob), (cx + 150, base - 250 + bob)], fill=(150, 20, 30), width=12)
    strum = 10 * math.sin(t * 2 * math.pi * BPM / 30)
    dr.line([(cx + 40, base - 250 + bob), (cx - 20, base - 170 + bob + strum)], fill=c, width=18)  # arm
    if 0.8 < t < 13:  # raised fist on the big moments
        up = 1 if (3.0 < t < 5.0) or (10.0 < t < 12.5) else 0
        dr.line([(cx - 40, base - 255 + bob), (cx - 90, base - 330 - 60 * up + bob)], fill=c, width=18)

CAPS = [  # (start, end, lines, color)
    (0.4, 3.1, ["LIVE TONIGHT", "IN THE STADIUM"], (255, 210, 60)),
    (3.2, 5.6, ["\"Before our last song,", "I want you to", "meet my friend Gavin.\""], (255, 255, 255)),
    (5.7, 8.0, ["\"He's 13. He's from", "Randleman, North Carolina.\""], (255, 255, 255)),
    (8.1, 10.4, ["\"Gavin needs a", "LIVING KIDNEY DONOR.\""], (255, 90, 90)),
    (10.5, 12.9, ["\"Phones up if you'll", "help find his match!\""], (255, 255, 255)),
]

proc = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}',
                         '-r', str(FPS), '-i', '-', '-i', TMP, '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
                         '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', OUT],
                        stdin=subprocess.PIPE)
fb = font(BLACK, 76); fcap = font(XB, 62); fsm = font(XB, 44)
for fi in range(NF):
    t = fi / FPS
    if t < 13.0:
        frame = BG.copy()
        # sweeping spotlights
        ov = Image.new('L', (W, H), 0); od = ImageDraw.Draw(ov)
        for k, (x0, col) in enumerate([(120, 0), (960, 1), (540, 2)]):
            ang = math.sin(t * (0.9 + .3 * k) + k * 2) * 0.55
            tx = x0 + math.sin(ang) * 1400; ty = 1500
            od.polygon([(x0 - 8, 0), (x0 + 8, 0), (tx + 170, ty), (tx - 170, ty)], fill=70)
        ov = ov.filter(ImageFilter.GaussianBlur(30))
        a = np.asarray(ov).astype(np.float32)[..., None] / 255
        frame = frame + a * np.array([255, 230, 170]) * .55
        img = Image.fromarray(np.clip(frame, 0, 255).astype(np.uint8))
    else:
        img = Image.new('RGB', (W, H), (14, 22, 60))
    dr = ImageDraw.Draw(img)
    if t < 13.0:
        # jumbotron frame
        dr.rectangle([JX0 - 12, JY0 - 12, JX1 + 12, JY1 + 12], fill=(40, 40, 48), outline=(90, 90, 100), width=6)
        dr.line([(540, JY1 + 12), (540, 1040)], fill=(40, 40, 48), width=24)
        if t < 3.2:
            # screen idle: band logo flicker
            dr.rectangle([JX0, JY0, JX1, JY1], fill=(20, 10, 40))
            fl = 180 + int(60 * math.sin(t * 9))
            text_c(dr, 470, "SAVE ONE", font(BLACK, 96), fill=(fl, 40, 60))
            text_c(dr, 580, "WORLD TOUR", font(XB, 50), fill=(200, 200, 220))
        else:
            k = min(1, (t - 3.2) / .35)
            if k < 1:  # white flash
                dr.rectangle([JX0, JY0, JX1, JY1], fill=(255, 255, 255))
            img.paste(Image.blend(Image.new('RGB', photo.size, (255, 255, 255)), photo, k), (JX0 + 15, JY0 + 15))
            dr.rectangle([JX0 + 15, JY1 - 105, JX1 - 15, JY1 - 15], fill=(200, 20, 40))
            text_c(dr, JY1 - 98, "GAVIN, 13", font(BLACK, 64))
        rocker(dr, t)
        # phone lights + raised arms (more after 10.5s)
        lit = 0.25 + 0.75 * min(1, max(0, (t - 10.4) / .8))
        for (x, y, ph_) in phones[:int(len(phones) * lit)]:
            xx = x + 10 * math.sin(t * 2.2 + ph_)
            g = int(180 + 70 * math.sin(t * 5 + ph_))
            dr.rectangle([xx - 7, y - 12, xx + 7, y + 12], fill=(g, g, 255 if g < 250 else 255))
        for (x, y, ph_) in arms:
            sway = 18 * math.sin(t * 3 + ph_)
            dr.line([(x, y), (x + sway, y - 120)], fill=(10, 8, 16), width=16)
        # SAVE ONE ALERT banner
        dr.rectangle([0, 60, W, 160], fill=(200, 20, 40))
        text_c(dr, 72, "SAVE ONE ALERT", font(BLACK, 70))
        for (a0, a1, lines, col) in CAPS:
            if a0 <= t < a1:
                pop = min(1, (t - a0) / .15)
                hgt = len(lines) * 76 + 40
                y0 = 1390
                box = Image.new('RGBA', (W - 60, hgt), (0, 0, 0, int(190 * pop)))
                img.paste(box, (30, y0), box)
                for j, ln in enumerate(lines):
                    text_c(dr, y0 + 22 + j * 76, ln, fcap, fill=col, stroke=3)
    else:
        # end card
        k = min(1, (t - 13.0) / .3)
        dr.rectangle([0, 60, W, 160], fill=(200, 20, 40))
        text_c(dr, 72, "SAVE ONE ALERT", font(BLACK, 70))
        sm = photo.resize((int(photo.width * .62), int(photo.height * .62)))
        img.paste(sm, ((W - sm.width) // 2, 210))
        y = 210 + sm.height + 30
        text_c(dr, y, "Could YOU be", fb); text_c(dr, y + 88, "Gavin's living", fb); text_c(dr, y + 176, "kidney donor?", fb)
        text_c(dr, y + 290, "Donors 18+  |  Blood type B or O", fsm, fill=(255, 210, 60))
        text_c(dr, y + 350, "Free, confidential Duke screening", fsm, fill=(220, 225, 240))
        dr.rounded_rectangle([60, y + 440, W - 60, y + 560], radius=24, fill=(255, 210, 60))
        text_c(dr, y + 462, "saveonepersonnow.org/gavin", font(BLACK, 62), fill=(14, 22, 60))
        text_c(dr, y + 600, "Be the Miracle", font(BLACK, 70), fill=(255, 255, 255))
        if k < 1:
            img = Image.blend(Image.new('RGB', (W, H), (255, 255, 255)), img, k)
    proc.stdin.write(img.tobytes())
proc.stdin.close(); proc.wait(); os.remove(TMP)
print('wrote', OUT)
