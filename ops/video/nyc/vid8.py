import math, subprocess, random, sys
from PIL import Image, ImageDraw, ImageFont
W,H,FPS=1080,1920,30; DUR=17.0
BL="/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO="/usr/share/fonts/opentype/inter/Inter-Bold.otf"
EMO="/usr/share/fonts/truetype/noto/NotoColorEmoji.ttf"
fonts={}
def F(s,p=BL):
    s=max(4,int(s)); k=(s,p)
    if k not in fonts: fonts[k]=ImageFont.truetype(p,s)
    return fonts[k]
ef=ImageFont.truetype(EMO,109); ec={}
def pemoji(im,ch,cx,cy,size,rot=0):
    if size<8: return
    k=(ch,int(size))
    if k not in ec:
        e=Image.new('RGBA',(160,160),(0,0,0,0)); ImageDraw.Draw(e).text((10,10),ch,font=ef,embedded_color=True); e=e.crop(e.getbbox())
        ec[k]=e.resize((int(size),max(1,int(size*e.height/e.width))),Image.LANCZOS)
    e=ec[k]
    if rot: e=e.rotate(rot,resample=Image.BICUBIC,expand=True)
    im.paste(e,(int(cx-e.width/2),int(cy-e.height/2)),e)
BLK=(14,14,14); TAXI=(255,200,0); WHITE=(255,255,255); RED=(230,30,40); GRAY=(60,60,64); GRN=(0,150,70)
CH=1340
def checker(im,y,h=60):
    d=ImageDraw.Draw(im); s=h//2
    for x in range(0,W,s):
        for r in range(2): d.rectangle((x,y+r*s,x+s,y+r*s+s),fill=BLK if (x//s+r)%2==0 else WHITE)
def bg(col,check=True):
    im=Image.new('RGB',(W,CH),col)
    if col==BLK:   # skyline silhouette
        d=ImageDraw.Draw(im); rnd=random.Random(5); x=0
        while x<W:
            w=rnd.randint(60,140); h=rnd.randint(150,420); d.rectangle((x,CH-h,x+w,CH),fill=(32,32,38))
            for wy in range(CH-h+20,CH-10,34):
                for wx in range(x+12,x+w-12,26):
                    if rnd.random()<0.35: d.rectangle((wx,wy,wx+10,wy+16),fill=(90,80,40))
            x+=w+4
    if check: checker(im,0); checker(im,CH-60)
    return im
def ease(x,s=2.4):
    x=max(0,min(1,x)); x-=1; return x*x*((s+1)*x+s)+1
def txt(im,s,cy,size,fill=WHITE,rot=0,p=1.0,cx=W/2,maxw=W-80,stroke=BLK,font=BL):
    if p<0.1: return
    d0=ImageDraw.Draw(im); z=size
    while d0.textlength(s,font=F(z,font))>maxw and z>20: z-=4
    z*=p; f=F(z,font); sw=max(2,int(z*0.07)) if stroke else 0
    tw=int(d0.textlength(s,font=f))+sw*2+30; th=int(z*1.3)+sw*2
    l=Image.new('RGBA',(tw+20,th+20),(0,0,0,0)); d=ImageDraw.Draw(l)
    d.text((10+sw,10+sw),s,font=f,fill=fill,stroke_width=sw,stroke_fill=stroke or fill)
    if rot: l=l.rotate(rot,resample=Image.BICUBIC,expand=True)
    im.paste(l,(int(cx-l.width/2),int(cy-l.height/2)),l)
def sign(im,s,cy,size,p=1.0,col=BLK,fg=WHITE,rot=0):   # subway-sign style bar
    if p<0.1: return
    d0=ImageDraw.Draw(im)
    while d0.textlength(s,font=F(size,BO))>W-140 and size>30: size-=4
    f=F(size*p,BO); tw=d0.textlength(s,font=f); w=int(tw+80); h=int(size*p*1.6)
    l=Image.new('RGBA',(w,h+14),(0,0,0,0)); d=ImageDraw.Draw(l); d.rectangle((0,0,w,10),fill=WHITE); d.rectangle((0,10,w,h+14),fill=col); d.text((40,10+int(size*p*0.22)),s,font=f,fill=fg)
    if rot: l=l.rotate(rot,resample=Image.BICUBIC,expand=True)
    im.paste(l,(int(W/2-l.width/2),int(cy-l.height/2)),l)
shop='/home/claude/save-one-person/public/images/shop/'
def load(fn,crop=150,size=880):
    im=Image.open(shop+fn).convert('RGB'); w,h=im.size
    return im.crop((crop,crop,w-crop,h-crop)).resize((size,size),Image.LANCZOS)
front=load('go-bless-yourself-front.jpg'); back=load('go-bless-yourself-back.jpg')
PRODS=[(load(f,120,470),n) for f,n in [('hoodie-front.jpg','HOODIES'),('hat.jpg','HATS'),('mug.jpg','MUGS'),('tote.jpg','TOTES')]]
def tee(im,src,cx,cy,s,rot=0):
    w=int(src.width*s); r=src.resize((w,w),Image.BILINEAR).convert('RGBA')
    fr=Image.new('RGBA',(w+28,w+28),TAXI+(255,)); fr.paste(r,(14,14))
    if rot: fr=fr.rotate(rot,resample=Image.BICUBIC,expand=True)
    im.paste(fr,(int(cx-fr.width/2),int(cy-fr.height/2)),fr)
def gby(im,lt,cy,extra=None,col=TAXI):
    p=ease(lt/0.15,3)
    txt(im,'GO BLESS',cy,190,col,-4,p); txt(im,'YOURSELF!',cy+190,190,WHITE,3,ease((lt-0.08)/0.15,3))
    if extra: txt(im,extra,cy+350,80,col,-2,ease((lt-0.4)/0.2))
def bubble(im,cx,cy,w,h,tail_x):
    d=ImageDraw.Draw(im); d.rounded_rectangle((cx-w/2,cy-h/2,cx+w/2,cy+h/2),radius=40,fill=WHITE,outline=BLK,width=8)
    d.polygon([(tail_x-30,cy+h/2-4),(tail_x+30,cy+h/2-4),(tail_x,cy+h/2+70)],fill=WHITE)
def babies(im,t,ang=None):
    bob=math.sin(t*6)*8
    pemoji(im,'👶',300,1000+bob,260); pemoji(im,'👶',780,1000-bob,260)
    pemoji(im,'🍼',150,1130,110,-20); pemoji(im,'🚕',930,1180,150)
    if ang: pemoji(im,ang,300,830+bob,110)
def scene(t):
    if t<2.2:
        im=bg(BLK)
        txt(im,'NEW YORK CITY.',220,120,TAXI,-3,ease(t/0.2))
        txt(im,'TWO BABIES',400,140,WHITE,2,ease((t-0.4)/0.2)); txt(im,'ON THE STREET...',560,110,WHITE,-2,ease((t-0.6)/0.2))
        babies(im,t); return im
    if t<4.6:
        lt=t-2.2; im=bg(BLK); babies(im,t,'😤')
        sh=math.sin(t*70)*8 if 0.5<lt<1.5 else 0
        bubble(im,420,420,760,520,320)
        if lt>0.3:
            txt(im,'GO',260+sh,140,BLK,0,ease((lt-0.3)/0.12,3),cx=420,stroke=None)
            p=ease((lt-0.4)/0.12,3)
            if p>0.1:
                d=ImageDraw.Draw(im); w=int(520*p); h=int(150*p); d.rectangle((420-w/2,420-h/2+sh,420+w/2,420+h/2+sh),fill=BLK,outline=RED,width=8)
                txt(im,'#@%!',420+sh,110*p,RED,-4,1,cx=420,stroke=None)
            txt(im,'YOURSELF!',590+sh,120,BLK,0,ease((lt-0.5)/0.12,3),cx=420,stroke=None)
        pemoji(im,'😱',780,820,120*ease((lt-1.0)/0.2))
        return im
    if t<6.6:
        lt=t-4.6; im=bg(BLK); babies(im,t)
        y=-200+ease(lt/0.5,1.2)*720
        pemoji(im,'🦃',W/2,y,360*(1+0.05*math.sin(lt*20)))
        if lt>0.55: txt(im,'WAIT!!',180,150,TAXI,-4,ease((lt-0.55)/0.15,3))
        if lt>0.7:
            for i,(dx,dy) in enumerate([(-260,-120),(260,-100),(-300,140),(300,160)]): pemoji(im,'✨',W/2+dx,520+dy,90*ease((lt-0.7-i*0.05)/0.15))
        return im
    if t<9.2:
        lt=t-6.6; im=bg(BLK); pemoji(im,'🦃',150,170,170,-8)
        gby(im,lt,300)
        sc=0.1+0.38*ease((lt-0.15)/0.25,1.8)
        tee(im,front,W/2-225,920,sc,-3); tee(im,back,W/2+225,920,sc,3)
        txt(im,'FRONT',1170,50,TAXI,0,ease((lt-0.4)/0.2),cx=W/2-225,maxw=300); txt(im,'BACK',1170,50,TAXI,0,ease((lt-0.4)/0.2),cx=W/2+225,maxw=300)
        pemoji(im,'😇',300,1240,90*ease((lt-0.5)/0.2)); pemoji(im,'😇',780,1240,90*ease((lt-0.6)/0.2))
        return im
    if t<11.6:
        lt=t-9.2; im=bg(TAXI)
        txt(im,'TEE SHIRTS',170,150,BLK,-3,ease(lt/0.15),stroke=None)
        txt(im,'TO GOBBLE UP',340,140,RED,2,ease((lt-0.15)/0.15),stroke=None)
        txt(im,'FOR THE HOLIDAYS!',500,110,BLK,-2,ease((lt-0.3)/0.15),stroke=None)
        tee(im,front,W/2,930,0.2+0.42*ease((lt-0.4)/0.3,1.8),math.sin(lt*5)*4)
        pemoji(im,'🦃',140,960,170*ease((lt-0.6)/0.2),-10); pemoji(im,'🦃',940,960,170*ease((lt-0.7)/0.2),10)
        return im
    if t<13.0:
        lt=t-11.6; im=bg(BLK)
        txt(im,'ALSO IN:',120,100,TAXI,-2,ease(lt/0.15))
        for i,(img,n) in enumerate(PRODS):
            p=ease((lt-0.1-i*0.12)/0.2,1.6); cx=W/2+(-255 if i%2==0 else 255); cy=420+(i//2)*520
            if p>0.1:
                w=int(410*p); r=img.resize((w,w),Image.BILINEAR); fr=Image.new('RGB',(w+16,w+16),TAXI); fr.paste(r,(8,8)); im.paste(fr,(int(cx-fr.width/2),int(cy-fr.height/2)))
                txt(im,n,cy+245,64,TAXI,(-3,3,2,-2)[i],p,cx=cx,maxw=480)
        return im
    lt=t-13.0; im=bg(TAXI)
    txt(im,'THIS THANKSGIVING,',170,100,BLK,-2,ease(lt/0.15),stroke=None)
    txt(im,'GO BLESS YOURSELF',330,110,BLK,2,ease((lt-0.15)/0.15),stroke=None); txt(im,'...AND OTHERS.',470,110,RED,-2,ease((lt-0.3)/0.15),stroke=None)
    for i,s2 in enumerate(['Every tee helps Save One Person','save lives for people who need an organ','donor or a medical miracle.']):
        txt(im,s2,680+i*80,54,BLK,0,ease((lt-0.6-i*0.1)/0.2),stroke=None,font=BO)
    txt(im,'BUY YOURS NOW',1000,120,WHITE,-2,ease((lt-1.2)/0.15,3)); pemoji(im,'👇',W/2,1170,130*ease((lt-1.4)/0.2),math.sin(lt*6)*10)
    return im
cuts=[2.2,4.6,6.6,9.2,11.6,13.0]
def frame(t):
    sc=scene(t); im=Image.new('RGB',(W,H),BLK); im.paste(sc,(0,0))
    for c in cuts:
        if 0<=t-c<0.05: im=Image.blend(im,Image.new('RGB',(W,H),WHITE),0.85)
    d=ImageDraw.Draw(im); end=t>=13.0
    d.rectangle((0,CH,W,H),fill=TAXI if not end else WHITE); checker(im,CH,40)
    pul=1+(0.05*abs(math.sin(t*6)) if end else 0)
    f=F(70); s1='BUY IT AT:'; tw=d.textlength(s1,font=f); d.text((W/2-tw/2,CH+62),s1,font=f,fill=BLK)
    for s2,y,col,mx in [('SAVEONEPERSONNOW',CH+170,RED,230),('.ORG/SHOP',CH+345,BLK,230)]:
        sz=mx
        while d.textlength(s2,font=F(sz))>W-30: sz-=2
        sz*=pul; ff=F(sz); tw=d.textlength(s2,font=ff); d.text((W/2-tw/2,y),s2,font=ff,fill=col)
    return im
if len(sys.argv)>1:
    for t in map(float,sys.argv[1:]): frame(t).resize((360,640)).save(f's{t}.jpg')
    sys.exit()
p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-i','babies.wav','-map','0:v','-map','1:a','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart','go-bless-yourself-babies.mp4'],stdin=subprocess.PIPE)
for i in range(int(DUR*FPS)): p.stdin.write(frame(i/FPS).tobytes())
p.stdin.close(); p.wait(); print('done')
