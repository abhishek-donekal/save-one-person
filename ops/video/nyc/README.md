# NYC-style Go Bless Yourself videos (Lauren's chosen style, 2026-11-15)
Theme: "In NYC people say 'go [bleep] yourself' — we say GO BLESS YOURSELF." Lauren wants ALL tee videos in this NYC theme.
Her lines: "This Thanksgiving, go bless yourself... and others." "The gift that keeps on giving." "We want all New Yorkers and the world to say go bless yourself."
Style rules she gave: big type, HUGE "SAVEONEPERSONNOW.ORG/SHOP" footer always on screen, show the tee (front & back) and products (hoodies, hats, mugs, totes) a lot, never show the curse word (black box + bleep only).
Build: cd here; python3 music.py (writes base.wav); python3 sfx4.py (nyc.wav); python3 vid4.py (go-bless-yourself-nyc.mp4). Shop images: public/images/shop/. Copy and change the scenarios (SCN list) for each new video; never repeat a scenario (log them in ops/tee-promo-log.md).
Used so far: taxi cuts you off; someone takes your subway seat; pigeon steals your bagel; $14 oat latte; tourist stops mid-sidewalk; car alarm at 3 AM; pizza slice hits the floor; train delayed again (vid5.py); someone double-parks you in; express train skips your stop; bodega out of your sandwich (bodega cat); rent went up again (vid6.py + sfx6.py, 2026-11-17).

vid6.py (2026-11-17) adds: front+back tee side by side in every punchline, sign text auto-shrinks, and Lauren's exact line "We want all New Yorkers and the world to say GO BLESS YOURSELF!" on the end card. Use vid6.py/sfx6.py as the template from now on.

vid7.py/sfx7.py (2026-11-17): THANKSGIVING spot -> public/social/tee-videos/2026-11-23-thanksgiving.mp4. Scenarios used: aunt asks why you're still single; parade crowd blocks your street; someone took the last slice of pie; train home packed solid.
