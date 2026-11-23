# Gavin Mains appeal graphic (1080x1350). Usage: python3 gavin-graphic.py [photo.jpg]
import sys
from PIL import Image,ImageDraw,ImageFont,ImageFilter
BL="/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO="/usr/share/fonts/opentype/inter/Inter-Bold.otf"; SB="/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
F=lambda s,f=BL: ImageFont.truetype(f,s)
W,H=1080,1350
im=Image.new('RGB',(W,H)); d=ImageDraw.Draw(im)
for y in range(H):
    t=y/H; d.line((0,y,W,y),fill=(int(14+20*t),int(30+20*t),int(74-6*t)))
im=im.convert('RGBA'); d=ImageDraw.Draw(im)
def ctr(t,y,f,c): d.text(((W-d.textlength(t,font=f))/2,y),t,font=f,fill=c)
def fit(t,f,s,mw):
    while d.textlength(t,font=F(s,f))>mw: s-=2
    return F(s,f)
d.rounded_rectangle((40,36,W-40,150),radius=30,fill=(214,40,57))
ctr("SAVE ONE ALERT",58,fit("SAVE ONE ALERT",BL,72,W-140),(255,255,255))
ctr("13-YEAR-OLD GAVIN",186,fit("13-YEAR-OLD GAVIN",BL,96,W-100),(255,206,64))
ctr("NEEDS A LIVING KIDNEY DONOR",296,fit("NEEDS A LIVING KIDNEY DONOR",BL,64,W-100),(255,255,255))
PW,PH=640,560; x0=(W-PW)//2; y0=400
halo=Image.new('RGBA',(W,H),(0,0,0,0)); ImageDraw.Draw(halo).rounded_rectangle((x0-30,y0-30,x0+PW+30,y0+PH+30),radius=60,fill=(255,245,215,170))
im.alpha_composite(halo.filter(ImageFilter.GaussianBlur(26))); d=ImageDraw.Draw(im)
d.rounded_rectangle((x0-10,y0-10,x0+PW+10,y0+PH+10),radius=44,fill=(255,255,255))
if len(sys.argv)>1:
    ph=Image.open(sys.argv[1]).convert('RGB'); r=max(PW/ph.width,PH/ph.height)
    ph=ph.resize((int(ph.width*r)+1,int(ph.height*r)+1),Image.LANCZOS)
    l=(ph.width-PW)//2; ph=ph.crop((l,0,l+PW,PH))
    mk=Image.new('L',(PW,PH),0); ImageDraw.Draw(mk).rounded_rectangle((0,0,PW,PH),radius=36,fill=255); im.paste(ph,(x0,y0),mk)
else:
    d.rounded_rectangle((x0,y0,x0+PW,y0+PH),radius=36,fill=(225,230,240))
    ctr("GAVIN'S PHOTO",y0+230,F(48,BO),(120,130,150)); ctr("goes here",y0+292,F(40,SB),(120,130,150))
d=ImageDraw.Draw(im); y=y0+PH+40
ctr("His doctor thinks he needs a transplant",y,F(40,SB),(225,232,248))
ctr("within six months.",y+50,F(40,SB),(225,232,248))
ctr("Donors: 18+, blood type B or O",y+122,fit("Donors: 18+, blood type B or O",BL,52,W-120),(255,206,64))
ctr("Saveonepersonnow.org",H-80,F(44,BO),(255,255,255))
out='/home/claude/save-one-person/public/social/2026-11-23/gavin-needs-a-kidney.jpg'
im.convert('RGB').save(out,quality=92); print(out, y+122+60)
