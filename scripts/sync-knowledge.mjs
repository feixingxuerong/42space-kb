import fs from 'fs'
import path from 'path'

const sourceDir = path.join(process.cwd(), '../42space-task/knowledge')
const targetDir = path.join(process.cwd(), 'content/knowledge')

function syncKnowledge() {
  console.log('Syncing knowledge from 42space-task/knowledge...')
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`)
    process.exit(1)
  }

  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
  }

  // Copy all files from source to target
  const entries = fs.readdirSync(sourceDir, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(sourceDir, entry.name)
    const destPath = path.join(targetDir, entry.name)
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true })
      }
      copyDirectory(srcPath, destPath)
    } else if (entry.name.match(/\.mdx?$/)) {
      fs.copyFileSync(srcPath, destPath)
      console.log(`Copied: ${entry.name}`)
    }
  }

  console.log('Sync complete!')
}

function copyDirectory(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true })
      }
      copyDirectory(srcPath, destPath)
    } else if (entry.name.match(/\.mdx?$/)) {
      fs.copyFileSync(srcPath, destPath)
      console.log(`Copied: ${entry.name}`)
    }
  }
}

syncKnowledge()
