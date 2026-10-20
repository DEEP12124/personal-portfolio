# Run in PowerShell from the extracted project root. Requires Git and GitHub CLI.
$ErrorActionPreference = 'Stop'
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'Install GitHub CLI from https://cli.github.com/ first.' }
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Install Git from https://git-scm.com/ first.' }
gh auth status
if ($LASTEXITCODE -ne 0) { gh auth login --web; if ($LASTEXITCODE -ne 0) { throw 'GitHub sign-in was not completed.' } }
$account = gh api user --jq .login
if ($account -ne 'DEEP12124') { throw "Signed in as $account. Switch to DEEP12124 before publishing this portfolio." }
if (Test-Path .git) { throw 'This folder already has a Git repository. Inspect it before creating another remote.' }
git init -b main
if ($LASTEXITCODE -ne 0) { throw 'Git initialization failed.' }
git add .
git diff --cached --name-only | Select-String '(^|/)\.env($|\.(?!example$))' | ForEach-Object { throw 'A sensitive environment file is staged. Remove it before publishing.' }
git commit -m 'Build animated React portfolio with Express and MongoDB contact API'
if ($LASTEXITCODE -ne 0) { throw 'Commit failed. Configure your Git name and email, then retry manually.' }
gh repo create DEEP12124/dipanshu-mern-portfolio --public --source . --remote origin --push --description 'Animated personal MERN portfolio with project demos and backend CV downloads'
if ($LASTEXITCODE -ne 0) { throw 'Repository creation failed. Check GitHub output; do not overwrite any existing repository.' }
