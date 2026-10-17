import { CtaBand } from '@/features/landing/CtaBand'
import { Hero } from '@/features/landing/Hero'
import { HowItWorks } from '@/features/landing/HowItWorks'
import { ProofSidebar } from '@/features/landing/ProofSidebar'
import { SiteHeader } from '@/features/landing/SiteHeader'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function HomePage() {
  useDocumentTitle('Meetings in, action items out')

  return (
    <div className="min-h-screen pb-24">
      <SiteHeader />
      <main>
        <Hero />
        <div className="mx-auto grid max-w-page gap-8 px-4 py-16 md:px-6 md:py-20 lg:grid-cols-[1fr_300px]">
          <HowItWorks />
          <ProofSidebar />
        </div>
        <CtaBand />
      </main>
    </div>
  )
}
