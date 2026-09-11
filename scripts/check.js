#!/usr/bin/env node
'use strict'
/**
 * The advisory contract, as code. README.md says it in prose; TEMPLATE.md is
 * the file it describes. `npm run check` runs this over advisories/, and so
 * does CI on every pull request, so master only ever holds files that parse.
 */

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const DIR = path.join(ROOT, 'advisories')
const MAX_BYTES = 8 * 1024
const SECTIONS = ['Symptom', 'Affects', 'Cause', 'Remedy', 'Do not', 'Notes', 'Sources']
const REQUIRED = ['Symptom', 'Affects', 'Remedy']
const FILE = /^[1-9]\d*\.md$/
const SOURCE = /^https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/(issues|pull)\/\d+$/

const placeholders = fs
  .readFileSync(path.join(ROOT, 'TEMPLATE.md'), 'utf8')
  .match(/<[^<>\n]+>/g)

/** Parse one advisory. Returns { title, sections } or throws with every problem found. */
function parse(text, bytes) {
  const errors = []
  const lines = text.replace(/\r\n/g, '\n').split('\n')

  if (bytes > MAX_BYTES) errors.push(`${bytes} bytes; the limit is ${MAX_BYTES}`)
  for (const p of placeholders) {
    if (text.includes(p)) errors.push(`placeholder left in: ${p}`)
  }

  const title = /^# (\S.*)$/.exec(lines[0] ?? '')?.[1]?.trim()
  if (!title) errors.push('line 1 must be the title, `# …`')

  const sections = new Map()
  let current = null
  let fenced = false
  let last = -1

  for (const [offset, line] of lines.slice(1).entries()) {
    const n = offset + 2
    if (/^(```|~~~)/.test(line)) fenced = !fenced
    if (fenced) {
      if (current) current.body.push(line)
      continue
    }
    const heading = /^(#+)(?:\s+(.*))?$/.exec(line)
    if (!heading) {
      if (current) current.body.push(line)
      else if (line.trim()) errors.push(`line ${n}: text before the first section`)
      continue
    }
    const [, hashes, name = ''] = heading
    const index = SECTIONS.indexOf(name.trim())
    if (hashes.length !== 2 || index === -1) {
      errors.push(`line ${n}: heading is not one of ## ${SECTIONS.join(' / ')}`)
      continue
    }
    if (sections.has(name.trim())) errors.push(`line ${n}: ## ${name.trim()} appears twice`)
    else if (index < last) errors.push(`line ${n}: ## ${name.trim()} is out of order`)
    last = Math.max(last, index)
    current = { body: [] }
    sections.set(name.trim(), current)
  }

  for (const name of REQUIRED) {
    if (!sections.has(name)) errors.push(`missing ## ${name}`)
  }
  for (const [name, { body }] of sections) {
    const content = body.join('\n').trim()
    if (!content) errors.push(`## ${name} is empty; delete it if there is nothing to say`)
    sections.set(name, content)
  }
  for (const line of (sections.get('Sources') ?? '').split('\n')) {
    if (line.trim() && !SOURCE.test(line.trim())) {
      errors.push(`## Sources: not a GitHub issue or pull request URL: ${line.trim()}`)
    }
  }

  if (errors.length > 0) throw new Error(errors.join('\n  '))
  return { title, sections: Object.fromEntries(sections) }
}

function check(files) {
  const failures = []
  for (const file of files) {
    const name = path.basename(file)
    if (!FILE.test(name)) {
      failures.push(`${name}: not <n>.md`)
      continue
    }
    try {
      const buffer = fs.readFileSync(file)
      parse(buffer.toString('utf8'), buffer.length)
    } catch (err) {
      failures.push(`${name}:\n  ${err.message}`)
    }
  }
  return failures
}

if (require.main === module) {
  const files =
    process.argv.length > 2
      ? process.argv.slice(2)
      : fs.existsSync(DIR)
        ? fs.readdirSync(DIR).map((f) => path.join(DIR, f))
        : []
  const failures = check(files)
  if (failures.length > 0) {
    console.error(failures.join('\n'))
    process.exit(1)
  }
  console.log(`${files.length} advisor${files.length === 1 ? 'y' : 'ies'} OK`)
}

module.exports = { parse, check, SECTIONS, REQUIRED, MAX_BYTES }
