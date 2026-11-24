import numpy as np, wave
SR=44100; D=42.5; N=int(SR*D); out=np.zeros(N)
nf=lambda m:440*2**((m-69)/12)
def pad(f,t0,d,g=0.12):
    t=np.arange(int(d*SR))/SR; env=np.minimum(1,t/1.2)*np.minimum(1,(d-t)/1.5)
    s=sum(np.sin(2*np.pi*f*h*t+0.3*h)*(0.6/h) for h in (1,2,3))+0.5*np.sin(2*np.pi*f*1.003*t)
    i=int(t0*SR); out[i:i+len(s)]+=s*env*g
def bell(f,t0,g=0.10):
    t=np.arange(int(2.5*SR))/SR; s=(np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*f*2.01*t))*np.exp(-t*2.2)
    i=int(t0*SR); e=min(N,i+len(s)); out[i:e]+=s[:e-i]*g
prog=[[60,64,67,72],[57,60,64,69],[53,57,60,65],[55,59,62,67]]
mel=[76,79,81,79,77,76,74,72]
t=0; k=0
while t<D-1:
    ch=prog[k%4]
    for m in ch: pad(nf(m-12),t,min(5.5,D-t),0.07)
    for j in range(4):
        if t+j*1.3<D-2: bell(nf(mel[(k*4+j)%8]),t+j*1.3)
    t+=5.3; k+=1
out/=np.max(np.abs(out))*1.3
fade=np.ones(N); fl=int(2.5*SR); fade[-fl:]=np.linspace(1,0,fl); out*=fade
st=np.stack([out,out],1); w=wave.open('music.wav','wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st*32767).astype(np.int16).tobytes()); w.close()
