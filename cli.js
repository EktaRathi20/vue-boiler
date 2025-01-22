#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the project name from the command line arguments
const projectName = process.argv[2] || 'new-vue-project';
const projectPath = path.resolve(process.cwd(), projectName); // Resolve the target project path

console.log(`Creating project at ${projectPath}...`);

try {
  // Get the directory of the current file (ESM-friendly)
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Source directory is the directory containing `cli.js`
  const sourceDir = __dirname;

  console.log('Source directory:', sourceDir); // Debug log to check the resolved source directory

  // Copy the contents of the current directory to the target directory
  fs.copySync(sourceDir, projectPath, {
    filter: (src) => {
      const excludedFiles = [
        'node_modules',
        'cli.js',
        '.git',
        '.npmignore',
        '.github',
      ];

      // Check if the source path matches any of the excluded patterns
      return !excludedFiles.some((excluded) => src.includes(path.join(sourceDir, excluded)));
    },
  });

  console.log('Project created successfully!');
  console.log(`Navigate to your project: cd ${projectName}`);
} catch (err) {
  console.error('Error:', err.message);
}
