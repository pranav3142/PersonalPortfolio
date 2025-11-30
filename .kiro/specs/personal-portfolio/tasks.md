# Implementation Plan

- [x] 1. Initialize project and configure build tools
  - Create Vite + React + TypeScript project
  - Install dependencies: framer-motion, lucide-react, tailwindcss v4
  - Configure Tailwind with oklch colors, custom theme extensions
  - Set up TypeScript strict mode and path aliases
  - _Requirements: 10.2_

- [x] 2. Implement global styles and layout foundation
  - Create index.css with Tailwind layers, global cursor: none, glassmorphism utilities
  - Add smooth scroll behavior and reduced motion media query overrides
  - Set up dark slate background and base typography
  - _Requirements: 10.1, 10.2, 10.3, 12.1, 12.2, 14.2, 14.3_

- [x] 3. Build custom hooks for responsive and accessibility features
  - Implement useMediaQuery hook for device detection
  - Implement useScrollProgress hook with throttled scroll listener
  - Implement useReducedMotion hook for prefers-reduced-motion detection
  - _Requirements: 1.4, 2.2, 11.2, 12.1, 12.2_

- [x] 4. Create shadcn-like UI primitive components
- [x] 4.1 Implement Button component
  - Create Button with solid and outline variants
  - Add motion hover/tap effects
  - Support both button and anchor rendering
  - _Requirements: 3.3, 3.4, 3.5_

- [x] 4.2 Implement Card component
  - Create Card with glassmorphism styling
  - Add optional hover tilt/depth effects
  - Include gradient borders and blur shadows
  - _Requirements: 4.2, 4.3, 10.1, 10.3_

- [x] 4.3 Implement Badge component
  - Create pill-shaped Badge with glow effects
  - Support default and accent variants
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 4.4 Implement Accordion component
  - Create Accordion with expandable items
  - Add animated height transitions using AnimatePresence
  - Include icon rotation on expand/collapse
  - _Requirements: 6.2, 6.3, 6.5_

- [x] 5. Implement CustomCursor component
- [x] 5.1 Create cursor tracking and rendering
  - Track mouse position with mousemove listener
  - Render custom cursor element with motion.div
  - Apply smooth follow animation with spring physics
  - Conditionally render only on desktop using useMediaQuery
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 6. Implement LoadingScreen component
- [x] 6.1 Create loading screen with JP monogram
  - Build SVG JP monogram with stroke-dasharray animation
  - Add orbiting particles using circular motion paths
  - Implement progress bar with animated width
  - Create fading grid backdrop with CSS gradients
  - Add auto-dismiss after 2-3s with fade-out exit animation
  - _Requirements: (Loading screen feature)_

- [x] 7. Implement Navigation component
- [x] 7.1 Create sticky navigation bar
  - Build sticky header with backdrop blur
  - Add JP logo with hover effect
  - Implement scroll progress bar using useScrollProgress hook
  - Create desktop horizontal nav links for About, Projects, Experience, Education, Skills, Contact
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 13.2_

- [x] 7.2 Add mobile navigation menu
  - Create hamburger menu button for mobile viewports
  - Implement slide-down navigation panel with AnimatePresence
  - Add smooth scroll to sections on link click
  - _Requirements: 2.5, 2.6, 14.1_

- [x] 8. Implement Hero section
- [x] 8.1 Create hero layout and text effects
  - Build center-aligned hero layout
  - Implement particle text effect for "Jamunarani Prabhu Pranav" using canvas or SVG
  - Add typewriter animation for subtitle "Computer Science Student & Full‑Stack Developer"
  - _Requirements: 3.1, 3.2_

- [x] 8.2 Add hero interactive elements
  - Create "Download CV" button (solid purple) linking to /cv.pdf
  - Create "Contact Me" button (outline) with scroll to Contact section
  - Add animated glowing blobs in background with scale/position animations
  - Implement floating particles with random motion paths
  - Add scroll indicator with bounce animation
  - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7, 3.8_

