import math, subprocess, random, sys
from PIL import Image, ImageDraw, ImageFont
W,H,FPS=1080,1920,30; DUR=22.0
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
SCN=[(5.6,'👵','YOUR AUNT ASKS WHY',"YOU'RE STILL SINGLE?",'...pass the stuffing.'),(8.0,'🎈','THE PARADE CROWD','BLOCKS YOUR STREET?',None),(10.2,'🥧','SOMEONE TOOK THE','LAST SLICE OF PIE?','...and the whipped cream.'),(12.2,'🚆','THE TRAIN HOME','IS PACKED SOLID?','...happy travels!')]
def scene(t):
    if t<2.3:
        im=bg(BLK)
        txt(im,'IN NEW YORK,',380,150,TAXI,-3,ease(t/0.2))
        txt(im,'WHEN SOMEONE',600,120,WHITE,2,ease((t-0.4)/0.2)); txt(im,'MAKES US MAD...',760,120,WHITE,-2,ease((t-0.6)/0.2))
        pemoji(im,'😤',W/2,1080,240*ease((t-1.0)/0.2))
        return im
    if t<4.2:
        lt=t-2.3; im=bg(BLK)
        txt(im,'WE SAY:',330,150,TAXI,-2,ease(lt/0.15))
        if lt>0.45:
            sh=math.sin(t*70)*8 if lt<1.3 else 0
            txt(im,'GO',620+sh,200,WHITE,0,ease((lt-0.45)/0.12,3))
            p=ease((lt-0.55)/0.12,3)
            if p>0.1:
                d=ImageDraw.Draw(im); w=int(700*p); h=int(230*p); d.rectangle((W/2-w/2,860-h/2+sh,W/2+w/2,860+h/2+sh),fill=BLK,outline=RED,width=10)
                txt(im,'#@%!',860+sh,150*p,RED,-4,1,stroke=None)
            txt(im,'YOURSELF',1100+sh,190,WHITE,0,ease((lt-0.65)/0.12,3))
            pemoji(im,'🤬',W-150,330,170*ease((lt-0.8)/0.15))
        return im
    if t<5.6:
        lt=t-4.2; im=bg(TAXI)
        txt(im,"BUT IT'S",380,140,BLK,-2,ease(lt/0.15),stroke=None); txt(im,'THANKSGIVING...',560,150,BLK,2,ease((lt-0.15)/0.15),stroke=None)
        txt(im,"SO NOW WE SAY:",820,120,WHITE,-2,ease((lt-0.5)/0.15)); pemoji(im,'😇',W/2,1130,260*ease((lt-0.7)/0.2))
        return im
    if t<14.0:
        k=max(i for i,s in enumerate(SCN) if t>=s[0]); st,e,a,b,extra=SCN[k]; lt=t-st
        im=bg([BLK,GRAY,BLK,GRAY][k])
        if lt<1.1:
            pemoji(im,e,W/2,380,280*ease(lt/0.2),math.sin(t*8)*8)
            sign(im,a,720,90,ease((lt-0.15)/0.2)); sign(im,b,880,90,ease((lt-0.3)/0.2),col=[RED,GRN,(0,90,200),(150,60,200)][k])
        else:
            l2=lt-1.1+ (0.0)
            pemoji(im,e,150,200,150,-10)
            gby(im,l2,330,extra)
            sc=0.1+0.38*ease((l2-0.15)/0.25,1.8)
            tee(im,front,W/2-225,980,sc,(1-min(1,l2/0.4))*-10+(-3)); tee(im,back,W/2+225,980,sc,(1-min(1,l2/0.4))*10+3)
            txt(im,'FRONT',1230,50,TAXI,0,ease((l2-0.4)/0.2),cx=W/2-225,maxw=300); txt(im,'BACK',1230,50,TAXI,0,ease((l2-0.4)/0.2),cx=W/2+225,maxw=300)
        return im
    if t<15.0:
        lt=t-14.0; im=bg(TAXI)
        txt(im,'NOW YOU CAN WEAR IT:',110,90,BLK,-2,ease(lt/0.15),stroke=None)
        tee(im,front,W/2,660,0.3+0.6*ease((lt-0.05)/0.3,1.8),(1-min(1,lt/0.5))*-12)
        txt(im,'GO BLESS YOURSELF',1210,110,BLK,2,ease((lt-0.3)/0.15),stroke=None)
        return im
    if t<15.9:
        lt=t-15.0; im=bg(TAXI)
        txt(im,'THE BACK:',110,90,BLK,2,1,stroke=None); tee(im,back,W/2+(1-ease(lt/0.25,1.3))*W,660,0.9)
        txt(im,'BLESS YOU TOO',1210,120,BLK,-2,ease((lt-0.2)/0.15),stroke=None)
        return im
    if t<17.3:
        lt=t-15.9; im=bg(BLK)
        txt(im,'ALSO IN:',120,100,TAXI,-2,ease(lt/0.15))
        for i,(img,n) in enumerate(PRODS):
            p=ease((lt-0.1-i*0.15)/0.2,1.6); cx=W/2+(-255 if i%2==0 else 255); cy=420+(i//2)*520
            if p>0.1:
                w=int(410*p); r=img.resize((w,w),Image.BILINEAR); fr=Image.new('RGB',(w+16,w+16),TAXI); fr.paste(r,(8,8)); im.paste(fr,(int(cx-fr.width/2),int(cy-fr.height/2)))
                txt(im,n,cy+245,64,TAXI,(-3,3,2,-2)[i],p,cx=cx,maxw=480)
        return im
    if t<19.6:
        lt=t-17.3; im=bg(BLK)
        txt(im,'THIS THANKSGIVING,',240,110,TAXI,-2,ease(lt/0.2))
        txt(im,'GO BLESS',450,180,WHITE,2,ease((lt-0.3)/0.15,3)); txt(im,'YOURSELF',630,180,WHITE,-2,ease((lt-0.4)/0.15,3))
        txt(im,'...AND OTHERS.',830,140,TAXI,2,ease((lt-0.9)/0.2))
        pemoji(im,'🦃',W/2-150,1080,180*ease((lt-1.3)/0.2)); pemoji(im,'🗽',W/2+150,1080,180*ease((lt-1.4)/0.2))
        return im
    lt=t-19.6; im=bg(TAXI)
    txt(im,'THE GIFT THAT',220,130,BLK,-3,ease(lt/0.15),stroke=None)
    txt(im,'KEEPS ON',400,180,BLK,2,ease((lt-0.15)/0.15),stroke=None); txt(im,'GIVING.',590,200,RED,-2,ease((lt-0.3)/0.15),stroke=None)
    for i,s2 in enumerate(['Every tee helps us save lives','for people who need an organ','donor or a medical miracle.']):
        txt(im,s2,800+i*85,56,BLK,0,ease((lt-0.8-i*0.1)/0.2),stroke=None,font=BO)
    txt(im,"We want all New Yorkers and the world",1095,52,WHITE,-1,ease((lt-1.5)/0.2))
    txt(im,"to say GO BLESS YOURSELF! ​",1170,60,WHITE,1,ease((lt-1.7)/0.2))
    pemoji(im,'🌎',W-90,1255,80*ease((lt-1.9)/0.2),math.sin(lt*4)*10)
    return im
cuts=[2.3,4.2,5.6,6.7,8.0,9.1,10.2,11.3,12.2,13.3,14.0,15.0,15.9,17.3,19.6]
def frame(t):
    sc=scene(t); im=Image.new('RGB',(W,H),BLK); im.paste(sc,(0,0))
    for c in cuts:
        if 0<=t-c<0.05: im=Image.blend(im,Image.new('RGB',(W,H),WHITE),0.85)
    d=ImageDraw.Draw(im); end=t>=19.6
    d.rectangle((0,CH,W,H),fill=TAXI if not end else WHITE); checker(im,CH,40)
    pul=1+(0.05*abs(math.sin(t*6)) if end else 0)
    f=F(70); s1='👇 BUY IT AT:'; s1='BUY IT AT:'; tw=d.textlength(s1,font=f); d.text((W/2-tw/2,CH+62),s1,font=f,fill=BLK)
    for s2,y,col,mx in [('SAVEONEPERSONNOW',CH+170,RED,230),('.ORG/SHOP',CH+345,BLK,230)]:
        sz=mx
        while d.textlength(s2,font=F(sz))>W-30: sz-=2
        sz*=pul; ff=F(sz); tw=d.textlength(s2,font=ff); d.text((W/2-tw/2,y),s2,font=ff,fill=col)
    return im
if len(sys.argv)>1:
    for t in map(float,sys.argv[1:]): frame(t).resize((360,640)).save(f's{t}.jpg')
    sys.exit()
p=subprocess.Popen(['ffmpeg','-v','error','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-i','thanks.wav','-map','0:v','-map','1:a','-c:v','libx264','-preset','veryfast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart','go-bless-yourself-thanksgiving.mp4'],stdin=subprocess.PIPE)
for i in range(int(DUR*FPS)): p.stdin.write(frame(i/FPS).tobytes())
p.stdin.close(); p.wait(); print('done')
