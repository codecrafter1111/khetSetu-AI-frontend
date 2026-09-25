import { useEffect, useState } from 'react'
import { getFarmPassport } from '../../../services/consumer/farmPassportService'
import { CertificationsTrust, FarmerInformation, FarmLocation, FarmPassportHeader, LabReportDialog, PassportFeatures, PassportProductCard, PassportQRCard, ProductJourney, QualityLabStatus } from '../components/farm-passport/PassportSections'

export default function ConsumerFarmPassport() {
  const passport = getFarmPassport()
  const [reportOpen, setReportOpen] = useState(false)
  useEffect(() => {
    if (!reportOpen) return undefined
    const close = event => { if (event.key === 'Escape') setReportOpen(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [reportOpen])

  return <div className="min-h-[calc(100vh-72px)] bg-[#f5fbfd]"><FarmPassportHeader /><div className="space-y-3 px-3 pb-6 pt-3 sm:px-4">
    <div className="grid items-start gap-3 xl:grid-cols-[minmax(0,2.12fr)_minmax(0,.98fr)_minmax(0,.9fr)]">
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,2.12fr)_minmax(0,.98fr)] xl:col-span-2"><PassportProductCard product={passport.product} /><PassportQRCard product={passport.product} /></div>
      <PassportFeatures features={passport.features} />
      <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] xl:col-span-2"><FarmerInformation farm={passport.farm} /><FarmLocation farm={passport.farm} /></div>
    </div>
    <div className="grid items-stretch gap-3 lg:grid-cols-2 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,.9fr)]"><ProductJourney journey={passport.journey} /><QualityLabStatus quality={passport.quality} onViewReport={() => setReportOpen(true)} /><CertificationsTrust certifications={passport.certifications} /></div>
  </div>{reportOpen && <LabReportDialog product={passport.product} quality={passport.quality} onClose={() => setReportOpen(false)} />}</div>
}
