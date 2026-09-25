import { profileSteps } from '../data/profileOptions'

export default function ProfileStepper({ activeStep = 1 }) {
  return (
    <nav className="profile-stepper" aria-label="Profile completion steps">
      {profileSteps.map((step, index) => {
        const number = index + 1
        return (
          <div className={number === activeStep ? 'active' : number < activeStep ? 'complete' : ''} key={step} aria-current={number === activeStep ? 'step' : undefined}>
            <span>{number}</span><strong>{step}</strong>{index < profileSteps.length - 1 && <i />}
          </div>
        )
      })}
    </nav>
  )
}