- [x] 9. Implement About section
  - Create About section with semantic HTML and ID
  - Build grid layout of glassmorphism cards for bio and focus areas
  - Add subtle hover lift effects using motion
  - Integrate lucide-react icons
  - _Requirements: 4.1, 4.2, 4.3, 13.1, 13.2_

- [x] 10. Implement Projects carousel
- [x] 10.1 Create project data and card structure
  - Define projects array with Prism, Swolemates, Crisis Trainer+, BoycottPro, SimplifyNext
  - Create project card component with cover image and gradient overlay
  - Add title, description, and tech stack badges to cards
  - _Requirements: 5.1, 5.4_

- [x] 10.2 Implement 3D carousel navigation
  - Build carousel with center card active (scale 1, full opacity)
  - Apply 3D perspective to side cards (scale 0.85, rotateY ±15deg, reduced opacity)
  - Add navigation arrows or swipe gesture support
  - Implement smooth transitions with AnimatePresence
  - _Requirements: 5.2, 5.3, 5.5_

- [x] 11. Implement Experience section
  - Create Experience section with Accordion component
  - Add accordion item for "Coding & Robotics Tutor — Empire Code (May–Aug 2024)"
  - Include bullet points: taught Python/JS/Blender/block coding, MOE instructor status, coached Coding Olympics SG
  - Add animated briefcase icon with rotation on expand
  - Implement hover depth effect using transform
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 13.1, 13.2_

- [x] 12. Implement Education section
  - Create Education section with timeline or card layout
  - Add card for "NUS School of Computing, BComp CS (Aug 2023 – May 2027)"
  - Include date range, institution info, and degree details
  - Add institution icon from lucide-react
  - _Requirements: 7.1, 7.2, 7.3, 13.1, 13.2_

- [x] 13. Implement Skills section
  - Create Skills section with grouped badge layout
  - Add Languages group: Python, Java, C/C++, JS
  - Add Frameworks group: React, Node, FastAPI, JavaFX
  - Add Tools group: VS Code, Git, R, Firebase
  - Implement responsive grid layout
  - Add stagger animation on scroll into view using Intersection Observer
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 13.1, 13.2_

- [x] 14. Implement Contact section
  - Create Contact section with holographic tilt card
  - Add email link: e1384377@u.nus.edu with Mail icon
  - Add LinkedIn link: linkedin.com/in/jppranav07 with LinkedIn icon
  - Add GitHub link: github.com/pranav3142 with GitHub icon
  - Implement tilt effect based on mouse position
  - Add animated background blob with gradient
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 13.1, 13.2_

- [x] 15. Implement Footer component
  - Create simple dark footer with closing message
  - Add copyright or additional links
  - Style with dark background and subtle border
  - _Requirements: (Footer feature)_

- [x] 16. Wire up App component and main entry
  - Import all section components into App.tsx
  - Render LoadingScreen with conditional display
  - Render CustomCursor conditionally for desktop
  - Render Navigation, Hero, About, Projects, Experience, Education, Skills, Contact, Footer in order
  - Set up main.tsx with React root rendering
  - _Requirements: 13.1, 13.2, 13.3_

- [x] 17. Add responsive styling and mobile optimizations
  - Ensure all sections adapt layout for mobile viewports
  - Override cursor: none on mobile to show default cursor
  - Test mobile menu functionality
  - Verify all content is readable on small screens
  - _Requirements: 11.1, 11.2, 11.3_

- [x] 18. Implement accessibility and performance optimizations
  - Add lazy loading to project images
  - Verify reduced motion preference disables animations
  - Test keyboard navigation for all interactive elements
  - Ensure semantic HTML and proper heading hierarchy
  - Add will-change CSS property for animated elements
  - _Requirements: 12.1, 12.2, 13.1, 13.3_
