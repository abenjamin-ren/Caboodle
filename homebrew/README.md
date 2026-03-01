# homebrew-caboodle (Maintenance Mode)

> **Note:** The primary installation method for Caboodle is now via **GitHub Packages**:
>
> ```bash
> npm install -g github:abenjamin-ren/Caboodle
> ```
>
> The Homebrew tap is kept for backwards compatibility but is no longer the recommended install path. Automatic formula updates via the release workflow have been removed.

This directory contains the files needed to set up the **Homebrew Tap** for Caboodle.

## One-Time Setup

Create a new **public** GitHub repository named `homebrew-caboodle` under the `abenjamin-ren` account:

```
https://github.com/abenjamin-ren/homebrew-caboodle
```

Then push the contents of this directory to that repo:

```bash
cd /path/to/Caboodle/homebrew
git init
git remote add origin git@github.com:abenjamin-ren/homebrew-caboodle.git
git add .
git commit -m "Initial Homebrew tap for Caboodle"
git branch -M main
git push -u origin main
```

## What's Included

```
homebrew-caboodle/
  Formula/caboodle.rb               <- The Homebrew formula
  .github/workflows/update.yml      <- Auto-updates the formula on new releases
  README.md                         <- This file
```

## How It Works

1. A user runs `brew install abenjamin-ren/caboodle/caboodle`
2. Homebrew clones `abenjamin-ren/homebrew-caboodle` as a tap
3. Homebrew reads `Formula/caboodle.rb` to know how to install Caboodle
4. The formula downloads the release tarball, installs files, and links the `caboodle` command

## Automatic Updates

When you push a new version tag (e.g., `v1.1.0`) to the main Caboodle repo:

1. The release workflow in Caboodle dispatches an event to this tap repo
2. The `update.yml` workflow here receives the event with the new URL and SHA256
3. It updates `Formula/caboodle.rb` and commits the change

For this to work, you need to:
1. Create a GitHub Personal Access Token with `repo` scope
2. Add it as a secret named `TAP_GITHUB_TOKEN` in the main Caboodle repo settings

## Manual Formula Update

If you need to update the formula manually:

1. Create a new release tag in the main Caboodle repo
2. Download the tarball and compute the SHA256:
   ```bash
   curl -sL https://github.com/abenjamin-ren/Caboodle/archive/refs/tags/v1.0.0.tar.gz | shasum -a 256
   ```
3. Update the `url` and `sha256` fields in `Formula/caboodle.rb`
4. Commit and push to this repo

## Testing

```bash
# Install from the tap
brew tap abenjamin-ren/caboodle
brew install caboodle

# Or install directly (auto-taps)
brew install abenjamin-ren/caboodle/caboodle

# Install from HEAD (latest main branch, no release needed)
brew install --HEAD abenjamin-ren/caboodle/caboodle

# Verify
caboodle --version

# Uninstall
brew uninstall caboodle
brew untap abenjamin-ren/caboodle
```
