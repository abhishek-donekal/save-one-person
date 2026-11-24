import numpy as np, subprocess, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter
W,H,FPS=1920,1080,30
R='/home/claude/save-one-person/public'
B='/usr/share/fonts/truetype/google-fonts/Poppins-Bold.ttf'; M='/usr/share/fonts/truetype/google-fonts/Poppins-Medium.ttf'; RG='/usr/share/fonts/truetype/google-fonts/Poppins-Regular.ttf'
F=lambda p,s: ImageFont.truetype(p,s)
bg1=Image.open('/tmp/cv/bg.jpg').convert('RGB')
bg2=bg1.transpose(Image.FLIP_LEFT_RIGHT)
book=Image.open(f'{R}/newsletter/book-how-to-create-a-miracle.jpg').convert('RGB')
logo=Image.open(f'{R}/images/save-one-person-heart-logo.png').convert('RGBA')
GOLD=(255,210,63); NAVY=(10,28,64)
def cover(img,t,dur,zoom=0.08):
    s=1+zoom*t/dur; iw,ih=img.size; sc=max(W/iw,H/ih)*s
    im=img.resize((int(iw*sc),int(ih*sc)),Image.LANCZOS); x=(im.width-W)//2; y=(im.height-H)//2
    return im.crop((x,y,x+W,y+H))
def dark(im,a=0.55):
    return Image.blend(im,Image.new('RGB',im.size,(5,12,30)),a)
def ctext(d,y,txt,font,fill,alpha=1):
    w=d.textlength(txt,font=font); d.text(((W-w)/2,y),txt,font=font,fill=fill+(int(255*alpha),))
def ease(x): x=max(0,min(1,x)); return x*x*(3-2*x)
scenes=[]
def s1(t,d):
    im=cover(bg1,t,d).convert('RGBA'); o=Image.new('RGBA',(W,H)); dr=ImageDraw.Draw(o)
    a=ease(t/1.2); ctext(dr,300,'HOW TO CREATE',F(B,120),(255,255,255),a); ctext(dr,440,'A MIRACLE',F(B,150),GOLD,a)
    b=ease((t-1.4)/1.0); ctext(dr,660,'12 ingredients to turn the impossible, possible',F(M,52),(255,255,255),b)
    return Image.alpha_composite(im,o)
def s2(t,d):
    im=cover(bg2,t,d).convert('RGBA'); o=Image.new('RGBA',(W,H)); dr=ImageDraw.Draw(o)
    a=ease(t/1.0); bk=book.resize((420,648)); 
    if a>0: 
        bb=bk.copy().convert('RGBA'); bb.putalpha(int(255*a)); o.paste(bb,(200,216),bb)
    x=720
    for i,(txt,f,c,y) in enumerate([('A 12-day video course with',F(M,50),(255,255,255),300),('Lauren Finkelstein',F(B,96),GOLD,370),('Founder of Save One Person',F(M,50),(255,255,255),500),('Author of How to Create a Miracle',F(RG,44),(220,228,243),580),('Former TV producer at MTV, Court TV & CNBC',F(RG,44),(220,228,243),640)]):
        aa=ease((t-0.4-i*0.35)/0.8); dr.text((x,y),txt,font=f,fill=c+(int(255*aa),))
    return Image.alpha_composite(im,o)
lines3=['One story on the news.','A stranger gives a kidney.','A life is saved.','That is a miracle.']
def s3(t,d):
    im=cover(bg1,t+3,d+3).convert('RGBA'); o=Image.new('RGBA',(W,H)); dr=ImageDraw.Draw(o)
    for i,l in enumerate(lines3):
        a=ease((t-i*1.3)/0.8); ctext(dr,270+i*140,l,F(B,84),GOLD if i==3 else (255,255,255),a)
    return Image.alpha_composite(im,o)
ING=['Pray','Do the Work','Have Fun','Find Your Mission','Own Your Voice','Be the Miracle','Learn from the Masters','Believe','Charity','One Step at a Time','Share What You Learn','Dream']
def s4(t,d):
    im=Image.new('RGBA',(W,H),NAVY+(255,)); dr=ImageDraw.Draw(im)
    for y in range(H): dr.line([(0,y),(W,y)],fill=(10,28+int(30*y/H),64+int(70*y/H),255))
    ctext(dr,70,'THE 12 MIRACLE INGREDIENTS',F(B,64),GOLD,ease(t/0.8))
    for i,n in enumerate(ING):
        a=ease((t-0.6-i*0.45)/0.5); col=i//6; row=i%6; x=230+col*780; y=210+row*130
        if a<=0: continue
        dr.ellipse([x,y,x+90,y+90],fill=GOLD+(int(255*a),)); num=str(i+1); f=F(B,46); w=dr.textlength(num,font=f)
        dr.text((x+45-w/2,y+14),num,font=f,fill=NAVY+(int(255*a),)); dr.text((x+120,y+12),n,font=F(B,54),fill=(255,255,255,int(255*a)))
    return im
def s5(t,d):
    im=cover(bg2,t,d).convert('RGBA'); o=Image.new('RGBA',(W,H)); dr=ImageDraw.Draw(o)
    for i,(l,f,c) in enumerate([('12 days. 12 short lessons.',F(B,80),(255,255,255)),('A true story, 3 questions and',F(M,56),(255,255,255)),('one Miracle Action every day.',F(M,56),(255,255,255)),('Plus the workbook and the Kindle book.',F(M,56),GOLD)]):
        a=ease((t-i*0.9)/0.8); ctext(dr,290+i*130,l,f,c,a)
    return Image.alpha_composite(im,o)
def s6(t,d):
    im=Image.new('RGBA',(W,H),(255,255,255,255)); dr=ImageDraw.Draw(im)
    a=ease(t/1.0); lg=logo.resize((900,450)); l2=lg.copy(); al=l2.split()[3].point(lambda p:int(p*a)); l2.putalpha(al); im.alpha_composite(l2,((W-900)//2,120))
    b=ease((t-1.0)/0.8); ctext(dr,640,'Start creating your miracle today',F(B,72),NAVY,b)
    c=ease((t-1.8)/0.8); ctext(dr,770,'saveonepersonnow.org',F(M,56),(200,16,46),c)
    return im
S=[(s1,6),(s2,7),(s3,7),(s4,9),(s5,6.5),(s6,6)]
p=subprocess.Popen(['ffmpeg','-y','-f','rawvideo','-pix_fmt','rgb24','-s',f'{W}x{H}','-r',str(FPS),'-i','-','-i','music.wav','-c:v','libx264','-preset','veryfast','-crf','20','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-shortest','intro-placeholder.mp4'],stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
prev=None
for k,(fn,d) in enumerate(S):
    n=int(d*FPS)
    for i in range(n):
        t=i/FPS; fr=fn(t,d).convert('RGB')
        if i<12 and prev is not None: fr=Image.blend(prev,fr,i/12)
        if k==len(S)-1 and i>n-20: fr=Image.blend(fr,Image.new('RGB',(W,H),(255,255,255)),(i-(n-20))/20*0)  
        p.stdin.write(fr.tobytes())
    prev=fr
p.stdin.close(); p.wait()
