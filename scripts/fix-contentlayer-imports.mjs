#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { glob } from 'glob'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { setTimeout } from 'timers/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

async function waitForContentlayerGeneration() {
  const contentlayerDir = join(projectRoot, '.contentlayer/generated')
  const maxWaitTime = 30000 // 30 seconds
  const checkInterval = 500 // 0.5 seconds

  let elapsedTime = 0

  while (elapsedTime < maxWaitTime) {
    if (existsSync(contentlayerDir)) {
      // Wait a bit more to ensure files are fully written
      await setTimeout(1000)
      return true
    }

    await setTimeout(checkInterval)
    elapsedTime += checkInterval
  }

  return false
}

async function fixContentlayerImports() {
  console.log('🔧 Waiting for Contentlayer to generate files...')

  const contentlayerReady = await waitForContentlayerGeneration()
  if (!contentlayerReady) {
    console.log('⚠️  Contentlayer files not found, continuing...')
    return
  }

  console.log('🔧 Fixing Contentlayer import assertions...')

  try {
    // Find all .mjs files in .contentlayer/generated
    const pattern = join(projectRoot, '.contentlayer/generated/**/*.mjs')
    const files = await glob(pattern)

    let filesFixed = 0

    for (const file of files) {
      if (!existsSync(file)) continue

      const content = readFileSync(file, 'utf8')

      // Replace 'assert { type: 'json' }' with 'with { type: 'json' }'
      const fixedContent = content.replace(
        /assert\s*\{\s*type:\s*['"]json['"]\s*\}/g,
        "with { type: 'json' }"
      )

      if (fixedContent !== content) {
        writeFileSync(file, fixedContent, 'utf8')
        console.log(`✅ Fixed: ${file}`)
        filesFixed++
      }
    }

    if (filesFixed > 0) {
      console.log(`🎉 Successfully fixed ${filesFixed} file(s)`)
    } else {
      console.log('ℹ️  No files needed fixing')
    }
  } catch (error) {
    console.error('❌ Error fixing imports:', error)
    process.exit(1)
  }
}

fixContentlayerImports()
