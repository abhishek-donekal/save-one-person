import numpy as np, wave
SR=44100; DUR=18.6; N=int(SR*DUR)
w=wave.open('base.wav'); n=w.getnframes(); base=np.frombuffer(w.readframes(n),dtype=np.int16).reshape(-1,2).astype(float)/32767; w.close()
out=np.zeros((N,2)); L=min(len(base),N); out[:L]+=base[:L]*0.5
def add(s,t0,g=1.0):
    i=int(t0*SR); s=s[:max(0,N-i)]*g; out[i:i+len(s)]+=s[:,None]
tt=np.arange(N)/SR
for b0,bl in ((2.65,0.6),(4.5,0.45),(5.0,0.45)):
    out*=(1-0.9*((tt>b0-0.05)&(tt<b0+bl)))[:,None]
    t=np.arange(int(bl*SR))/SR; add(np.sin(2*np.pi*(1000 if b0<3 else 1300)*t)*0.6,b0)  # BLEEP
t=np.arange(int(.5*SR))/SR; f=1200*np.exp(-t*5)+150; add(np.sin(2*np.pi*np.cumsum(f)/SR)*0.5*np.minimum(1,t/0.02),6.2,0.6)  # whoosh down
def gobble(t0):
    for k in range(6):
        t=np.arange(int(.09*SR))/SR; f=300+120*np.sin(2*np.pi*30*t); s=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*np.sin(np.pi*t/.09)
        add(s*0.25,t0+k*0.1)
gobble(6.9); gobble(11.0)
for f in (2637,3136): t=np.arange(int(.9*SR))/SR; add(np.sin(2*np.pi*f*t)*np.exp(-t*4),8.2,0.22)  # sparkle
def hit(t0):
    t=np.arange(int(.4*SR))/SR; f=50+120*np.exp(-t*25); add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*7),t0,1.2)
for t0 in (2.0,8.2,10.8,13.2,14.6): hit(t0)
fade=int(1.0*SR); out[-fade:]*=np.linspace(1,0,fade)[:,None]
out=np.tanh(out*1.2); out/=np.abs(out).max(); out*=0.9
w=wave.open('babies2.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok')
