import subprocess, sys, json
from PIL import Image, ImageDraw, ImageFont
BL="/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO="/usr/share/fonts/opentype/inter/Inter-Bold.otf"
W,H=1080,1920; NAVY=(15,42,74,255); YEL=(255,200,0,255); SAFE=W-160
cfg=json.load(open(sys.argv[1]))
def fit(d,t,f,s,mw):
    while d.textlength(t,font=ImageFont.truetype(f,s))>mw: s-=2
    return ImageFont.truetype(f,s)
PT,PH=600,680   # photo box top/height
# base (static) overlay: navy everywhere except photo box, pill, yellow band
def base():
    im=Image.new('RGBA',(W,H),NAVY); d=ImageDraw.Draw(im)
    d.rectangle((0,PT,W,PT+PH),fill=(0,0,0,0))
    lab=cfg['pill']; f=fit(d,lab,BL,46,W-200); lw=d.textlength(lab,font=f); bx=(W-lw)/2
    d.rounded_rectangle((bx-22,278,bx+lw+22,278+f.size+26),radius=14,fill=(220,38,38,255)); d.text((bx,288),lab,font=f,fill=(255,255,255,255))
    vb=PT+PH; d.rectangle((0,vb,W,vb+330),fill=YEL)
    for t,yy,s,c in ((cfg['band1'],vb+28,74,(15,42,74,255)),(cfg['band2'],vb+113,74,(15,42,74,255)),("SAVEONEPERSONNOW.ORG",vb+220,66,(15,15,15,255))):
        f=fit(d,t,BL,s,SAFE); d.text(((W-d.textlength(t,font=f))/2,yy),t,font=f,fill=c)
    im.save('base.png')
def cap(i,l1,l2):
    im=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(im)
    y=380
    f=fit(d,l1,BL,84,SAFE); d.text(((W-d.textlength(l1,font=f))/2,y),l1,font=f,fill=YEL); y+=f.size+20
    f=fit(d,l2,BL,62,SAFE); d.text(((W-d.textlength(l2,font=f))/2,y),l2,font=f,fill=(255,255,255,255))
    im.save(f'cap{i}.png')
base()
caps=cfg['caps']; seg=cfg.get('seg',5.0); dur=seg*len(caps)
for i,(a,b) in enumerate(caps): cap(i,a,b)
# photo: crop region, Ken Burns zoom, fit to W x PH
cx0,cy0,cx1,cy1=cfg['crop']
ph=Image.open(cfg['photo']).convert('RGB').crop((cx0,cy0,cx1,cy1))
# scale to cover W x PH at 1.12x for zoom room
s=max(W/ph.width,PH/ph.height)*1.12; ph=ph.resize((int(ph.width*s),int(ph.height*s)),Image.LANCZOS); ph.save('photo.png')
fps=30; N=int(dur*fps)
inputs=['-loop','1','-t',str(dur),'-i','photo.png','-loop','1','-t',str(dur),'-i','base.png']
for i in range(len(caps)): inputs+=['-loop','1','-t',str(dur),'-i',f'cap{i}.png']
pw,phh=ph.width,ph.height
fc=f"color=c=0x0f2a4a:s={W}x{H}:d={dur}:r={fps}[bg];[0:v]scale={pw}:{phh},zoompan=z='1+0.10*on/{N}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={N}:s={W}x{PH}:fps={fps}[p];[bg][p]overlay=0:{PT}[a];[a][1:v]overlay=0:0[b0]"
last='b0'
for i in range(len(caps)):
    st=i*seg; en=st+seg
    fc+=f";[{i+2}:v]format=rgba,fade=t=in:st={st}:d=0.4:alpha=1,fade=t=out:st={en-0.4}:d=0.4:alpha=1[c{i}];[{last}][c{i}]overlay=0:0[b{i+1}]"
    last=f'b{i+1}'
fc+=f";[{last}]fade=t=in:st=0:d=0.5,fade=t=out:st={dur-0.7}:d=0.7[v]"
# soft music pad
aud=f"aevalsrc='0.06*sin(2*PI*220*t)*(0.6+0.4*sin(2*PI*0.25*t))+0.05*sin(2*PI*277.18*t)*(0.6+0.4*sin(2*PI*0.2*t+1))+0.045*sin(2*PI*329.63*t)*(0.6+0.4*sin(2*PI*0.17*t+2))+0.03*sin(2*PI*110*t)':s=44100:d={dur}"
cmd=['ffmpeg','-v','error','-y']+inputs+['-f','lavfi','-i',aud,'-filter_complex',fc+f";[{len(caps)+2}:a]afade=t=in:d=1,afade=t=out:st={dur-1.5}:d=1.5,aformat=channel_layouts=stereo[aa]",'-map','[v]','-map','[aa]','-c:v','libx264','-preset','veryfast','-crf','21','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-movflags','+faststart',cfg['out']]
subprocess.run(cmd,check=True); print('ok',dur)
