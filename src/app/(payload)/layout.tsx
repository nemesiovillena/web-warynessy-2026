/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import configPromise from '@payload-config'
import '@payloadcms/next/css'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import type { Metadata } from 'next'
import { importMap } from './admin/importMap.js'

import './custom.css'

export const metadata: Metadata = {
    description: 'Payload CMS Admin Dashboard',
    title: 'Warynessy Admin',
}

type Args = {
    children: React.ReactNode
}

async function serverFunction(args: any) {
    'use server'
    return handleServerFunctions({
        ...args,
        config: configPromise,
        importMap,
    })
}

const Layout = ({ children }: Args) => (
    <RootLayout config={configPromise} importMap={importMap} serverFunction={serverFunction}>
        {children}
    </RootLayout>
)

export default Layout
