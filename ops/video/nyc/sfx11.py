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
t=np.arange(int(1.4*SR))/SR; n=np.random.randn(len(t)); n=np.convolve(n,np.ones(30)/30,'same'); add(n*(0.5+0.5*np.sin(2*np.pi*6*t))*1.5*np.minimum(1,t/0.1),5.7,0.5)  # street sweeper brushes
for j,f in enumerate([2093,2637]): t=np.arange(int(.6*SR))/SR; add(np.sin(2*np.pi*f*t)*np.exp(-t*6),8.1+j*0.08,0.35)  # glass clink
t=np.arange(int(.15*SR))/SR; add(np.random.randn(len(t))*np.exp(-t*30)*0.5,8.7); t=np.arange(int(.8*SR))/SR; add(np.sin(2*np.pi*1568*t)*np.exp(-t*5),8.75,0.3)  # ka-ching
t=np.arange(int(1.2*SR))/SR; add(np.random.randn(len(t))*np.convolve(np.ones(len(t)),np.ones(1),'same')*np.exp(-t*2)*0.15,10.3)  # crowd groan (noise)
for j,f in enumerate([392,370,349,330]): t=np.arange(int(.3*SR))/SR; add(np.sign(np.sin(2*np.pi*f*t))*0.18*np.exp(-t*3),10.4+j*0.3,0.6)  # sad trombone steps
for j in range(2): t=np.arange(int(.35*SR))/SR; add((np.sin(2*np.pi*2600*t)+0.5*np.sin(2*np.pi*3400*t))*np.exp(-t*12),12.3+j*0.22,0.35)  # bike bell
def hit(t0):
    t=np.arange(int(.4*SR))/SR; f=50+120*np.exp(-t*25); add(np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*7),t0,1.2)
    add(np.random.randn(int(.15*SR))*np.exp(-np.arange(int(.15*SR))/SR*25)*0.5,t0)
for t0 in (6.8,9.1,11.2,13.2,14.0): hit(t0)
t=np.arange(int(.4*SR))/SR; f=900*np.exp(-t*8)+100; add((np.random.randn(len(t))*0.4+np.sin(2*np.pi*np.cumsum(f)/SR))*np.exp(-t*5),4.2,0.6)
fade=int(1.0*SR); out[-fade:]*=np.linspace(1,0,fade)[:,None]
out=np.tanh(out*1.2); out/=np.abs(out).max(); out*=0.9
w=wave.open('nyc.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out*32767).astype(np.int16).tobytes()); w.close(); print('ok')
