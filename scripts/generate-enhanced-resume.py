#!/usr/bin/env python3
"""
Generate Dires's enhanced CV — keeps all existing content from the
original FlowCV resume and adds relevant portfolio projects, expanded
skills, and a projects section.

Output: /home/z/my-project/public/resume.pdf
"""
import os

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration ──
pdfmetrics.registerFont(TTFont('FreeSerif', '/usr/share/fonts/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', '/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', '/usr/share/fonts/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', '/usr/share/fonts/truetype/freefont/FreeSerifBoldItalic.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')

# Also register Carlito (a sans-serif close to Calibri) for a modern look
try:
    pdfmetrics.registerFont(TTFont('Carlito', '/usr/share/fonts/truetype/english/Carlito-Regular.ttf'))
    pdfmetrics.registerFont(TTFont('Carlito-Bold', '/usr/share/fonts/truetype/english/Carlito-Bold.ttf'))
    pdfmetrics.registerFont(TTFont('Carlito-Italic', '/usr/share/fonts/truetype/english/Carlito-Italic.ttf'))
    registerFontFamily('Carlito', normal='Carlito', bold='Carlito-Bold', italic='Carlito-Italic')
    FONT = 'Carlito'
    FONT_BOLD = 'Carlito-Bold'
    FONT_ITALIC = 'Carlito-Italic'
except Exception:
    FONT = 'FreeSerif'
    FONT_BOLD = 'FreeSerif-Bold'
    FONT_ITALIC = 'FreeSerif-Italic'

# ── Colors (matching the portfolio brand) ──
ACCENT = colors.HexColor('#06b6d4')        # cyan-500
TEXT_DARK = colors.HexColor('#0f172a')     # slate-900
TEXT_MUTED = colors.HexColor('#475569')    # slate-600
RULE_COLOR = colors.HexColor('#06b6d4')

# ── Styles ──
name_style = ParagraphStyle(
    'Name', fontName=FONT_BOLD, fontSize=24,
    leading=28, alignment=TA_CENTER, spaceAfter=2,
    textColor=TEXT_DARK,
)
title_style = ParagraphStyle(
    'Title', fontName=FONT, fontSize=12,
    leading=16, alignment=TA_CENTER, spaceAfter=2,
    textColor=ACCENT,
)
contact_style = ParagraphStyle(
    'Contact', fontName=FONT, fontSize=9.5,
    leading=13, alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=8,
)
section_title_style = ParagraphStyle(
    'SectionTitle', fontName=FONT_BOLD, fontSize=12,
    leading=15, spaceBefore=10, spaceAfter=3, textColor=ACCENT,
)
body_style = ParagraphStyle(
    'Body', fontName=FONT, fontSize=10,
    leading=14, spaceAfter=3, textColor=TEXT_DARK,
)
bullet_style = ParagraphStyle(
    'Bullet', fontName=FONT, fontSize=9.5,
    leading=13, leftIndent=14, bulletIndent=0,
    spaceBefore=1, spaceAfter=1, textColor=TEXT_DARK,
)
job_title_style = ParagraphStyle(
    'JobTitle', fontName=FONT_BOLD, fontSize=10.5,
    leading=14, spaceAfter=1, textColor=TEXT_DARK,
)
job_meta_style = ParagraphStyle(
    'JobMeta', fontName=FONT_ITALIC, fontSize=9.5,
    leading=13, textColor=TEXT_MUTED, spaceAfter=3,
)
skill_style = ParagraphStyle(
    'Skill', fontName=FONT, fontSize=10,
    leading=14, spaceAfter=2, textColor=TEXT_DARK,
)

# ── Helpers ──
def section_header(title):
    return [
        Paragraph(f'<b>{title}</b>', section_title_style),
        HRFlowable(width='100%', thickness=0.8, color=RULE_COLOR,
                    spaceBefore=0, spaceAfter=5),
    ]

# ── Build Document ──
output_path = '/home/z/my-project/public/resume.pdf'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    leftMargin=1.5*cm, rightMargin=1.5*cm,
    topMargin=1.3*cm, bottomMargin=1.3*cm,
    title='Dires Gobale — Resume',
    author='Dires Gobale', creator='Z.ai'
)

story = []

# === Header (from original CV — unchanged) ===
story.append(Paragraph('<b>Dires Gobale</b>', name_style))
story.append(Paragraph('Front-end Developer & Full-Stack Developer', title_style))
story.append(Paragraph(
    'dires7481@gmail.com  |  0995774866  |  Injibara, Amhara, Ethiopia  |  github.com/DiresGobale',
    contact_style
))

# === Profile (from original CV — unchanged) ===
story.extend(section_header('PROFILE'))
story.append(Paragraph(
    'I am a 3rd year Information System student at Injibara University, Ethiopia. '
    'With strong curiosity for problem solving and know better and valuable things '
    'than yesterday. I am also a creative developer with python based frameworks/libraries. '
    'I wanna build a world with easy and simple to live with the help of AI.',
    body_style
))

