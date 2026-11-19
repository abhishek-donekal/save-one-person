import json,sys,math,random,subprocess
from PIL import Image,ImageDraw,ImageFont,ImageFilter
BL="/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO="/usr/share/fonts/opentype/inter/Inter-Bold.otf"
W,H=1080,1920; cfg=json.load(open(sys.argv[1]))
def F(f,s): return ImageFont.truetype(f,s)
def fit(d,t,f,s,mw):
    while d.textlength(t,font=F(f,s))>mw: s-=2
    return F(f,s)
random.seed(7)
# --- background: deep navy -> warm gold glow from top, heavenly rays, bokeh
bg=Image.new('RGB',(W,H)); px=bg.load()
for y in range(H):
    t=y/H
    r=int(18+ (40-18)*t); g=int(28+(30-28)*t); b=int(70+(55-70)*t)
    for x in range(W): px[x,y]=(r,g,b)
bg=bg.convert('RGBA')
glow=Image.new('RGBA',(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
for i in range(30,0,-1):
    rr=i*38; a=int(9*(1-i/30)*1.6)+2
    gd.ellipse((W/2-rr,170-rr*0.8,W/2+rr,170+rr*0.8),fill=(255,214,140,a))
bg.alpha_composite(glow.filter(ImageFilter.GaussianBlur(30)))
rays=Image.new('RGBA',(W,H),(0,0,0,0)); rd=ImageDraw.Draw(rays); cx,cy=W/2,-120
for k in range(13):
    a=math.radians(50+k*80/12); w=math.radians(2.2 if k%2 else 3.6)
    rd.polygon([(cx,cy),(cx+2600*math.cos(a-w),cy+2600*math.sin(a-w)),(cx+2600*math.cos(a+w),cy+2600*math.sin(a+w))],fill=(255,240,200,30 if k%2 else 44))
bg.alpha_composite(rays.filter(ImageFilter.GaussianBlur(10)))
bok=Image.new('RGBA',(W,H),(0,0,0,0)); bd=ImageDraw.Draw(bok)
for _ in range(45):
    x=random.randint(0,W); y=random.randint(0,H); r=random.randint(6,26); a=random.randint(18,60)
    bd.ellipse((x-r,y-r,x+r,y+r),fill=(255,230,170,a))
bg.alpha_composite(bok.filter(ImageFilter.GaussianBlur(4)))
d=ImageDraw.Draw(bg)
# --- title: glowing SAVE ONE PERSON ALERT with heart
t1="SAVE ONE PERSON"; t2="ALERT"
f1=fit(d,t1,BL,96,W-140); f2=F(BL,120)
tl=Image.new('RGBA',(W,H),(0,0,0,0)); td=ImageDraw.Draw(tl)
y1=268; td.text(((W-td.textlength(t1,font=f1))/2,y1),t1,font=f1,fill=(255,255,255,255))
y2=y1+f1.size+6; td.text(((W-td.textlength(t2,font=f2))/2,y2),t2,font=f2,fill=(255,206,64,255))
halo=tl.copy().filter(ImageFilter.GaussianBlur(18)); halo2=tl.copy().filter(ImageFilter.GaussianBlur(6))
for im_ in (halo,halo,halo2): bg.alpha_composite(im_)
bg.alpha_composite(tl)
# --- photo in glowing rounded frame
PT=530; PH=580; PW=520
ph=Image.open(cfg['photo']).convert('RGB').crop(tuple(cfg['crop']))
s=max(PW/ph.width,PH/ph.height); ph=ph.resize((int(ph.width*s)+1,int(ph.height*s)+1),Image.LANCZOS)
ph=ph.crop(((ph.width-PW)//2,0,(ph.width-PW)//2+PW,PH))
px0=(W-PW)//2
fg=Image.new('RGBA',(W,H),(0,0,0,0)); fd=ImageDraw.Draw(fg)
fd.rounded_rectangle((px0-26,PT-26,px0+PW+26,PT+PH+26),radius=60,fill=(255,236,190,200))
bg.alpha_composite(fg.filter(ImageFilter.GaussianBlur(24)))
d=ImageDraw.Draw(bg); d.rounded_rectangle((px0-10,PT-10,px0+PW+10,PT+PH+10),radius=46,fill=(255,255,255,255))
mask=Image.new('L',(PW,PH),0); ImageDraw.Draw(mask).rounded_rectangle((0,0,PW,PH),radius=38,fill=255)
bg.paste(ph,(px0,PT),mask)
# --- bottom band: rounded gold card
BT=PT+PH+230
d.rounded_rectangle((60,BT,W-60,BT+300),radius=40,fill=(255,200,0,255))
for t,yy,sz,c in ((cfg['band1'],BT+26,70,(15,42,74)),(cfg['band2'],BT+106,70,(15,42,74)),("SAVEONEPERSONNOW.ORG",BT+206,60,(20,20,20))):
    f=fit(d,t,BL,sz,W-200); d.text(((W-d.textlength(t,font=f))/2,yy),t,font=f,fill=c)
bg.save('v2_base.png')
# --- caption cards (between photo and band)
CT=PT+PH+40
for i,(a,b) in enumerate(cfg['caps']):
    fr=bg.copy(); dd=ImageDraw.Draw(fr)
    card=Image.new('RGBA',(W,H),(0,0,0,0)); cd=ImageDraw.Draw(card)
    cd.rounded_rectangle((70,CT,W-70,CT+180),radius=34,fill=(255,255,255,235)); fr.alpha_composite(card)
    dd=ImageDraw.Draw(fr)
    f=fit(dd,a,BL,64,W-200); dd.text(((W-dd.textlength(a,font=f))/2,CT+22),a,font=f,fill=(15,42,74))
    f=fit(dd,b,BO,46,W-200); dd.text(((W-dd.textlength(b,font=f))/2,CT+106),b,font=f,fill=(190,30,45))
    fr.convert('RGB').save(f'fr{i}.png')
n=len(cfg['caps']); seg=cfg['seg']; dur=seg*n; X=0.5
inp=[]
for i in range(n): inp+=['-loop','1','-t',str(seg+X),'-framerate','30','-i',f'fr{i}.png']
fc=''; last='0:v'; off=0
for i in range(1,n):
    off+=seg; fc+=f"[{last}][{i}:v]xfade=transition=fade:duration={X}:offset={off}[x{i}];"; last=f'x{i}'
fc+=f"[{last}]zoompan=z='1+0.0004*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s={W}x{H}:fps=30,fade=t=in:d=0.5,fade=t=out:st={dur-0.7}:d=0.7,format=yuv420p[v]" if cfg.get('zoom') else f"[{last}]fade=t=in:d=0.5,fade=t=out:st={dur-0.7}:d=0.7,format=yuv420p[v]"
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-f','lavfi','-i',f'anullsrc=r=44100:cl=stereo:d={dur+X}','-filter_complex',fc,'-map','[v]','-map',f'{n}:a','-t',str(dur),'-c:v','libx264','-preset','veryfast','-crf','22','-c:a','aac','-b:a','96k','-movflags','+faststart',cfg['out']],check=True)
print('ok')
