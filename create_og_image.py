import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630

# 1. Base background: warm luxury ivory/cream parchment
bg = Image.new('RGB', (W, H), '#fbf6ee')
draw = ImageDraw.Draw(bg)

# Subtle warm radial gradient
center_x, center_y = 380, H // 2
for r in range(900, 0, -12):
    factor = r / 900
    r_val = int(251 + (255 - 251) * (1 - factor))
    g_val = int(246 + (252 - 246) * (1 - factor))
    b_val = int(238 + (245 - 238) * (1 - factor))
    draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], fill=(r_val, g_val, b_val))

# Load engagement ritual image for right side
ritual_img = Image.open('public/assets/engagement-ritual.jpg').convert('RGBA')

# Right card dimension:
rw, rh = 420, 540
rx, ry = 735, 45
arch_r = rw // 2  # 210

ritual_resized = ritual_img.resize((rw, rh), Image.Resampling.LANCZOS)

# Create arched mask
mask = Image.new('L', (rw, rh), 0)
mdraw = ImageDraw.Draw(mask)
# Top semicircle
mdraw.pieslice([0, 0, rw, arch_r * 2], 180, 360, fill=255)
# Middle & lower body
mdraw.rectangle([0, arch_r, rw, rh - 24], fill=255)
# Bottom rounded rectangle
mdraw.rounded_rectangle([0, rh - 48, rw, rh], 24, fill=255)
mask = mask.filter(ImageFilter.GaussianBlur(1))

# Paste with mask
bg.paste(ritual_resized, (rx, ry), mask)

# Draw gold arch outline without any horizontal line across the middle
arch_layer = Image.new('RGBA', (W, H), (0, 0, 0, 0))
adraw = ImageDraw.Draw(arch_layer)

for (col, w_thick, offset) in [('#c8963e', 3, 0), ('#e8cd87', 1, -3), ('#9e6f24', 1, 2)]:
    x1 = rx - offset
    y1 = ry - offset
    x2 = rx + rw + offset
    y2 = ry + rh + offset
    ar = (x2 - x1) // 2
    # Top arc
    adraw.arc([x1, y1, x2, y1 + ar * 2], start=180, end=0, fill=col, width=w_thick)
    # Left and right side lines
    adraw.line([(x1, y1 + ar), (x1, y2 - 24)], fill=col, width=w_thick)
    adraw.line([(x2, y1 + ar), (x2, y2 - 24)], fill=col, width=w_thick)
    # Bottom rounded corners and bottom line
    adraw.arc([x1, y2 - 48, x1 + 48, y2], start=90, end=180, fill=col, width=w_thick)
    adraw.arc([x2 - 48, y2 - 48, x2, y2], start=0, end=90, fill=col, width=w_thick)
    adraw.line([(x1 + 24, y2), (x2 - 24, y2)], fill=col, width=w_thick)

bg.paste(arch_layer, (0, 0), arch_layer)

# Load couple monogram crest for left top
crest_img = Image.open('public/assets/couple-monogram.jpg').convert('RGBA')
cw = 136
crest_resized = crest_img.resize((cw, cw), Image.Resampling.LANCZOS)

cmask = Image.new('L', (cw, cw), 0)
cdraw = ImageDraw.Draw(cmask)
cdraw.ellipse([2, 2, cw - 2, cw - 2], fill=255)
cmask = cmask.filter(ImageFilter.GaussianBlur(1))

cx, cy = 65, 46
bg.paste(crest_resized, (cx, cy), cmask)

# Monogram circular gold rings
draw.ellipse([cx - 4, cy - 4, cx + cw + 4, cy + cw + 4], outline='#c8963e', width=3)
draw.ellipse([cx - 7, cy - 7, cx + cw + 7, cy + cw + 7], outline='#e6c880', width=1)

