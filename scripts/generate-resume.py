#!/usr/bin/env python3
"""
Generate Dires's resume PDF (ATS-friendly, single column).
Output: /home/z/my-project/public/resume.pdf
"""
import os
import sys

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# ── Font Registration (FreeSerif for ATS-safe English resumes) ──
pdfmetrics.registerFont(TTFont('FreeSerif', '/usr/share/fonts/truetype/freefont/FreeSerif.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Bold', '/usr/share/fonts/truetype/freefont/FreeSerifBold.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-Italic', '/usr/share/fonts/truetype/freefont/FreeSerifItalic.ttf'))
pdfmetrics.registerFont(TTFont('FreeSerif-BoldItalic', '/usr/share/fonts/truetype/freefont/FreeSerifBoldItalic.ttf'))
registerFontFamily('FreeSerif', normal='FreeSerif', bold='FreeSerif-Bold',
                   italic='FreeSerif-Italic', boldItalic='FreeSerif-BoldItalic')

# ── Brand accent color (matches portfolio palette: cyan/sky) ──
ACCENT = colors.HexColor('#06b6d4')        # cyan-500 — brand primary
TEXT_MUTED = colors.HexColor('#475569')    # slate-600 — muted text
RULE_COLOR = colors.HexColor('#06b6d4')

# ── Styles ──
name_style = ParagraphStyle(
    'ResumeName', fontName='FreeSerif-Bold', fontSize=24,
    leading=28, alignment=TA_CENTER, spaceAfter=2
)
contact_style = ParagraphStyle(
    'ResumeContact', fontName='FreeSerif', fontSize=10,
    leading=14, alignment=TA_CENTER, textColor=TEXT_MUTED, spaceAfter=10
)
section_title_style = ParagraphStyle(
    'ResumeSectionTitle', fontName='FreeSerif-Bold', fontSize=13,
    leading=16, spaceBefore=12, spaceAfter=4, textColor=ACCENT
)
job_title_style = ParagraphStyle(
    'ResumeJobTitle', fontName='FreeSerif-Bold', fontSize=11,
    leading=14, spaceAfter=1
)
job_meta_style = ParagraphStyle(
    'ResumeJobMeta', fontName='FreeSerif-Italic', fontSize=10,
    leading=13, textColor=TEXT_MUTED, spaceAfter=4
)
bullet_style = ParagraphStyle(
    'ResumeBullet', fontName='FreeSerif', fontSize=10,
    leading=14, leftIndent=14, bulletIndent=0,
    spaceBefore=1, spaceAfter=1
)
body_style = ParagraphStyle(
    'ResumeBody', fontName='FreeSerif', fontSize=10,
    leading=14, spaceAfter=2
)

# ── Helpers ──
def section_header(title):
    return [
        Paragraph(f'<b>{title}</b>', section_title_style),
        HRFlowable(width='100%', thickness=0.8, color=RULE_COLOR,
                    spaceBefore=0, spaceAfter=6),
    ]

def experience_entry(title, org, dates, location, bullets):
    elements = [
        Paragraph(f'<b>{title}</b>', job_title_style),
        Paragraph(f'{org}  |  {dates}  |  {location}', job_meta_style),
    ]
    for b in bullets:
        elements.append(Paragraph(f'• {b}', bullet_style))
    elements.append(Spacer(1, 4))
    return elements

def skills_row(categories):
    elements = []
    for cat, vals in categories:
        elements.append(Paragraph(f'<b>{cat}:</b>  {vals}', body_style))
    return elements

# ── Build Document ──
output_path = '/home/z/my-project/public/resume.pdf'
os.makedirs(os.path.dirname(output_path), exist_ok=True)

doc = SimpleDocTemplate(
    output_path, pagesize=A4,
    leftMargin=1.5*cm, rightMargin=1.5*cm,
    topMargin=1.5*cm, bottomMargin=1.5*cm,
    title='Dires — Resume',
    author='Dires', creator='Z.ai'
)

story = []

# === Header ===
story.append(Paragraph('<b>Dires</b>', name_style))
story.append(Paragraph(
    'dires7481@gmail.com  |  Injibara, Ethiopia  |  github.com/DiresGobale  |  t.me/diresfromGondar',
    contact_style
))

# === Professional Summary ===
story.extend(section_header('PROFESSIONAL SUMMARY'))
story.append(Paragraph(
    'Fourth-year Information System student at Injibara University with a passion for '
    'building real, working software. Skilled across the full web stack (React, Next.js, '
    'Node.js, Express, PostgreSQL, MySQL), mobile development with Flutter, and UI/UX design '
    'in Figma. Shipped 4+ coursework projects including an AI-powered employee recommendation '
    'system. Open to internships and junior full-stack or Flutter roles.',
    body_style
))

# === Education ===
story.extend(section_header('EDUCATION'))
story.extend(experience_entry(
    'B.Sc. Information System', 'Injibara University', '2021 — 2025 (Expected)',
    'Injibara, Ethiopia',
    [
        'Coursework: Operating Systems, Database Design, Systems Analysis, UX/UI, '
        'Software Engineering, Data Structures',
        'President of the Web Dev Club (2023 — 2024)',
    ]
))

# === Projects ===
story.extend(section_header('KEY PROJECTS'))
story.extend(experience_entry(
    'AI-Powered Employee Recommendation System', 'Web Application', '2024',
    'React · Node.js · Express · PostgreSQL',
    [
        'Built a full-stack web platform that uses AI to match candidates to open job roles '
        'based on skills, experience, and semantic similarity',
        'Implemented a recruiter dashboard and candidate profile pages with explainable scoring',
    ]
))
story.extend(experience_entry(
    'Expense Tracker — Flutter App', 'Mobile Application', '2023 — 2024',
    'Flutter · Dart · SQLite',
    [
        'Built a cross-platform mobile app for tracking daily expenses with categories, '
        'monthly charts, and offline local storage',
        'Designed in Figma first, then implemented with clean Material Design',
    ]
))
story.extend(experience_entry(
    'Evaluation Management System', 'Web Application', '2023',
    'React · Node.js · Express · PostgreSQL',
    [
        'Built a web app for managing student and instructor evaluations with role-based '
        'access, feedback forms, and admin reporting',
    ]
))
story.extend(experience_entry(
    'Library Management — Database Documentation', 'Database Design', '2022 — 2023',
    'MySQL · ER Diagrams',
    [
        'Designed a complete MySQL schema for a library management system — books, members, '
        'loans, fines. Normalized to 3NF with full system documentation',
    ]
))

# === Skills ===
story.extend(section_header('SKILLS'))
story.extend(skills_row([
    ('Frontend', 'React, Next.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS'),
    ('Backend', 'Node.js, Express.js, REST API design'),
    ('Database', 'PostgreSQL, MySQL, schema design, normalization'),
    ('Mobile', 'Flutter, Dart'),
    ('Design', 'Figma, UX/UI design, wireframing, prototyping'),
    ('Foundations', 'Operating Systems, Git, GitHub, VS Code, Docker (basics)'),
]))

# === Languages ===
story.extend(section_header('LANGUAGES'))
story.append(Paragraph(
    '<b>Amharic</b> (Native)  ·  <b>English</b> (Professional Working)',
    body_style
))

# === Interests ===
story.extend(section_header('INTERESTS'))
story.append(Paragraph(
    'AI Integration · Open-source · Mobile UX · Continuous Learning · Tech Community',
    body_style
))

doc.build(story)

# Verify output
size_kb = os.path.getsize(output_path) / 1024
print(f"Resume generated: {output_path}")
print(f"Size: {size_kb:.1f} KB")
