# Heavenly pad for the SAVE ONE PERSON ALERT videos.
# Usage: python3 music.py <seconds> <out.wav>   (chord changes every 4.6 s, matching the captions)
import sys, numpy as np, wave
dur = float(sys.argv[1]); out = sys.argv[2]; SR = 44100; SEG = 4.6
n = int(dur * SR); t = np.arange(n) / SR
def hz(m): return 440.0 * 2 ** ((m - 69) / 12)
# C  Am  F  G  C  F  C  (repeats if longer)
CH = [[48, 60, 64, 67, 72], [45, 57, 60, 64, 69], [41, 57, 60, 65, 69], [43, 55, 59, 62, 67],
      [48, 60, 64, 67, 72], [41, 57, 60, 65, 69], [48, 60, 64, 67, 76]]
L = np.zeros(n); R = np.zeros(n)
seg_n = int(SEG * SR)
for k in range(int(np.ceil(dur / SEG))):
    s0 = k * seg_n; s1 = min(n, s0 + seg_n + int(1.2 * SR)); tt = t[s0:s1] - t[s0]
    env = np.minimum(1, tt / 1.1) * np.clip((s1 - s0) / SR - tt, 0, 1.2) / 1.2
    for j, m in enumerate(CH[k % len(CH)]):
        f = hz(m); a = 0.05 if j else 0.06
        for det, pan in ((-0.0025, 0.75), (0.0025, 0.25), (0, 0.5)):
            v = a * env * (np.sin(2 * np.pi * f * (1 + det) * tt) + 0.25 * np.sin(4 * np.pi * f * (1 + det) * tt))
            v *= 0.8 + 0.2 * np.sin(2 * np.pi * 0.3 * tt + j)
            L[s0:s1] += v * pan; R[s0:s1] += v * (1 - pan)
    # soft bell arpeggio
    notes = CH[k % len(CH)][1:] + [CH[k % len(CH)][2] + 12]
    for i, m in enumerate(notes):
        b0 = s0 + int(i * 0.55 * SR) + int(0.3 * SR)
        if b0 >= n: break
        b1 = min(n, b0 + int(2.5 * SR)); bt = t[b0:b1] - t[b0]
        v = 0.045 * np.exp(-bt * 1.8) * (np.sin(2 * np.pi * hz(m + 12) * bt) + 0.3 * np.sin(2 * np.pi * hz(m + 24) * bt))
        p = 0.3 + 0.4 * (i % 2)
        L[b0:b1] += v * p; R[b0:b1] += v * (1 - p)
# simple reverb: feedback combs
def verb(x, ds, g=0.5):
    y = x.copy()
    for d in ds:
        d = int(d * SR); c = np.zeros_like(x); c[:] = x
        for i in range(d, len(x), d):
            c[i:i + d] += g * c[i - d:i][:len(c[i:i + d])]
        y += 0.25 * c
    return y
L = verb(L, [0.0297, 0.0371]); R = verb(R, [0.0331, 0.0411])
fade = np.ones(n); fi = int(1.0 * SR); fo = int(2.0 * SR)
fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.linspace(1, 0, fo)
st = np.stack([L * fade, R * fade], 1); st /= np.abs(st).max() / 0.6
w = wave.open(out, 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st * 32767).astype('<i2').tobytes()); w.close(); print('ok', out, dur)
