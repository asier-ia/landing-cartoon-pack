import { SiteNavbar } from './components/SiteNavbar'
import { HeroSection } from './components/HeroSection'
import { MarqueeBanner } from './components/MarqueeBanner'
import { VotingSection } from './components/VotingSection'
import { SweepstakesSection } from './components/SweepstakesSection'
import { SiteFooter } from './components/SiteFooter'
import { LoadingScreen } from './components/LoadingScreen'

function App() {
  return (
    <>
      <LoadingScreen />
      <SiteNavbar />
      <main>
        <HeroSection />
        <div className="zigzag-divider" />
        <MarqueeBanner />
        <div className="zigzag-divider zigzag-divider--flip" />
        <VotingSection />
        <div className="zigzag-divider zigzag-divider--flip" />
        <SweepstakesSection />
      </main>
      <div className="zigzag-divider zigzag-divider--footer" />
      <SiteFooter />
    </>
  )
}

export default App
