import json,sys,math,random,subprocess,os
from PIL import Image,ImageDraw,ImageFont,ImageFilter
BL="/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO="/usr/share/fonts/opentype/inter/Inter-Bold.otf"
W,H=1080,1920; cfg=json.load(open(sys.argv[1])); os.makedirs('L',exist_ok=True)
def F(s,f=BL): return ImageFont.truetype(f,s)
def fit(d,t,f,s,mw):
    while d.textlength(t,font=F(s,f))>mw: s-=2
    return F(s,f)
PT=540; PH=600; PW=520; px0=(W-PW)//2; CX,CY=W//2,PT+PH//2
# 1 background gradient
bg=Image.new('RGB',(W,H)); d=ImageDraw.Draw(bg)
for y in range(H):
    t=y/H; d.line((0,y,W,y),fill=(int(14+30*t),int(24+10*t),int(64-10*t)))
g=Image.new('RGBA',(W,H),(0,0,0,0)); gd=ImageDraw.Draw(g)
for i in range(24,0,-1):
    r=i*45; gd.ellipse((CX-r,CY-r,CX+r,CY+r),fill=(255,210,130,int(5+5*(1-i/24))))
bg=bg.convert('RGBA'); bg.alpha_composite(g.filter(ImageFilter.GaussianBlur(40))); bg.convert('RGB').save('L/bg.png')
# 2 rays (rotated by ffmpeg)
S=2400; r=Image.new('RGBA',(S,S),(0,0,0,0)); rd=ImageDraw.Draw(r); c=S/2
for k in range(18):
    a=k*2*math.pi/18; w=0.06 if k%2 else 0.1
    rd.polygon([(c,c),(c+1700*math.cos(a-w),c+1700*math.sin(a-w)),(c+1700*math.cos(a+w),c+1700*math.sin(a+w))],fill=(255,236,190,70 if k%2 else 95))
m=Image.new('L',(S,S),0); md=ImageDraw.Draw(m)
for i in range(60,0,-1): md.ellipse((c-i*20,c-i*20,c+i*20,c+i*20),fill=int(255*(1-i/60)**0.6))
r.putalpha(Image.composite(r.getchannel('A'),Image.new('L',(S,S),0),m).point(lambda v:v))
r=r.filter(ImageFilter.GaussianBlur(8)); r.save('L/rays.png')
# 3 halo pulse loop (2 s, 30 frames at 15fps) - glow ring around photo
os.makedirs('L/halo',exist_ok=True)
for i in range(30):
    p=0.5+0.5*math.sin(2*math.pi*i/30)
    h=Image.new('RGBA',(W,H),(0,0,0,0)); hd=ImageDraw.Draw(h); e=30+18*p
    hd.rounded_rectangle((px0-e,PT-e,px0+PW+e,PT+PH+e),radius=70,fill=(255,245,215,int(150+90*p)))
    h=h.filter(ImageFilter.GaussianBlur(28+10*p)); h.save(f'L/halo/h{i:02d}.png')
# 4 sparkles loop (4 s @15fps)
os.makedirs('L/sp',exist_ok=True); random.seed(3)
P=[(random.uniform(0,W),random.uniform(0,H),random.uniform(3,9),random.uniform(0,1),random.uniform(-25,-8)) for _ in range(70)]
for i in range(60):
    s=Image.new('RGBA',(W,H),(0,0,0,0)); sd=ImageDraw.Draw(s)
    for x,y,rr,ph,vy in P:
        yy=(y+vy*i/15*4)%H; tw=0.5+0.5*math.sin(2*math.pi*(i/60+ph)); a=int(60+170*tw)
        sd.ellipse((x-rr,yy-rr,x+rr,yy+rr),fill=(255,240,200,a))
        if tw>0.85: sd.line((x-rr*3,yy,x+rr*3,yy),fill=(255,255,255,a),width=2); sd.line((x,yy-rr*3,x,yy+rr*3),fill=(255,255,255,a),width=2)
    s.filter(ImageFilter.GaussianBlur(1.2)).save(f'L/sp/s{i:02d}.png')
