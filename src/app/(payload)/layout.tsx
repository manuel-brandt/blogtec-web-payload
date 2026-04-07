import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import config from '@payload-config'
import { importMap } from './admin/importMap.js'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={handleServerFunctions}>
      {children}
    </RootLayout>
  )
}
