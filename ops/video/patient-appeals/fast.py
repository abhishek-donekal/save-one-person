import subprocess,json,sys
from PIL import Image
cfg=json.load(open(sys.argv[1])); W,H=1080,1920; PT,PH=600,680
ph=Image.open(cfg['photo']).convert('RGB').crop(tuple(cfg['crop']))
ph=ph.resize((int(ph.width*PH/ph.height),PH),Image.LANCZOS)
base=Image.open('base.png'); n=len(cfg['caps'])
for i in range(n):
    fr=Image.new('RGBA',(W,H)); fr.paste(Image.new('RGB',(W,PH),(15,42,74)),(0,PT)); fr.paste(ph,((W-ph.width)//2,PT)); fr.alpha_composite(base); fr.alpha_composite(Image.open(f'cap{i}.png'))
    fr.convert('RGB').save(f'fr{i}.png')
seg=cfg['seg']; dur=seg*n; X=0.5
inp=[]; 
for i in range(n): inp+=['-loop','1','-t',str(seg+X),'-framerate','30','-i',f'fr{i}.png']
fc=''; last='0:v'; off=0
for i in range(1,n):
    off+=seg; fc+=f"[{last}][{i}:v]xfade=transition=fade:duration={X}:offset={off-X*0+0-X if False else off}[x{i}];"; last=f'x{i}'
fc+=f"[{last}]fade=t=in:d=0.5,fade=t=out:st={dur-0.7}:d=0.7,format=yuv420p[v]"
aud=f"aevalsrc='0.06*sin(2*PI*220*t)*(0.6+0.4*sin(2*PI*0.25*t))+0.05*sin(2*PI*277.18*t)*(0.6+0.4*sin(2*PI*0.2*t+1))+0.045*sin(2*PI*329.63*t)*(0.6+0.4*sin(2*PI*0.17*t+2))+0.03*sin(2*PI*110*t)':s=44100:d={dur+X}"
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-f','lavfi','-i',aud,'-filter_complex',fc+f";[{n}:a]afade=t=in:d=1,afade=t=out:st={dur-1.5}:d=1.5,aformat=channel_layouts=stereo[a]",'-map','[v]','-map','[a]','-t',str(dur),'-c:v','libx264','-preset','veryfast','-crf','23','-c:a','aac','-b:a','128k','-movflags','+faststart',cfg['out']],check=True)
print('ok')
