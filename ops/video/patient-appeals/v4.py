# Tall 1080x1920 SAVE ONE PERSON ALERT (Shorts, Reels, TikTok). Usage: python3 v4.py <config.json>
import json, sys, os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__))); from v4core import render
render(json.load(open(sys.argv[1])), dict(W=1080, H=1920, title=(215, 98, 124), phone=(50, 520, 400, 830),
       cap=(500, 520, 540, 68, 46), cap_h=830, band=(60, 1405, 960, 300, (70, 70, 60))))
