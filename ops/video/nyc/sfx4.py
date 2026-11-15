import numpy as np, wave
SR=44100; DUR=22.0; N=int(SR*DUR)
w=wave.open('base.wav'); n=w.getnframes(); base=np.frombuffer(w.readframes(n),dtype=np.int16).reshape(-1,2).astype(float)/32767; w.close()
out=np.zeros((N,2)); L=min(len(base),N); out[:L]+=base[:L]*0.5
i=int(19.4*SR); seg=base[int(3*SR):]; L2=min(len(seg),N-i); out[i:i+L2]=seg[:L2]*0.5  # extend loop
def add(s,t0,g=1.0):
    i=int(t0*SR); s=s[:max(0,N-i)]*g; out[i:i+len(s)]+=s[:,None]
tt=np.arange(N)/SR
out*=(1-0.9*((tt>2.85)&(tt<3.55)))[:,None]
t=np.arange(int(.65*SR))/SR; add(np.sin(2*np.pi*1000*t)*0.6,2.9)  # BLEEP
def sq(f,d): t=np.arange(int(d*SR))/SR; return np.sign(np.sin(2*np.pi*f*t))*0.3*np.minimum(1,t/0.01)
add(sq(392,0.18)+np.pad(sq(330,0.18),(0,0)),5.7,0.5); add(sq(392,0.35),5.95,0.5)  # taxi honk
for j,f in enumerate([880,660]): t=np.arange(int(.5*SR))/SR; add(np.sin(2*np.pi*f*t)*np.exp(-t*4),8.0+j*0.25,0.3)  # subway chime
for j in range(3): t=np.arange(int(.18*SR))/SR; add(np.sin(2*np.pi*(320+40*np.sin(2*np.pi*14*t))*t)*np.sin(np.pi*t/.18),10.2+j*0.22,0.3)  # pigeon coo
t=np.arange(int(.08*SR))/SR; add(np.random.randn(len(t))*np.exp(-t*40),12.2,0.5)
for f in (2637,3136): t=np.arange(int(.9*SR))/SR; add(np.sin(2*np.pi*f*t)*np.exp(-t*4),12.3,0.22)  # ka-ching
def hit(t0):
    t=np.arange(int(.4*SR))/SR; f=50+120*np.exp(-t*25); add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*7),t0,1.2)
    add(np.random.randn(int(.15*SR))*np.exp(-np.arange(int(.15*SR))/SR*25)*0.5,t0)
for t0 in (6.8,9.1,11.2,13.2,14.0): hit(t0)
t=np.arange(int(.4*SR))/SR; f=900*np.exp(-t*8)+100; add((np.random.randn(len(t))*0.4+np.sin(2*np.pi*np.cumsum(f)/SR))*np.exp(-t*5),4.2,0.6)
fade=int(1.0*SR); out[-fade:]*=np.linspace(1,0,fade)[:,None]
out=np.tanh(out*1.2); out/=np.abs(out).max(); out*=0.9
w=wave.open('nyc.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok')
