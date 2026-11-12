'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import { AlertCircle, ArrowRight, FileSearch, FileText, LoaderCircle, ShieldCheck, Upload } from 'lucide-react'

export function LiveDocumentAnalyzer() {
  const [file, setFile] = useState<File | null>(null)
  const [consented, setConsented] = useState(false)
  const [analysis, setAnalysis] = useState('')
  const [error, setError] = useState('')
  const [billingRequired, setBillingRequired] = useState(false)
  const [pending, setPending] = useState(false)

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null
    setFile(selected)
    setAnalysis('')
    setError('')
    setBillingRequired(false)
  }

  async function analyzeDocument(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!file || !consented || pending) return

    setPending(true)
    setError('')
    setBillingRequired(false)
    setAnalysis('')
    const formData = new FormData()
    formData.set('file', file)

    try {
      const response = await fetch('/api/document-analyzer', { method: 'POST', body: formData })
      const result = await response.json()
      if (!response.ok) {
        setError(result.error || 'The document could not be analyzed.')
        setBillingRequired(result.code === 'gateway_billing_required')
        return
      }
      setAnalysis(result.analysis)
    } catch {
      setError('The document could not be processed. Check its format and try again.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="document-layout">
      <section className="surface document-main min-w-0">
        <div className="doc-stepper"><span className="step-active"><i>1</i> Select a document</span><span /><span><i>2</i> AI review</span><span /><span><i>3</i> Review findings</span></div>
        <h2>Review a document with AI</h2>
        <p>Extract text from a text-based PDF, DOCX, or TXT file and get a structured, general-information summary. Scanned PDFs and image-only files are not supported.</p>
        <form onSubmit={analyzeDocument} className="flex flex-col gap-4">
          <label className="upload-area" htmlFor="legal-document">
            <input id="legal-document" type="file" accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" onChange={selectFile} aria-describedby="document-types" />
            <span className="upload-icon"><Upload size={20} /></span>
            <b>{file ? file.name : 'Choose a document to analyze'}</b>
            <small>{file ? `${(file.size / 1024 / 1024).toFixed(2)} MB · processed for this request only` : 'PDF, DOCX, or TXT · up to 8 MB'}</small>
            <span className="button button-outline"><FileSearch size={14} /> Browse files</span>
          </label>
          <div className="privacy-banner"><ShieldCheck size={18} /><div><b>Important privacy note</b><p>The selected file is uploaded to this app server for text extraction. Extracted text is sent to Vercel AI Gateway for analysis and is not saved as a case or retained by this app.</p></div></div>
          <label className="flex items-start gap-2 text-sm leading-5 text-muted-foreground"><input className="mt-1 accent-primary" type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} /><span>I understand that document text will be sent to an AI service for processing. I have removed sensitive personal information where possible.</span></label>
          <button className="button button-primary self-start" disabled={!file || !consented || pending} type="submit">
            {pending ? <><LoaderCircle className="animate-spin" size={15} /> Reviewing…</> : <>Extract text and review <ArrowRight size={15} /></>}
          </button>
        </form>
        <p id="document-types" className="supported-types"><b>Supported formats</b><span><FileText size={13} /> PDF (text-based)</span><span><FileText size={13} /> DOCX</span><span><FileText size={13} /> TXT</span></p>
        {error && <div className="mt-4 flex items-start gap-2 text-sm text-destructive" role="alert"><AlertCircle size={16} /><div><p>{error}</p>{billingRequired && <a className="mt-2 inline-flex font-semibold underline" href="https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fai%3Fmodal%3Dadd-credit-card" target="_blank" rel="noreferrer">Open Vercel AI Gateway settings</a>}</div></div>}
        {analysis && <section className="document-result mt-5" aria-live="polite"><span className="workspace-icon icon-blue"><FileSearch size={17} /></span><h3>AI document summary</h3><p className="whitespace-pre-wrap break-words">{analysis}</p><small>This is an AI-generated summary, not legal advice. Check the original document and consult a qualified advocate for advice.</small></section>}
      </section>
      <aside className="surface source-note"><span className="source-note-icon"><ShieldCheck size={19} /></span><h3>Document handling</h3><p>Files are processed only when you submit with the consent box checked. This preview does not save documents or extracted text.</p><div className="source-note-row"><AlertCircle size={14} /> No OCR for scanned pages</div><div className="source-note-row"><AlertCircle size={14} /> No case storage or account isolation</div></aside>
    </div>
  )
}
