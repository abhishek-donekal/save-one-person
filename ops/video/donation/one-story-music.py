import numpy as np, wave
SR = 44100; DUR = 24.0; N = int(SR * DUR)
out = np.zeros(N)
nf = lambda m: 440 * 2 ** ((m - 69) / 12)
prog = [[48, 55, 60, 64, 67], [45, 52, 57, 60, 64], [41, 48, 57, 60, 65], [43, 50, 55, 59, 62]]
BAR = 3.0
for k in range(int(DUR / BAR) + 1):
    t0 = k * BAR; ch = prog[k % 4]
    L = int((BAR + 1.5) * SR); t = np.arange(L) / SR
    env = np.minimum(1, t / 0.8) * np.exp(-t * 0.6)
    for m in ch:
        s = (np.sin(2 * np.pi * nf(m) * t) + 0.25 * np.sin(2 * np.pi * nf(m) * 2.003 * t)) * env * 0.09
        i = int(t0 * SR); e = min(N, i + L); out[i:e] += s[:e - i]
    # gentle bell arpeggio
    for j, m in enumerate([ch[2] + 12, ch[3] + 12, ch[4] + 12, ch[3] + 12]):
        tb = t0 + j * 0.75; Lb = int(1.6 * SR); tt = np.arange(Lb) / SR
        s = np.sin(2 * np.pi * nf(m) * tt) * np.exp(-tt * 3.2) * 0.06
        i = int(tb * SR); e = min(N, i + Lb)
        if i < N: out[i:e] += s[:e - i]
fade = np.ones(N); fi = int(0.5 * SR); fo = int(1.5 * SR)
fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo)
out = out * fade; out = out / np.abs(out).max() * 0.6
st = np.stack([out, np.roll(out, 300)], 1)
w = wave.open('music.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype('<i2').tobytes()); w.close()
