import { MotionConfig } from 'framer-motion'
import useTheme from './hooks/useTheme'
import { ContentProvider, useContent } from './context/ContentContext'
import ScrollProgress from './components/layout/ScrollProgress'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Services from './components/sections/Services'
import Projects from './components/sections/Projects'
import Certificates from './components/sections/Certificates'
import Education from './components/sections/Education'
import GitHubSection from './components/sections/GitHubSection'
import Contact from './components/sections/Contact'

function Site() {
  const [theme, onToggleTheme] = useTheme()
  const { settings } = useContent()
  const isVisible = (key) => settings.visibility[key] !== false

  return (
    <>
      <ScrollProgress />  
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      {settings.announcement && (
        <div className="pt-16">
          <p role="status" className="bg-accent px-4 py-2 text-center text-sm text-white">
            {settings.announcement}
          </p>
        </div>
      )}

      <Navbar theme={theme} onToggleTheme={onToggleTheme} />

      <main id="main">
        <Hero />
        {isVisible('about') && <About />}
        {isVisible('skills') && <Skills />}
        {isVisible('services') && <Services />}
        {isVisible('projects') && <Projects />}
        {isVisible('certificates') && <Certificates />}
        {isVisible('education') && <Education />}
        {isVisible('github') && <GitHubSection />}
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ContentProvider>
        <Site />
      </ContentProvider>
    </MotionConfig>
  )
}
