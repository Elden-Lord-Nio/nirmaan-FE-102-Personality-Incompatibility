import os
import glob
from PIL import Image
import colorsys

brain_dir = r"C:\Users\omkar pawar\.gemini\antigravity\brain\3048f7a4-1634-4d85-81c2-030205e7c638"
dest_dir = r"c:\Users\omkar pawar\Hackathon\GoalLink\static\images"

def get_latest(prefix):
    files = glob.glob(os.path.join(brain_dir, f"{prefix}_*.png"))
    if not files: return None
    return max(files, key=os.path.getctime)

mbtis = ['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 
         'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP']

male_base = get_latest("male_hacker_base") or os.path.join(dest_dir, "anime_hero.png")
female_base = get_latest("female_hacker_base") or os.path.join(dest_dir, "anime_hero.png")

print(f"Male Base: {male_base}")
print(f"Female Base: {female_base}")

try:
    img_male = Image.open(male_base).convert('RGBA')
    img_female = Image.open(female_base).convert('RGBA')
    
    for i, mbti in enumerate(mbtis):
        # Generate varied color overlay
        h = i / 16.0
        r, g, b = colorsys.hsv_to_rgb(h, 0.8, 0.9)
        color = (int(r*255), int(g*255), int(b*255))
        
        # Male version
        overlay_m = Image.new('RGBA', img_male.size, color + (60,))
        tinted_m = Image.alpha_composite(img_male, overlay_m).convert('RGB')
        # Flip every other
        if i % 2 == 1: tinted_m = tinted_m.transpose(Image.FLIP_LEFT_RIGHT)
        tinted_m.save(os.path.join(dest_dir, f"{mbti.lower()}_male.png"))
        
        # Female version
        overlay_f = Image.new('RGBA', img_female.size, color + (60,))
        tinted_f = Image.alpha_composite(img_female, overlay_f).convert('RGB')
        if i % 2 == 0: tinted_f = tinted_f.transpose(Image.FLIP_LEFT_RIGHT)
        tinted_f.save(os.path.join(dest_dir, f"{mbti.lower()}_female.png"))
        
        print(f"Generated {mbti} images")
except Exception as e:
    print(f"Error: {e}")
