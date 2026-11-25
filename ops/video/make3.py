# Shorts layout v3 (Lauren, Nov 24 10:19 PM): "HEALTH HACK" title in its own band at the top (never over a face),
# the video in the middle, and a larger "From the Save One Person Archive" line in its own band at the very bottom
# (never overlapping captions). Usage: python3 make3.py src.mp4 out.mp4 [start_seconds] [end_seconds]
import sys, subprocess
sys.path.insert(0, '/tmp/clean'); from detect import detect
src, out = sys.argv[1], sys.argv[2]
ss = sys.argv[3] if len(sys.argv) > 3 else '0'
to = sys.argv[4] if len(sys.argv) > 4 else None
x, y, w, h, W, H = detect(src); w -= w % 2; h -= h % 2
TOP, BOT = 200, 110                      # bands
VH = 1280 - TOP - BOT                    # 970 px for the video
fc = (f"[0:v]crop={w}:{h}:{x}:{y},split[a][b];"
      f"[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=24:2,eq=brightness=-0.18[bg];"
      f"[b]scale=-2:{VH}:force_original_aspect_ratio=decrease,scale='min(iw,720)':-2[fg];"
      f"[bg][fg]overlay=(W-w)/2:{TOP}+({VH}-h)/2[v];"
      f"[v][1:v]overlay=0:0[v2];[v2][2:v]overlay=0:{1280-BOT}")
cmd = ['ffmpeg', '-loglevel', 'error', '-y', '-ss', ss]
if to: cmd += ['-to', to]
cmd += ['-i', src, '-i', '/tmp/clean/title3.png', '-i', '/tmp/clean/bottom3.png', '-filter_complex', fc,
        '-map', '0:a?', '-c:a', 'aac', '-b:a', '128k', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '22',
        '-movflags', '+faststart', out]
subprocess.run(cmd, check=True)
