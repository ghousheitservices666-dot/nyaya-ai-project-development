'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, BookOpen, LoaderCircle, LockKeyhole, Scale, Sparkles } from 'lucide-react'

type Source = { title: string; section: string; summary: string; url: string }

export function LiveConsultation() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [sources, setSources] = useState<Source[]>([])
  const [error, setError] = useState('')
  const [billingRequired, setBillingRequired] = useState(false)
  const [pending, setPending] = useState(false)

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedQuestion = question.trim()
    if (!trimmedQuestion || pending) return

    setPending(true)
    setError('')
    setBillingRequired(false)
    setAnswer('')
    setSources([])

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmedQuestion }),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'The consultation could not be completed.')
        setBillingRequired(result.code === 'gateway_billing_required')
        return
      }
      setAnswer(result.answer)
      setSources(result.sources)
    } catch {
      setError('The live assistant is unavailable right now. Please try again shortly.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="consult-layout">
      <section className="surface consult-main min-w-0">
        <div className="consult-top">
          <div>
            <span className="live-tag"><span /> LIVE AI · GROUNDED IN SAMPLE REFERENCES</span>
            <h2>What would you like to understand?</h2>
            <p>Describe the situation without names, account numbers, or identifying details.</p>
          </div>
          <span className="workspace-icon icon-blue"><Scale size={18} /></span>
        </div>
        <div className="demo-prompt">
          <div className="demo-avatar"><Sparkles size={16} /></div>
          <div><b>Start with the facts</b><p>The assistant can help organize your question and point to matching sample references. It is not legal advice.</p></div>
        </div>
        <form onSubmit={submitQuestion} className="flex flex-col gap-3">
          <label htmlFor="live-question" className="sr-only">Describe your legal question</label>
          <textarea id="live-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Tell us what happened…" rows={5} maxLength={5000} aria-describedby="question-privacy" />
          <div className="composer-bottom flex-wrap">
            <span id="question-privacy"><LockKeyhole size={13} /> Request is processed by AI and not saved to a case.</span>
            <button className="button button-primary" disabled={!question.trim() || pending} type="submit">
              {pending ? <><LoaderCircle className="animate-spin" size={15} /> Thinking…</> : <>Review my situation <ArrowRight size={15} /></>}
            </button>
          </div>
        </form>
        <div className="prompt-suggestions flex-wrap">
          <span>Try a scenario</span>
          {['My landlord has not returned my rental security deposit.', 'I paid for a service that was never delivered.', 'There is an online transaction I do not recognize.'].map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => { setQuestion(suggestion); setError(''); setBillingRequired(false); setAnswer('') }}>{suggestion.split(' ').slice(0, 2).join(' ')}</button>
          ))}
        </div>
        {error && <div className="text-sm text-destructive" role="alert"><p>{error}</p>{billingRequired && <a className="mt-2 inline-flex font-semibold underline" href="https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card" target="_blank" rel="noreferrer">Open Vercel AI Gateway settings</a>}</div>}
        {answer && (
          <section className="conversation-result" aria-live="polite" aria-label="AI response">
            <div className="question-bubble"><span className="avatar avatar-small">You</span><p>{question}</p></div>
            <div className="ai-response"><span className="ai-mark"><Scale size={17} /></span><div className="min-w-0"><b>NYAYA AI · informational response</b><p className="whitespace-pre-wrap break-words">{answer}</p></div></div>
            <div className="source-box">
              <div className="source-box-heading"><BookOpen size={15} /><b>References considered</b><span className="label-pill">Sample corpus</span></div>
              {sources.length ? sources.map((source) => <div key={`${source.title}-${source.section}`} className="mt-3 border-t border-border pt-3"><b className="text-sm">{source.title} · {source.section}</b><p>{source.summary}</p><a href={source.url} target="_blank" rel="noreferrer">Check the official India Code repository <ArrowRight size={13} /></a></div>) : <p>No matching sample source was found. Verify the relevant law in an authoritative source before relying on any general information.</p>}
              <small>The corpus contains three illustrative summaries, not full statutory text or live legal updates.</small>
            </div>
          </section>
        )}
      </section>
      <aside className="surface source-note"><span className="source-note-icon"><BookOpen size={19} /></span><h3>What this assistant can use</h3><p>Only three sample legal summaries are currently available. It does not search a connected or complete legal corpus.</p><div className="source-note-row"><LockKeyhole size={14} /> Not saved to a case</div><div className="source-note-row"><Sparkles size={14} /> AI-generated; verify independently</div></aside>
    </div>
  )
}
