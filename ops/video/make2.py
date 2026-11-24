import sys,subprocess
sys.path.insert(0,'/tmp/clean'); from detect import detect
src,out=sys.argv[1],sys.argv[2]
x,y,w,h,W,H=detect(src); w-=w%2; h-=h%2
ov="[v][1:v]overlay=0:70[v2];[v2][2:v]overlay=0:1090"
if w/h>0.8:
    fc=f"[0:v]crop={w}:{h}:{x}:{y},split[a][b];[a]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,boxblur=20:2[bg];[b]scale=720:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2[v];{ov}"
else:
    fc=f"[0:v]crop={w}:{h}:{x}:{y},scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280[v];{ov}"
subprocess.run(['ffmpeg','-loglevel','error','-y','-i',src,'-i','/tmp/clean/title.png','-i','/tmp/clean/bottom.png','-filter_complex',fc,'-map','0:a?','-c:a','copy','-c:v','libx264','-preset','veryfast','-crf','20',out],check=True)
