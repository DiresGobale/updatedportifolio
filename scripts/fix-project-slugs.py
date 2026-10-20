#!/usr/bin/env python3
"""
Fix portfolio-data.ts: add slug, features, and internal demo links to all 6 projects.
Also fix GitHub links to DiresGobale.
"""
import re

with open('/home/z/my-project/src/lib/portfolio-data.ts', 'r') as f:
    content = f.read()

# Replace the entire projects array
old_projects_start = content.find('export const projects: Project[] = [')
old_projects_end = content.find('\n]\n\n// === Testimonials ===')
old_projects = content[old_projects_start:old_projects_end+2]

new_projects = '''export const projects: Project[] = [
  {
    title: "AI-Powered Employee Recommendation System",
    slug: "ai-employee-recommendation",
    description:
      "A full-stack web platform that uses AI to match candidates to open job roles based on skills, experience, and semantic similarity.",
    longDescription:
      "Built with React + Node.js/Express + PostgreSQL. The AI pipeline parses resumes, extracts structured skills, and ranks candidates against job descriptions with explainable scoring. Includes a recruiter dashboard and candidate profile pages.",
    features: [
      "AI-powered resume parsing and skill extraction",
      "Semantic candidate-to-job matching with explainable scoring",
      "Recruiter dashboard with candidate rankings",
      "Candidate profile pages with skill breakdowns",
      "RESTful API with Node.js/Express backend",
      "PostgreSQL database for candidate and job data",
    ],
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "AI"],
    github: "https://github.com/DiresGobale/ai-employee-recommendation",
    demo: "/projects/ai-employee-recommendation",
    featured: true,
  },
  {
    title: "Expense Tracker — Flutter App",
    slug: "expense-tracker",
    description:
      "A cross-platform mobile app for tracking daily expenses, with categories, monthly charts, and local offline storage.",
    longDescription:
      "Built with Flutter and Dart. Uses local SQLite storage so it works fully offline, with charts for visualizing spending by category and month. Designed in Figma first, then implemented with clean Material Design.",
    features: [
      "Cross-platform (Android + iOS) from a single codebase",
      "Offline-first with local SQLite storage",
      "Category-based expense tracking",
      "Monthly spending charts and visualizations",
      "Clean Material Design UI",
      "Designed in Figma before implementation",
    ],
    image:
      "https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Flutter", "Dart", "SQLite", "Mobile"],
    github: "https://github.com/DiresGobale/expense-tracker-flutter",
    demo: "/projects/expense-tracker",
    featured: true,
  },
  {
    title: "Evaluation Management System",
    slug: "evaluation-management",
    description:
      "A web app for managing student and instructor evaluations, with role-based access, feedback forms, and admin reporting.",
    longDescription:
      "Built with React + Node.js/Express + PostgreSQL. Features include student feedback forms, instructor dashboards, admin reporting, and role-based access control. Designed to handle academic evaluation workflows end-to-end.",
    features: [
      "Student feedback forms with structured questions",
      "Instructor dashboards with evaluation summaries",
      "Admin reporting with export capabilities",
      "Role-based access control (student, instructor, admin)",
      "RESTful API with Node.js/Express",
      "PostgreSQL for evaluation data storage",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    github: "https://github.com/DiresGobale/evaluation-management",
    demo: "/projects/evaluation-management",
  },
  {
    title: "Library Management — Database Documentation",
    slug: "library-management",
    description:
      "Complete database design and documentation for a library management system, including ER diagrams and a fully normalized MySQL schema.",
    longDescription:
      "Designed a complete MySQL schema for a library management system covering books, members, loans, fines, and staff. Produced ER diagrams, normalized tables to 3NF, wrote sample queries, and delivered full system documentation that another developer could implement from scratch.",
    features: [
      "Complete MySQL schema (books, members, loans, fines, staff)",
      "ER diagrams documenting all entity relationships",
      "Normalized to 3NF with documented dependencies",
      "Sample SQL queries for common operations",
      "Full system documentation for developer handoff",
      "Stored procedures for key library operations",
    ],
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
    tags: ["MySQL", "ER Diagrams", "Normalization", "Documentation"],
    github: "https://github.com/DiresGobale/library-management-docs",
    demo: "/projects/library-management",
  },
  {
    title: "Product Delivery System",
    slug: "product-delivery-system",
    description:
      "A full-stack web application for managing product deliveries — order tracking, dispatch management, delivery agent assignment, and real-time status updates.",
    longDescription:
      "Built in 2025, this system handles the end-to-end product delivery workflow: order creation, dispatch scheduling, delivery agent assignment, route tracking, and real-time status updates. Features a customer-facing order tracking page, an admin dashboard for dispatchers, and a mobile-friendly view for delivery agents. Uses React for the front-end, Node.js/Express for the API, and PostgreSQL for order/delivery data.",
    features: [
      "Order creation and dispatch scheduling",
      "Delivery agent assignment and route tracking",
      "Real-time delivery status updates",
      "Customer-facing order tracking page",
      "Admin dashboard for dispatchers",
      "Mobile-friendly view for delivery agents",
    ],
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Delivery"],
    github: "https://github.com/DiresGobale/product-delivery-system",
    demo: "/projects/product-delivery-system",
  },
  {
    title: "Course Registration System",
    slug: "course-registration-system",
    description:
      "A full-stack web application that lets students browse available courses, register for classes, and manage their enrollment — with an admin dashboard for managing course offerings and student records.",
    longDescription:
      "Built for academic course enrollment workflows. Students can browse the course catalog, view prerequisites and seat availability, register for classes, and drop courses before deadlines. Includes an admin dashboard for managing course offerings, setting seat limits, viewing enrollment reports, and managing student records. Built with React for the front-end, Node.js/Express for the API, and PostgreSQL for the database.",
    features: [
      "Course catalog browsing with search and filters",
      "Prerequisites and seat availability tracking",
      "Student registration and drop functionality",
      "Admin dashboard for course offerings management",
      "Enrollment reports and seat limit controls",
      "Student records management",
    ],
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Education"],
    github: "https://github.com/DiresGobale/course-registration-system",
    demo: "/projects/course-registration-system",
  },
]'''

content = content[:old_projects_start] + new_projects + content[old_projects_end+2:]

with open('/home/z/my-project/src/lib/portfolio-data.ts', 'w') as f:
    f.write(content)

print("Done! All 6 projects now have slug, features, and internal demo links.")
