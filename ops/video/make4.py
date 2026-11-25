# Shorts layout v3 + hook preview + uncut end card.
# Usage: python3 make4.py src.mp4 out.mp4 [hook_start hook_end]
#  - optional hook: a complete sentence from later in the video, shown first (no mid-sentence starts)
#  - then the whole talk from the beginning
#  - the final "Be someone's miracle / Donate" card is shown whole (not cropped)
import sys, subprocess, tempfile, os, io
import numpy as np
from PIL import Image
sys.path.insert(0, '/tmp/clean'); from detect import detect
src, out = sys.argv[1], sys.argv[2]
# or: python3 make4.py src out start S   -> start the video at S seconds (a strong sentence), play to the end card
start_at = float(sys.argv[4]) if len(sys.argv) > 4 and sys.argv[3] == 'start' else 0.0
hook = (float(sys.argv[3]), float(sys.argv[4])) if len(sys.argv) > 4 and sys.argv[3] != 'start' else None
TOP, BOT = 200, 110; VH = 1280 - TOP - BOT

def dur(f):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout)

def frame(t):
    b = subprocess.run(['ffmpeg', '-loglevel', 'error', '-ss', str(t), '-i', src, '-frames:v', '1', '-vf', 'scale=90:160', '-f', 'image2pipe', '-vcodec', 'png', '-'], capture_output=True).stdout
    return np.asarray(Image.open(io.BytesIO(b)).convert('RGB')).astype(int)

D = dur(src)
last = frame(D - 0.5); card = D; t = D - 0.5
while t > D - 12:
    if np.abs(frame(t) - last).mean() > 18: card = t + 0.25; break
    t -= 0.25

x, y, w, h, W, H = detect(src); w -= w % 2; h -= h % 2

def seg(a, b, crop, path):
    c = f"crop={w}:{h}:{x}:{y}," if crop else ""
    fc = (f"[0:v]{c}split[a][b];"
          f"[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=24:2,eq=brightness=-0.18[bg];"
          f"[b]scale=-2:{VH}:force_original_aspect_ratio=decrease,scale='min(iw,720)':-2[fg];"
          f"[bg][fg]overlay=(W-w)/2:{TOP}+({VH}-h)/2[v];[v][1:v]overlay=0:0[v2];[v2][2:v]overlay=0:{1280-BOT},fps=30,format=yuv420p[vo]")
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', str(a), '-to', str(b), '-i', src, '-i', '/tmp/clean/title3.png',
                    '-i', '/tmp/clean/bottom3.png', '-filter_complex', fc, '-map', '[vo]', '-map', '0:a?',
                    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22', '-c:a', 'aac', '-ar', '44100', '-ac', '2', '-b:a', '128k', path], check=True)

tmp = tempfile.mkdtemp(); parts = []
if hook: parts.append((hook[0], hook[1], True))
parts.append((start_at, card, True))
if D - card > 0.3: parts.append((card, D, False))
files = []
for i, (a, b, cr) in enumerate(parts):
    p = os.path.join(tmp, f'p{i}.mp4'); seg(a, b, cr, p); files.append(p)
lst = os.path.join(tmp, 'l.txt'); open(lst, 'w').write(''.join(f"file '{f}'\n" for f in files))
subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', '-movflags', '+faststart', out], check=True)
print(out, 'card at', round(card, 2), 'duration', round(dur(out), 1))
