# Wide 1920x1080 SAVE ONE PERSON ALERT (computers, Facebook, website). Usage: python3 v4w.py <config.json>  (uses "out_wide" if set)
import json, sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from v4core import render
c = json.load(open(sys.argv[1])); c['out'] = c.get('out_wide', c['out'].replace('.mp4', '-wide.mp4'))
render(c, dict(W=1920, H=1080, title=(48, 92, 0), title_one_line=True, phone=(190, 200, 390, 820),
       cap=(690, 200, 1140, 76, 52), cap_h=470, band=(690, 710, 1140, 300, (66, 66, 56))))