# === Skills (original skills kept + expanded from portfolio) ===
story.extend(section_header('SKILLS'))
story.append(Paragraph('<b>Front-end Web Development:</b>  HTML, CSS, JavaScript, React.js, Next.js, TypeScript, Tailwind CSS', skill_style))
story.append(Paragraph('<b>Back-end Development:</b>  Node.js, Express.js, REST API, C#, .NET Framework', skill_style))
story.append(Paragraph('<b>Database:</b>  MySQL, PostgreSQL, schema design, normalization, ER diagrams', skill_style))
story.append(Paragraph('<b>Mobile Development:</b>  Flutter, Dart', skill_style))
story.append(Paragraph('<b>Design & UI/UX:</b>  Figma, wireframing, prototyping, design systems', skill_style))
story.append(Paragraph('<b>Web Designer:</b>  great web designer with up-to-date softwares', skill_style))

# === Projects (NEW — added from the portfolio) ===
story.extend(section_header('KEY PROJECTS'))

# Project 1
story.append(Paragraph('<b>AI-Powered Employee Recommendation System</b>', job_title_style))
story.append(Paragraph('React · Node.js · Express · PostgreSQL  |  2024', job_meta_style))
story.append(Paragraph(
    '• Full-stack web platform using AI to match candidates to job roles based on skills and semantic similarity',
    bullet_style
))
story.append(Paragraph(
    '• Recruiter dashboard with candidate rankings, explainable AI scoring, and profile pages',
    bullet_style
))
story.append(Spacer(1, 3))

# Project 2
story.append(Paragraph('<b>Expense Tracker — Flutter App</b>', job_title_style))
story.append(Paragraph('Flutter · Dart · SQLite  |  2023 — 2024', job_meta_style))
story.append(Paragraph(
    '• Cross-platform mobile app for tracking daily expenses with categories, monthly charts, offline storage',
    bullet_style
))
story.append(Paragraph(
    '• Designed in Figma first, implemented with clean Material Design',
    bullet_style
))
story.append(Spacer(1, 3))

# Project 3
story.append(Paragraph('<b>Product Delivery System</b>', job_title_style))
story.append(Paragraph('React · Node.js · Express · PostgreSQL  |  2025', job_meta_style))
story.append(Paragraph(
    '• Full-stack delivery management: order tracking, dispatch, agent assignment, real-time status updates',
    bullet_style
))
story.append(Spacer(1, 3))

# Project 4
story.append(Paragraph('<b>Course Registration System</b>', job_title_style))
story.append(Paragraph('React · Node.js · Express · PostgreSQL  |  2025', job_meta_style))
story.append(Paragraph(
    '• Student course enrollment system: catalog browsing, registration, prerequisites tracking, admin dashboard',
    bullet_style
))
story.append(Spacer(1, 3))

# Project 5
story.append(Paragraph('<b>Evaluation Management System</b>', job_title_style))
story.append(Paragraph('React · Node.js · Express · PostgreSQL  |  2023', job_meta_style))
story.append(Paragraph(
    '• Web app for student/instructor evaluations with role-based access, feedback forms, admin reporting',
    bullet_style
))
story.append(Spacer(1, 3))

# Project 6
story.append(Paragraph('<b>Library Management — Database Design</b>', job_title_style))
story.append(Paragraph('MySQL · ER Diagrams · Normalization  |  2022 — 2023', job_meta_style))
story.append(Paragraph(
    '• Complete MySQL schema (books, members, loans, fines), normalized to 3NF with full ER documentation',
    bullet_style
))

# === Courses (from original CV — unchanged) ===
story.extend(section_header('COURSES'))
story.append(Paragraph('• Data Structure and Algorithm', bullet_style))
story.append(Paragraph('• Object-Oriented Programming', bullet_style))
story.append(Paragraph('• Operating System and System Programming', bullet_style))
story.append(Paragraph('• Fundamentals of Data Science (Udacity)', bullet_style))

# === Education (from original CV — unchanged) ===
story.extend(section_header('EDUCATION'))
story.append(Paragraph('<b>Information System — Injibara University</b>', job_title_style))
story.append(Paragraph('09/2022 – Present  |  Injibara, Ethiopia', job_meta_style))

# === Languages (from original CV — unchanged) ===
story.extend(section_header('LANGUAGES'))
story.append(Paragraph('<b>Python</b> — Experienced     <b>JavaScript</b> — Proficient     <b>C++ and JAVA</b> — Intermediate', skill_style))
story.append(Paragraph('<b>Amharic</b> — Native     <b>English</b> — Professional Working', skill_style))

# === Interests (from original CV — unchanged) ===
story.extend(section_header('INTERESTS'))
story.append(Paragraph(
    '• AI / ML Engineering — I wanna build a world to live with little efforts with the help of AI',
    bullet_style
))
story.append(Paragraph(
    '• Full-stack web development — building scalable and easy to use websites',
    bullet_style
))

# === Social Links (NEW — from portfolio) ===
story.extend(section_header('CONNECT'))
story.append(Paragraph(
    'GitHub: github.com/DiresGobale  |  Telegram: @diresfromGondar  |  TikTok: @dires1214  |  Email: dires7481@gmail.com',
    skill_style
))

doc.build(story)

# Verify
size_kb = os.path.getsize(output_path) / 1024
print(f"Resume generated: {output_path}")
print(f"Size: {size_kb:.1f} KB")
