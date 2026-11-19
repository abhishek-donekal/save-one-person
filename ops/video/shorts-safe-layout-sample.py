import subprocess
from PIL import Image, ImageDraw, ImageFont
BL="/usr/share/fonts/opentype/inter/InterDisplay-Black.otf"; BO="/usr/share/fonts/opentype/inter/Inter-Bold.otf"
W,H=1080,1920; NAVY=(15,42,74,255); YEL=(255,200,0,255)
SAFE=W-220   # keep text clear of the app buttons on the right/left
def fit(d,t,font,s,maxw):
    while d.textlength(t,font=ImageFont.truetype(font,s))>maxw: s-=2
    return ImageFont.truetype(font,s)
def overlay(name,title,b1,b2,vid_top,vid_h):
    im=Image.new('RGBA',(W,H),(0,0,0,0)); d=ImageDraw.Draw(im)
    d.rectangle((0,0,W,vid_top),fill=NAVY)                       # top: nothing in the first ~280px
    y=300
    for i,l in enumerate(title):
        f=fit(d,l,BL,100,SAFE); w=d.textlength(l,font=f)
        d.text(((W-w)/2,y),l,font=f,fill=YEL if i==0 else (255,255,255,255)); y+=f.size+22
    lab="FROM THE SAVE ONE PERSON ARCHIVE"; f=fit(d,lab,BO,40,SAFE)
    d.text(((W-d.textlength(lab,font=f))/2,y+14),lab,font=f,fill=(200,210,225,255))
    vb=vid_top+vid_h
    d.rectangle((0,vb,W,vb+330),fill=YEL)
    t="SAVEONEPERSONNOW.ORG"; f=fit(d,t,BL,78,SAFE); d.text(((W-d.textlength(t,font=f))/2,vb+30),t,font=f,fill=(15,15,15,255))
    for t2,yy in ((b1,vb+140),(b2,vb+225)):
        f=fit(d,t2,BL,76,SAFE); d.text(((W-d.textlength(t2,font=f))/2,yy),t2,font=f,fill=(15,42,74,255))
    d.rectangle((0,vb+330,W,H),fill=NAVY)                         # bottom: left clear for captions/buttons
    im.save(name+'_ov.png')
SRC="/mnt/user-data/uploads/Downloads/Save1Person  30 min.mp4"
vid_top=600; crop=0.52
# source is 16:9; cropped to 52% height -> 1080 wide x ~292 tall; scale up a bit taller by cropping sides
vid_h=560
overlay('s01',["A STRANGER IN ENGLAND","SAVED A GIRL IN ISRAEL"],"HELP SOMEONE GET A","LIVING KIDNEY DONOR",vid_top,vid_h)
vf=(f"[0:v]crop=iw:ih*{crop}:0:0,scale=-2:{vid_h},crop=1080:{vid_h},setsar=1[v];color=c=0x0f2a4a:s=1080x1920:d=33[bg];[bg][v]overlay=0:{vid_top}[b];[b][1:v]overlay=0:0,fade=t=out:st=32.4:d=0.6[o]")
subprocess.run(['ffmpeg','-v','error','-y','-ss','258','-t','33','-i',SRC,'-loop','1','-t','33','-i','s01_ov.png','-filter_complex',vf,'-map','[o]','-map','0:a','-c:v','libx264','-preset','veryfast','-crf','21','-pix_fmt','yuv420p','-c:a','aac','-b:a','160k','-af','afade=t=out:st=32.2:d=0.8','-movflags','+faststart','s01.mp4'],check=True)
