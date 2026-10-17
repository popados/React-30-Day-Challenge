import { useState } from 'react'
import { ChangeList } from '@/features/tempest/ChangeList'
import { CHANGES } from '@/features/tempest/changes'
import { HowItWorksSection } from '@/features/tempest/HowItWorksSection'
import { ProofStrip } from '@/features/tempest/ProofStrip'
import { SkinBar } from '@/features/tempest/SkinBar'
import { StartBand } from '@/features/tempest/StartBand'
import { TempestHeader } from '@/features/tempest/TempestHeader'
import { TempestHero } from '@/features/tempest/TempestHero'
import { useSkin } from '@/features/tempest/useSkin'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

/** The Tempest Line landing page from tempest-landing-page.html, with its change list. */
export function TempestPage() {
  useDocumentTitle('Tempest Line')
  const [skin, setSkin] = useSkin()
  const [changesOpen, setChangesOpen] = useState(true)

  return (
    <div
      id="top"
      data-skin={skin}
      className={`min-h-screen bg-bg font-sans text-ink ${
        changesOpen ? 'xl:grid xl:grid-cols-[minmax(0,1fr)_380px]' : ''
      }`}
    >
      {/* Container queries let the page lay out by its own width, beside the list or not. */}
      <div className="@container min-w-0">
        <SkinBar
          skin={skin}
          onSkinChange={setSkin}
          changesOpen={changesOpen}
          onToggleChanges={() => setChangesOpen((open) => !open)}
          changeCount={CHANGES.length}
        />
        <TempestHeader />
        <main>
          <TempestHero />
          <ProofStrip />
          <HowItWorksSection />
          <StartBand />
        </main>
        <div aria-hidden="true" className="h-28" />
      </div>

      {changesOpen ? <ChangeList /> : null}
    </div>
  )
}
