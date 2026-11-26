import { MotionConfig } from 'framer-motion'
import useTheme from './hooks/useTheme'
import { ContentProvider, useContent } from './ContentContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import WhatIDo from './components/WhatIDo'
import Projects from './components/Projects'
import Certificates from './components/Certificates'
import Education from './components/Education'
import GitHubSection from './components/GitHubSection'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Site() {
  const [theme, toggleTheme] = useTheme()
  const { settings } = useContent()
  const show = (k) => settings.visibility[k] !== false
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      {settings.announcement && <p role="status" className="bg-accent px-4 py-2 text-center text-sm text-white">{settings.announcement}</p>}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        {show('about') && <About />}
        {show('skills') && <Skills />}
        {show('services') && <WhatIDo />}
        {show('projects') && <Projects />}
        {show('certificates') && <Certificates />}
        {show('education') && <Education />}
        {show('github') && <GitHubSection />}
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return <MotionConfig reducedMotion="user"><ContentProvider><Site /></ContentProvider></MotionConfig>
}
