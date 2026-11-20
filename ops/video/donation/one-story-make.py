import subprocess, numpy as np, wave, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS, DUR = 1080, 1920, 30, 24.0
NAVY = (14, 40, 73); NAVY2 = (22, 58, 102); YEL = (255, 200, 0); WHITE = (255, 255, 255)
FB = '/usr/share/fonts/opentype/inter/Inter-Black.otf'
FX = '/usr/share/fonts/opentype/inter/Inter-ExtraBold.otf'
FS = '/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
f = lambda p, s: ImageFont.truetype(p, s)

FX0, FY0, FW, FH = 40, 560, 1000, 556  # footage box

# ---------- base layer ----------
base = Image.new('RGB', (W, H), NAVY)
g = np.linspace(0, 1, H)[:, None]
arr = (np.array(NAVY) * (1 - g[..., None]) + np.array((8, 26, 52)) * g[..., None]).repeat(W, 1)
base = Image.fromarray(arr.astype('uint8'))
glow = Image.new('L', (W, H), 0); ImageDraw.Draw(glow).ellipse((-200, 380, 1280, 1300), fill=90)
glow = glow.filter(ImageFilter.GaussianBlur(160))
base = Image.composite(Image.new('RGB', (W, H), (60, 90, 140)), base, glow)
d = ImageDraw.Draw(base)
rng = np.random.default_rng(3)
for _ in range(70):
    x, y, r = rng.integers(0, W), rng.integers(0, H), rng.integers(1, 4)
    d.ellipse((x - r, y - r, x + r, y + r), fill=(255, 225, 140))

def ctext(d, y, s, font, fill, maxw=980, lh=1.18):
    words, lines, cur = s.split(), [], ''
    for w_ in words:
        t = (cur + ' ' + w_).strip()
        if d.textlength(t, font=font) <= maxw: cur = t
        else: lines.append(cur); cur = w_
    lines.append(cur)
    for ln in lines:
        d.text((W / 2, y), ln, font=font, fill=fill, anchor='ma')
        y += int(font.size * lh)
    return y

# persistent donate banner (always on screen) at y 300-500 (below the top 280px)
d.rounded_rectangle((60, 300, 1020, 500), 34, fill=(9, 28, 56), outline=YEL, width=5)
d.text((W / 2, 330), 'Give a Thanksgiving gift today', font=f(FX, 56), fill=WHITE, anchor='ma')
d.text((W / 2, 410), 'saveonepersonnow.org/donate', font=f(FB, 58), fill=YEL, anchor='ma')
# footage frame
d.rounded_rectangle((FX0 - 8, FY0 - 8, FX0 + FW + 8, FY0 + FH + 8), 30, fill=WHITE)
# bottom web address
d.text((W / 2, 1585), 'Saveonepersonnow.org', font=f(FX, 54), fill=WHITE, anchor='ma')
d.line((380, 1660, 700, 1660), fill=YEL, width=5)
mask = Image.new('L', (FW, FH), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, FW - 1, FH - 1), 24, fill=255)

# ---------- scene text layers ----------
def layer(fn):
    im = Image.new('RGBA', (W, 460), (0, 0, 0, 0)); fn(ImageDraw.Draw(im)); return im

def s1(d):
    d.text((W / 2, 0), 'ONE TV STORY.', font=f(FB, 68), fill=YEL, anchor='ma')
    d.text((W / 2, 82), '8 LIVES SAVED.', font=f(FB, 112), fill=WHITE, anchor='ma')
    ctext(d, 230, 'Bonnie saw a Save One Alert on PIX11 and joined a kidney swap.', f(FS, 42), (215, 225, 240), 900)

def s2(d):
    d.text((W / 2, 0), 'THAT\'S WHAT WE DO.', font=f(FB, 64), fill=YEL, anchor='ma')
    y = ctext(d, 92, 'We share patients\' stories on TV, radio and social media', f(FX, 58), WHITE, 960)
    ctext(d, y + 14, 'so strangers can become living donors.', f(FS, 42), (215, 225, 240), 940)

def s3(d):
    d.text((W / 2, 0), 'YOUR GIFT MAKES THE', font=f(FB, 56), fill=YEL, anchor='ma')
    d.text((W / 2, 64), 'NEXT STORY HAPPEN', font=f(FB, 56), fill=YEL, anchor='ma')
    rows = [('$25', 'shares one story on social media'), ('$100', 'helps fund a radio segment'), ('$500', 'supports a TV pitch')]
    y = 140
    for a, b in rows:
        d.rounded_rectangle((70, y, 1010, y + 72), 20, fill=(255, 255, 255, 30))
        d.text((100, y + 36), a, font=f(FB, 50), fill=YEL, anchor='lm')
        d.text((270, y + 36), b, font=f(FS, 40), fill=WHITE, anchor='lm')
        y += 84

def s4(d):
    d.text((W / 2, 0), 'GIVE IN SOMEONE\'S HONOR', font=f(FB, 60), fill=YEL, anchor='ma')
    d.text((W / 2, 72), 'THIS THANKSGIVING', font=f(FB, 60), fill=YEL, anchor='ma')
    d.text((W / 2, 160), 'Tax-deductible  ·  501(c)(3) nonprofit', font=f(FS, 42), fill=WHITE, anchor='ma')
    d.rounded_rectangle((120, 240, 960, 350), 55, fill=YEL)
    d.text((W / 2, 295), 'DONATE TODAY', font=f(FB, 64), fill=NAVY, anchor='mm')

scenes = [(0, 6, layer(s1)), (6, 11.3, layer(s2)), (11.3, 18.5, layer(s3)), (18.5, 24, layer(s4))]
TY = 1150

# ---------- render ----------
rd = subprocess.Popen(['ffmpeg', '-v', 'error', '-i', 'foot.mp4', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
wr = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                       '-i', 'music.wav', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium',
                       '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', 'out.mp4'], stdin=subprocess.PIPE)
n = int(DUR * FPS)
for i in range(n):
    t = i / FPS
    buf = rd.stdout.read(FW * FH * 3)
    if len(buf) < FW * FH * 3: buf = last
    last = buf
    fr = base.copy()
    fr.paste(Image.frombytes('RGB', (FW, FH), buf), (FX0, FY0), mask)
    for a, b, L in scenes:
        if a <= t < b:
            k = min(1, (t - a) / 0.45)
            e = 1 - (1 - k) ** 3
            Lc = L.copy()
            if k < 1:
                al = Lc.getchannel('A').point(lambda v: int(v * e)); Lc.putalpha(al)
            fr.paste(Lc, (0, TY + int(30 * (1 - e))), Lc)
    # fade in / out
    if t < 0.3 or t > DUR - 0.4:
        pass
    wr.stdin.write(fr.tobytes())
wr.stdin.close(); wr.wait()
