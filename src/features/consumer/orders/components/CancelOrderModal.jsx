import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LoaderCircle, X } from 'lucide-react'
import { useCancelOrder } from '../hooks/useCancelOrder'
import '../cancel-order-modal.css'

export default function CancelOrderModal({ open, orderId, onClose, onSuccess }) {
  const [reasonCode, setReasonCode] = useState('')
  const [comment, setComment] = useState('')
  const [validation, setValidation] = useState('')
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocus = useRef(null)
  const { options, loading, submitting, error, setError, submit } = useCancelOrder(orderId, open)
  const close = useCallback(() => { setReasonCode(''); setComment(''); setValidation(''); setError(''); onClose() }, [onClose, setError])

  useEffect(() => {
    if (!open) return undefined
    previousFocus.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0)
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !submitting) close()
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button:not(:disabled), select:not(:disabled), textarea:not(:disabled), [href]')
      if (!focusable?.length) return
      const first = focusable[0]; const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { window.clearTimeout(focusTimer); document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); previousFocus.current?.focus?.() }
  }, [open, submitting, close])
  if (!open) return null

  const selected = options?.reasonOptions.find((reason) => reason.code === reasonCode)
  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!reasonCode) { setValidation('Please select a reason for cancellation.'); return }
    if (selected?.commentRequired && !comment.trim()) { setValidation('Please tell us why you need to cancel this order.'); return }
    setValidation('')
    try { const result = await submit({ reasonCode, comment }); onSuccess(result) } catch { /* API error remains visible in the dialog. */ }
  }

  return createPortal(<div className="cancel-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !submitting) close() }}><section ref={dialogRef} className="cancel-modal" role="dialog" aria-modal="true" aria-labelledby="cancel-order-title" aria-describedby="cancel-order-description">
    <header><h2 id="cancel-order-title">Cancel Order</h2><button ref={closeRef} type="button" onClick={close} disabled={submitting} aria-label="Close cancellation dialog"><X /></button></header>
    <p id="cancel-order-description">Are you sure you want to cancel this order?<br /><span>Please select a reason for cancellation.</span></p>
    {loading ? <div className="cancel-modal-loading"><LoaderCircle />Loading cancellation options...</div> : options?.canCancel ? <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="cancellation-reason">Reason for Cancellation <b>*</b></label>
      <select id="cancellation-reason" value={reasonCode} onChange={(event) => { setReasonCode(event.target.value); setValidation('') }} aria-invalid={Boolean(validation && !reasonCode)}><option value="">Select a reason</option>{options.reasonOptions.map((reason) => <option value={reason.code} key={reason.code}>{reason.label}</option>)}</select>
      <label htmlFor="cancellation-comment">Additional Comments {selected?.commentRequired ? <b>*</b> : <span>(Optional)</span>}</label>
      <textarea id="cancellation-comment" value={comment} onChange={(event) => { setComment(event.target.value.slice(0, 300)); setValidation('') }} maxLength="300" rows="4" placeholder="Tell us more about the reason..." aria-invalid={Boolean(validation && selected?.commentRequired && !comment.trim())} />
      <output className="cancel-character-count" htmlFor="cancellation-comment">{comment.length}/300</output>
      {(validation || error) && <p className="cancel-modal-error" role="alert">{validation || error}</p>}
      <footer><button type="button" onClick={close} disabled={submitting}>Keep Order</button><button type="submit" disabled={submitting}>{submitting && <LoaderCircle />} {submitting ? 'Cancelling...' : 'Cancel Order'}</button></footer>
    </form> : <div className="cancel-ineligible"><p role="alert">{error || options?.unavailableReason || 'This order cannot be cancelled.'}</p><button type="button" onClick={close}>Return to Order</button></div>}
  </section></div>, document.body)
}