# Fonts
font_marcellus_xs = ImageFont.truetype('scratch_marcellus.ttf', 13)
font_marcellus_sm = ImageFont.truetype('scratch_marcellus.ttf', 15)
font_marcellus_md = ImageFont.truetype('scratch_marcellus.ttf', 17)
font_marcellus_lg = ImageFont.truetype('scratch_marcellus.ttf', 20)
font_italiana_xl = ImageFont.truetype('scratch_italiana.ttf', 44)
font_parisienne_xl = ImageFont.truetype('scratch_parisienne.ttf', 38)
font_parisienne_md = ImageFont.truetype('scratch_parisienne.ttf', 24)

# Top header beside crest
draw.text((cx + cw + 22, cy + 18), 'WITH THE BLESSINGS OF OUR FAMILIES', fill='#9b6732', font=font_marcellus_xs)
draw.text((cx + cw + 22, cy + 44), 'ENGAGEMENT CEREMONY', fill='#87283e', font=font_marcellus_lg)
draw.text((cx + cw + 22, cy + 78), 'NICHAYATHARTHAM  |  A PROMISE TAKES FORM', fill='#784c25', font=font_marcellus_sm)

# Gold filigree rule
draw.line([(65, 205), (695, 205)], fill='#c8963e', width=2)
draw.ellipse([375, 201, 385, 209], fill='#c8963e')

# Couple Names in Italiana & Parisienne
name1 = 'Charles Arvind'
and_sym = '&'
name2 = 'Lavania'

draw.text((65, 230), name1, fill='#422310', font=font_italiana_xl)
draw.text((380, 235), and_sym, fill='#b8761d', font=font_parisienne_xl)
draw.text((425, 230), name2, fill='#422310', font=font_italiana_xl)

# Full formal names
draw.text((67, 300), 'Charles Arvind Sethuraman Vairavan  &  Lavania Ramarao', fill='#7a502c', font=font_marcellus_md)

# Romantic quote
draw.text((67, 340), 'Two paths, one forever — A sacred celebration of love', fill='#9e3c54', font=font_parisienne_md)

# Date & Location card
card_x1, card_y1, card_x2, card_y2 = 65, 390, 695, 485
draw.rounded_rectangle([(card_x1, card_y1), (card_x2, card_y2)], radius=14, fill='#f4e5cc', outline='#c8963e', width=2)
draw.rounded_rectangle([(card_x1 + 3, card_y1 + 3), (card_x2 - 3, card_y2 - 3)], radius=12, outline='#ebdcb3', width=1)

# Inside date card - clean 2 column layout
# Left Column: Date & Time
draw.text((88, 408), 'FRIDAY, 05 FEBRUARY 2027', fill='#422310', font=font_marcellus_lg)
draw.text((88, 442), '6:30 PM Onwards  |  Muhurtham', fill='#875224', font=font_marcellus_sm)

# Center divider line inside card
draw.line([(385, 402), (385, 473)], fill='#d5b47a', width=1)

# Right Column: Venue & Town
draw.text((408, 408), 'DEWAN G. MANOGARAN', fill='#422310', font=font_marcellus_lg)
draw.text((408, 442), 'Chaah, Johor, Malaysia', fill='#875224', font=font_marcellus_sm)

# Bottom note & production reference
draw.line([(65, 520), (695, 520)], fill='#c8963e', width=1)
draw.text((67, 542), 'Ring Exchange  |  Thamboolam Plate  |  Feast & Blessings', fill='#784c25', font=font_marcellus_sm)
draw.text((518, 542), 'lavania-weds-charles.invitestory.in', fill='#9b6732', font=font_marcellus_xs)

# Luxury double border
draw.rectangle([(16, 16), (W - 16, H - 16)], outline='#c8963e', width=2)
draw.rectangle([(22, 22), (W - 22, H - 22)], outline='#ecd18f', width=1)

# Corner floral dots
corners = [(16, 16), (W - 16, 16), (16, H - 16), (W - 16, H - 16)]
for c in corners:
    draw.ellipse([c[0] - 7, c[1] - 7, c[0] + 7, c[1] + 7], fill='#c8963e')

bg.save('public/assets/og-charles-lavania.png', 'PNG', quality=95)
print('Generated refined og-charles-lavania.png successfully!')
