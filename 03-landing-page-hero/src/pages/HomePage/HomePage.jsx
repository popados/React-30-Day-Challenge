import { HowItWorksSection } from '@/features/tempest/HowItWorksSection'
import { ProofStrip } from '@/features/tempest/ProofStrip'
import { SkinBar } from '@/features/tempest/SkinBar'
import { StartBand } from '@/features/tempest/StartBand'
import { TempestHeader } from '@/features/tempest/TempestHeader'
import { TempestHero } from '@/features/tempest/TempestHero'
import { useSkin } from '@/features/tempest/useSkin'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** The Tempest Line landing page, following second-tempest-lines.html. */
export function HomePage() {
  useDocumentTitle()
  const [skin, setSkin] = useSkin()

  return (
    <div id="top" data-skin={skin} className="@container min-h-screen bg-bg font-sans text-ink">
      <SkinBar skin={skin} onSkinChange={setSkin} />
      <TempestHeader />
      <main>
        <TempestHero />
        <ProofStrip />
        <HowItWorksSection />
        <StartBand />
      </main>
      <div aria-hidden="true" className="h-28" />
    </div>
  )
}
