import { WorkspaceApp } from '@/components/workspace-app'

export function generateStaticParams() {
  return ['dashboard','consultation','issue-detector','law-explorer','prove-it','risk-center','lawyer-assistance','document-analyzer','challenge','privacy','demo','my-cases','admin'].map((section) => ({section}))
}

export default async function SectionPage({ params }: { params: Promise<{section: string}> }) {
  const { section } = await params
  return <WorkspaceApp section={section} />
}
