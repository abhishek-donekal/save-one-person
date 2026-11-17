import numpy as np, wave
SR=44100; DUR=17.0; N=int(SR*DUR)
w=wave.open('base.wav'); n=w.getnframes(); base=np.frombuffer(w.readframes(n),dtype=np.int16).reshape(-1,2).astype(float)/32767; w.close()
out=np.zeros((N,2)); L=min(len(base),N); out[:L]+=base[:L]*0.5
def add(s,t0,g=1.0):
    i=int(t0*SR); s=s[:max(0,N-i)]*g; out[i:i+len(s)]+=s[:,None]
tt=np.arange(N)/SR
out*=(1-0.9*((tt>2.65)&(tt<3.4)))[:,None]
t=np.arange(int(.65*SR))/SR; add(np.sin(2*np.pi*1000*t)*0.6,2.7)  # BLEEP
t=np.arange(int(.5*SR))/SR; f=1200*np.exp(-t*5)+150; add(np.sin(2*np.pi*np.cumsum(f)/SR)*0.5*np.minimum(1,t/0.02),4.6,0.6)  # whoosh down
def gobble(t0):
    for k in range(6):
        t=np.arange(int(.09*SR))/SR; f=300+120*np.sin(2*np.pi*30*t); s=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*np.sin(np.pi*t/.09)
        add(s*0.25,t0+k*0.1)
gobble(5.3); gobble(9.4)
for f in (2637,3136): t=np.arange(int(.9*SR))/SR; add(np.sin(2*np.pi*f*t)*np.exp(-t*4),6.6,0.22)  # sparkle
def hit(t0):
    t=np.arange(int(.4*SR))/SR; f=50+120*np.exp(-t*25); add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*7),t0,1.2)
for t0 in (2.2,6.6,9.2,11.6,13.0): hit(t0)
fade=int(1.0*SR); out[-fade:]*=np.linspace(1,0,fade)[:,None]
out=np.tanh(out*1.2); out/=np.abs(out).max(); out*=0.9
w=wave.open('babies.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok')