# 5 static top: title glow, photo frame, band
top=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(top)
t1="SAVE ONE PERSON"; t2="ALERT"; f1=fit(d,t1,BL,98,W-120); f2=F(124)
tl=Image.new('RGBA',(W,H),(0,0,0,0)); td=ImageDraw.Draw(tl); y1=262
td.text(((W-td.textlength(t1,font=f1))/2,y1),t1,font=f1,fill=(255,255,255,255))
td.text(((W-td.textlength(t2,font=f2))/2,y1+f1.size+4),t2,font=f2,fill=(255,206,64,255))
for b in (20,8): top.alpha_composite(tl.filter(ImageFilter.GaussianBlur(b)))
top.alpha_composite(tl)
ph=Image.open(cfg['photo']).convert('RGB').crop(tuple(cfg['crop']))
s_=max(PW/ph.width,PH/ph.height); ph=ph.resize((int(ph.width*s_)+1,int(ph.height*s_)+1),Image.LANCZOS)
ph=ph.crop(((ph.width-PW)//2,0,(ph.width-PW)//2+PW,PH))
d=ImageDraw.Draw(top); d.rounded_rectangle((px0-10,PT-10,px0+PW+10,PT+PH+10),radius=46,fill=(255,255,255,255))
mk=Image.new('L',(PW,PH),0); ImageDraw.Draw(mk).rounded_rectangle((0,0,PW,PH),radius=38,fill=255); top.paste(ph,(px0,PT),mk)
BT=PT+PH+235; d.rounded_rectangle((60,BT,W-60,BT+300),radius=40,fill=(255,200,0,255))
for t,yy,sz,col in ((cfg['band1'],BT+26,70,(15,42,74)),(cfg['band2'],BT+106,70,(15,42,74)),("SAVEONEPERSONNOW.ORG",BT+206,60,(20,20,20))):
    f=fit(d,t,BL,sz,W-200); d.text(((W-d.textlength(t,font=f))/2,yy),t,font=f,fill=col)
top.save('L/top.png')
# 6 caption cards (small, overlaid with enable)
CT=PT+PH+40; CH=180
for i,(a,b) in enumerate(cfg['caps']):
    cc=Image.new('RGBA',(W-140,CH),(0,0,0,0)); cd=ImageDraw.Draw(cc)
    cd.rounded_rectangle((0,0,W-140,CH),radius=34,fill=(255,255,255,240))
    f=fit(cd,a,BL,64,W-200); cd.text(((W-140-cd.textlength(a,font=f))/2,22),a,font=f,fill=(15,42,74))
    f=fit(cd,b,BO,46,W-200); cd.text(((W-140-cd.textlength(b,font=f))/2,106),b,font=f,fill=(190,30,45))
    cc.save(f'L/c{i}.png')
n=len(cfg['caps']); seg=cfg['seg']; dur=seg*n
inp=['-loop','1','-framerate','30','-t',str(dur),'-i','L/bg.png',
     '-loop','1','-framerate','30','-t',str(dur),'-i','L/rays.png',
     '-stream_loop','-1','-framerate','15','-i','L/halo/h%02d.png',
     '-loop','1','-framerate','30','-t',str(dur),'-i','L/top.png',
     '-stream_loop','-1','-framerate','15','-i','L/sp/s%02d.png']
for i in range(n): inp+=['-loop','1','-framerate','30','-t',str(dur),'-i',f'L/c{i}.png']
fc=(f"[1:v]rotate=a='t*0.18':c=none:ow={S}:oh={S},format=rgba[rr];[0:v][rr]overlay=x={CX}-{S//2}:y={CY}-{S//2}:shortest=1[a];"
    f"[2:v]fps=30[hl];[a][hl]overlay=0:0:shortest=1[b];[b][3:v]overlay=0:0[c];")
last='c'
for i in range(n):
    st=i*seg; en=st+seg
    fc+=f"[{5+i}:v]format=rgba,fade=t=in:st={st}:d=0.35:alpha=1,fade=t=out:st={en-0.35}:d=0.35:alpha=1[k{i}];[{last}][k{i}]overlay=70:{CT}:enable='between(t,{st},{en})'[d{i}];"
    last=f'd{i}'
fc+=f"[4:v]fps=30[sp];[{last}][sp]overlay=0:0:shortest=1,trim=duration={dur},fade=t=in:d=0.5,fade=t=out:st={dur-0.7}:d=0.7,format=yuv420p[v]"
subprocess.run(['ffmpeg','-v','error','-y']+inp+['-f','lavfi','-i',f'anullsrc=r=44100:cl=stereo:d={dur}','-filter_complex',fc,'-map','[v]','-map',f'{5+n}:a','-t',str(dur),'-c:v','libx264','-preset','veryfast','-crf','22','-c:a','aac','-b:a','96k','-movflags','+faststart',cfg['out']],check=True)
print('ok',dur)
