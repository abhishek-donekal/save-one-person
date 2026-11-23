from PIL import Image,ImageDraw,ImageFont,ImageFilter
BL="/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO="/usr/share/fonts/opentype/inter/Inter-Bold.otf"; SB="/usr/share/fonts/opentype/inter/Inter-SemiBold.otf"
F=lambda s,f=BL: ImageFont.truetype(f,s)
W,H=1080,1350
im=Image.new('RGB',(W,H)); d=ImageDraw.Draw(im)
for y in range(H):
    t=y/H; d.line((0,y,W,y),fill=(int(14+20*t),int(30+20*t),int(74-6*t)))
g=Image.new('RGBA',(W,H),(0,0,0,0)); gd=ImageDraw.Draw(g)
for i in range(20,0,-1):
    r=i*34; gd.ellipse((W//2-r,560-r,W//2+r,560+r),fill=(255,210,130,int(4+5*(1-i/20))))
im=im.convert('RGBA'); im.alpha_composite(g.filter(ImageFilter.GaussianBlur(40))); d=ImageDraw.Draw(im)
def ctr(t,y,f,c):
    d.text(((W-d.textlength(t,font=f))/2,y),t,font=f,fill=c)
def fit(t,f,s,mw):
    while d.textlength(t,font=F(s,f))>mw: s-=2
    return F(s,f)
# donate banner top (always on)
d.rounded_rectangle((40,36,W-40,186),radius=34,fill=(255,200,0))
ctr("GIVE TO SAVE ONE PERSON",54,fit("GIVE TO SAVE ONE PERSON",BL,58,W-140),(15,42,74))
ctr("saveonepersonnow.org/donate",122,fit("saveonepersonnow.org/donate",BO,46,W-140),(20,20,20))
# headline
ctr("GIVING TUESDAY",222,F(104),(255,206,64))
ctr("IS NEXT WEEK",336,F(88),(255,255,255))
ctr("TUESDAY, DECEMBER 1, 2026",446,F(40,BO),(220,228,245))
# photo
ph=Image.open('l7.png').convert('RGB').crop((150,428,640,732))
PW=760; PH=int(PW*ph.height/ph.width); ph=ph.resize((PW,PH),Image.LANCZOS)
x0=(W-PW)//2; y0=545
halo=Image.new('RGBA',(W,H),(0,0,0,0)); ImageDraw.Draw(halo).rounded_rectangle((x0-30,y0-30,x0+PW+30,y0+PH+30),radius=60,fill=(255,245,215,190))
im.alpha_composite(halo.filter(ImageFilter.GaussianBlur(26))); d=ImageDraw.Draw(im)
d.rounded_rectangle((x0-10,y0-10,x0+PW+10,y0+PH+10),radius=44,fill=(255,255,255))
mk=Image.new('L',(PW,PH),0); ImageDraw.Draw(mk).rounded_rectangle((0,0,PW,PH),radius=36,fill=255); im.paste(ph,(x0,y0),mk)
y=y0+PH+44
ctr("HELP US SAVE ONE MORE LIFE",y,fit("HELP US SAVE ONE MORE LIFE",BL,62,W-120),(255,255,255))
ctr("Your gift puts patients' stories in front",y+86,F(38,SB),(225,232,248))
ctr("of the people who could save their lives.",y+134,F(38,SB),(225,232,248))
ctr("Saveonepersonnow.org",H-70,F(42,BO),(255,206,64))
im.convert('RGB').save('/home/claude/save-one-person/public/social/2026-11-23/giving-tuesday-next-week.jpg',quality=92)
print(y+134)
