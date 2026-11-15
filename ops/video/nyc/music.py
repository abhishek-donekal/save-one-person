import numpy as np, wave
SR=44100; BPM=112; B=60/BPM; DUR=19.5; N=int(SR*DUR)
out=np.zeros((N,2))
def add(sig,t,pan=0.0,g=1.0):
    i=int(t*SR); s=sig[:max(0,N-i)]*g
    out[i:i+len(s),0]+=s*(1-max(0,pan)); out[i:i+len(s),1]+=s*(1+min(0,pan))
def kick():
    t=np.arange(int(.35*SR))/SR; f=50+110*np.exp(-t*30); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*9)
def snare():
    t=np.arange(int(.25*SR))/SR; n=np.random.randn(len(t)); n=n-np.convolve(n,np.ones(8)/8,'same')
    return (n*0.6+np.sin(2*np.pi*190*t)*0.5)*np.exp(-t*18)
def hat(open_=False):
    t=np.arange(int((.18 if open_ else .05)*SR))/SR; n=np.random.randn(len(t)); n=n-np.convolve(n,np.ones(4)/4,'same')
    return n*np.exp(-t*(15 if open_ else 70))*0.35
def clap():
    t=np.arange(int(.2*SR))/SR; n=np.random.randn(len(t)); env=np.exp(-t*25)*(1+0.6*np.sin(2*np.pi*90*t))
    return n*env*0.5
def tone(f,d,kind='saw',a=0.005,r=12):
    t=np.arange(int(d*SR))/SR
    if kind=='saw':
        s=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,9))
        s+=sum(np.sin(2*np.pi*f*1.006*k*t)/k for k in range(1,9))
    elif kind=='sq': s=sum(np.sin(2*np.pi*f*k*t)/k for k in range(1,12,2))
    else: s=np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t)
    env=np.minimum(1,t/a)*np.exp(-t*r/ max(d,0.1))
    return s*env
nf=lambda m: 440*2**((m-69)/12)
prog=[(48,[60,64,67]),(45,[57,60,64,69]),(41,[57,60,65]),(43,[59,62,67])]  # C Am F G
melody=[76,79,81,79,76,74,72,74, 76,79,84,83,81,79,76,79]
bars=int(DUR/(4*B))+1
for bar in range(bars):
    root,ch=prog[bar%4]; t0=bar*4*B
    intro = bar==0
    for b in range(4):
        tb=t0+b*B
        if not intro or b>=2: add(kick(),tb,g=0.9)
        if b in (1,3): add(snare(),tb,g=0.5); add(clap(),tb,g=0.35)
        for e in range(2):
            add(hat(e==1 and b==3),tb+e*B/2,pan=0.3,g=0.8)
        # bass on 8ths
        for e in range(2):
            add(tone(nf(root-12+ (12 if e==1 else 0)),B/2*0.9,'sq',r=6),tb+e*B/2,g=0.22)
        # chord stabs on offbeats
        for m in ch: add(tone(nf(m),B*0.35,'saw',r=10),tb+B/2,pan=-0.2,g=0.06)
    if bar>=1:
        for k in range(8):
            m=melody[(bar*8+k)%16]; add(tone(nf(m),B/2*0.8,'sin',r=5),t0+k*B/2,pan=0.15,g=0.18)
# riser into drop at bar 1 and sparkle hits
t=np.arange(int(4*B*SR))/SR; noise=np.random.randn(len(t))*np.linspace(0,0.25,len(t))
#
fade=int(1.2*SR); out[-fade:]*=np.linspace(1,0,fade)[:,None]
out=np.tanh(out*1.1); out/=np.abs(out).max(); out*=0.9
w=wave.open('base.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print(B)
# comedy SFX: drop music during "AH... AH..." build, then sneeze burst, boing, record scratch
def env(a,b,x): return np.clip((x-a)/(b-a),0,1)
tt=np.arange(N)/SR
duck=1-0.85*((tt>2.2)&(tt<3.05))
out*=duck[:,None]
def sfx_ah(t0,f):
    t=np.arange(int(.35*SR))/SR; s=(np.random.randn(len(t))*0.3+np.sin(2*np.pi*f*t)*0.2)*np.sin(np.pi*t/.35); add(s,t0,g=0.6)
sfx_ah(2.25,300); sfx_ah(2.65,380)
t=np.arange(int(.6*SR))/SR; n=np.random.randn(len(t)); burst=n*np.exp(-t*7)*(np.minimum(1,t/0.01)); add(burst,3.05,g=1.0); add(kick(),3.05,g=1.2)
for i,t0 in enumerate([4.4,5.1,5.8,6.5,7.2]):
    t=np.arange(int(.12*SR))/SR; add(np.sin(2*np.pi*(880+i*110)*t)*np.exp(-t*30),t0,g=0.25)  # chat pop
t=np.arange(int(.5*SR))/SR; f=180+400*np.exp(-t*6)*np.sin(2*np.pi*6*t)**2; add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*4),6.5,g=0.35)  # boing for dog
t=np.arange(int(.4*SR))/SR; f=900*np.exp(-t*8)+100; add((np.random.randn(len(t))*0.4+np.sin(2*np.pi*np.cumsum(f)/SR))*np.exp(-t*5),7.85,g=0.6)  # scratch
add(kick(),8.0,g=1.3)
out=np.tanh(out*1.1); out/=np.abs(out).max(); out*=0.9
w=wave.open('funny.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('sfx ok')
