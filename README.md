<!-- TITLE -->
<div align="center">
  <img src="./public/github-karma-banner.png" alt="GitHub Karma" />

  <p>
    Reddit-inspired, dynamically generated GitHub Karma cards for your profile README!
  </p>
  <p>
    Choose between two flavours - <b>Creator Karma</b> and <b>Contributor Karma</b> - to showcase both what you build and how you contribute across the GitHub community.
  </p>
</div>

<!-- HEADER BADGES -->
<p align="center">
  <a href="https://github.com/DAShaikh10/GitHub-Karma/actions/workflows/test-coverage.yml">
    <img alt="Tests" src="https://img.shields.io/github/actions/workflow/status/DAShaikh10/GitHub-Karma/test-coverage.yml?branch=main&label=tests&style=flat" />
  </a>
  <a href="https://github.com/DAShaikh10/GitHub-Karma/graphs/contributors?color=pink">
    <img alt="Contributors" src="https://img.shields.io/github/contributors/DAShaikh10/GitHub-Karma?color=pink" />
  </a>
  <a href="https://coveragerobot.com">
    <img alt="Coverage" src="https://api.coveragerobot.com/v1/graph/github/DAShaikh10/GitHub-Karma/badge.svg" />
  </a>
  <a href="https://github.com/DAShaikh10/GitHub-Karma/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/DAShaikh10/GitHub-Karma?color=white" />
  </a>
  <a href="https://github.com/DAShaikh10/GitHub-Karma/pulls">
    <img alt="Pull Requests" src="https://img.shields.io/github/issues-pr/DAShaikh10/GitHub-Karma?color=cyan" />
  </a>
  <a href="https://visitor-badge.laobi.icu/badge?page_id=DAShaikh10.GitHub-Karma">
    <img alt="Visitors" src="https://visitor-badge.laobi.icu/badge?page_id=DAShaikh10.GitHub-Karma" />
  </a>
  <a href="https://img.shields.io/github/license/DAShaikh10/GitHub-Karma?style=flat&cacheSeconds=25092000&color=gold">
    <img alt="license" src="https://img.shields.io/github/license/DAShaikh10/GitHub-Karma?style=flat&cacheSeconds=25092000&color=gold">
  </a>
</p>

<!-- DEMO & COMMUNITY INTERACTIONS -->
<p align="center">
  <a href="https://github-karma.vercel.app/api/karma/creator?username=dashaikh10">View Demo</a>
  ·
  <a href="https://github.com/DAShaikh10/GitHub-Karma/issues/new?labels=bug">Report Bug</a>
  ·
  <a href="https://github.com/DAShaikh10/GitHub-Karma/issues/new?labels=enhancement">Request Feature</a>
  ·
  <a href="https://github.com/DAShaikh10/GitHub-Karma/discussions">Ask Question</a>
</p>

<!-- QUICK LIVE PREVIEW -->
<p align="center"><b>Live Preview</b></p>
<p align="center">
  <a href="https://github.com/DAShaikh10/GitHub-Karma">
    <img height="175" align="center" src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10" alt="Creator Karma Demo" />
  </a>
  <a href="https://github.com/DAShaikh10/GitHub-Karma">
    <img height="175" align="center" src="http://github-karma.vercel.app/api/karma/contributor?username=dashaikh10" alt="Contributor Karma Demo" />
  </a>
</p>

<p align="center">
  <a href="https://vercel.com?utm_source=github&utm_campaign=oss">
    <img src="./public/powered-by-vercel.svg" alt="Powered by Vercel" />
  </a>
</p>

<details>
  <summary>Table of contents (Click to show)</summary>

- [Important Notices](#important-notices)
- [GitHub Creator Karma Card](#github-creator-karma-card)
  - [Usage](#usage)
  - [Options](#options)
  - [Themes](#themes)
    - [Theme Preview](#theme-preview)
- [GitHub Contributor Karma Card](#github-contributor-karma-card)
  - [Usage](#usage-1)
  - [Options](#options-1)
  - [Themes](#themes-1)
  - [Profile README Example](#profile-readme-example)
- [Deploy on your own (recommended)](#deploy-on-your-own-recommended)
  - [Self-hosted (Vercel/Other)](#self-hosted-vercelother)
    - [First step: get your Personal Access Token (PAT)](#first-step-get-your-personal-access-token-pat)
    - [On Vercel](#on-vercel)
    - [On other platforms](#on-other-platforms)
    - [Available environment variables](#available-environment-variables)
- [Development](#development)
- [Support the project](#support-the-project)
- [License](#license)

</details>

# Important Notices

> [!IMPORTANT] This project uses caching headers to reduce rate-limit pressure. Data is not real-time by design.
> Currently, the Karma cards are cached for **2** hours before regeneration.

> [!NOTE] By default, data visibility depends on the permissions of your GitHub token. If you want private-repo-aware
> metrics, deploy your own instance with a properly scoped token.

# GitHub Creator Karma Card

The creator karma measures repository impact from stars and forks you have earned on your personal repositories, then
maps the score to rank tiers.

## Usage

Copy and paste this into your markdown, then replace `username`:

```md
[![Creator Karma](http://github-karma.vercel.app/api/karma/creator?username=dashaikh10)](https://github.com/DAShaikh10/GitHub-Karma)
```

## Options

Endpoint: `/api/karma/creator?username=<GITHUB_USERNAME>&theme=<THEME_NAME>`

| Name       | Description                                                                                          | Type   | Default value |
| ---------- | ---------------------------------------------------------------------------------------------------- | ------ | ------------- |
| `username` | GitHub username to evaluate. Must be 1-39 chars, alphanumeric or `-`, and cannot start/end with `-`. | string | required      |
| `theme`    | Card theme name. Supports all built-in themes configured in this project.                            | enum   | `default`     |

The card returns `image/svg+xml` and can return error cards with HTTP status `400`, `404`, `429`, or `500`.

## Themes

Use `&theme=THEME_NAME`:

```md
![Creator Karma](http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=radical)
```

This project includes a large set of built-in themes (including `transparent`) adapted from
@[AnuragHazra](https://github.com/anuraghazra)'s
[GitHub-Readme-Stats](https://github.com/anuraghazra/github-readme-stats). Theme definitions live in
`src/lib/card/constants.ts`.

### Theme Preview

Use the live URL format below to test any theme quickly:

```text
http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=<THEME_NAME>
```

<details>
  <summary><b>Click to expand full theme preview table</b></summary>

<table align="center">
  <tbody>
    <tr>
      <td align="center"><b>algolia</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=algolia" alt="algolia" width="360" /></td>
      <td align="center"><b>ambient-gradient</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=ambient-gradient" alt="ambient-gradient" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>apprentice</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=apprentice" alt="apprentice" width="360" /></td>
      <td align="center"><b>aura</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=aura" alt="aura" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>aura-dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=aura-dark" alt="aura-dark" width="360" /></td>
      <td align="center"><b>ayu-mirage</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=ayu-mirage" alt="ayu-mirage" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>bear</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=bear" alt="bear" width="360" /></td>
      <td align="center"><b>blue-green</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=blue-green" alt="blue-green" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>blue-navy</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=blue-navy" alt="blue-navy" width="360" /></td>
      <td align="center"><b>blueberry</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=blueberry" alt="blueberry" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>buefy</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=buefy" alt="buefy" width="360" /></td>
      <td align="center"><b>calm</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=calm" alt="calm" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>calm-pink</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=calm-pink" alt="calm-pink" width="360" /></td>
      <td align="center"><b>catppuccin-latte</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=catppuccin-latte" alt="catppuccin-latte" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>catppuccin-mocha</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=catppuccin-mocha" alt="catppuccin-mocha" width="360" /></td>
      <td align="center"><b>chartreuse-dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=chartreuse-dark" alt="chartreuse-dark" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>city-lights</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=city-lights" alt="city-lights" width="360" /></td>
      <td align="center"><b>cobalt</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=cobalt" alt="cobalt" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>cobalt2</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=cobalt2" alt="cobalt2" width="360" /></td>
      <td align="center"><b>codeSTACKr</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=codeSTACKr" alt="codeSTACKr" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>darcula</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=darcula" alt="darcula" width="360" /></td>
      <td align="center"><b>dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=dark" alt="dark" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>date-night</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=date-night" alt="date-night" width="360" /></td>
      <td align="center"><b>default</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=default" alt="default" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>discord-old-blurple</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=discord-old-blurple" alt="discord-old-blurple" width="360" /></td>
      <td align="center"><b>dracula</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=dracula" alt="dracula" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>flag-india</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=flag-india" alt="flag-india" width="360" /></td>
      <td align="center"><b>github-dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=github-dark" alt="github-dark" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>github-dark-dimmed</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=github-dark-dimmed" alt="github-dark-dimmed" width="360" /></td>
      <td align="center"><b>gotham</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=gotham" alt="gotham" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>graywhite</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=graywhite" alt="graywhite" width="360" /></td>
      <td align="center"><b>great-gatsby</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=great-gatsby" alt="great-gatsby" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>gruvbox</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=gruvbox" alt="gruvbox" width="360" /></td>
      <td align="center"><b>gruvbox-light</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=gruvbox-light" alt="gruvbox-light" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>highcontrast</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=highcontrast" alt="highcontrast" width="360" /></td>
      <td align="center"><b>holi</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=holi" alt="holi" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>jolly</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=jolly" alt="jolly" width="360" /></td>
      <td align="center"><b>kacho-ga</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=kacho-ga" alt="kacho-ga" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>maroongold</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=maroongold" alt="maroongold" width="360" /></td>
      <td align="center"><b>material-palenight</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=material-palenight" alt="material-palenight" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>merko</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=merko" alt="merko" width="360" /></td>
      <td align="center"><b>midnight-purple</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=midnight-purple" alt="midnight-purple" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>moltack</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=moltack" alt="moltack" width="360" /></td>
      <td align="center"><b>monokai</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=monokai" alt="monokai" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>neon</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=neon" alt="neon" width="360" /></td>
      <td align="center"><b>nightowl</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=nightowl" alt="nightowl" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>noctis-minimus</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=noctis-minimus" alt="noctis-minimus" width="360" /></td>
      <td align="center"><b>nord</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=nord" alt="nord" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>ocean-dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=ocean-dark" alt="ocean-dark" width="360" /></td>
      <td align="center"><b>omni</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=omni" alt="omni" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>one-dark-pro</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=one-dark-pro" alt="one-dark-pro" width="360" /></td>
      <td align="center"><b>onedark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=onedark" alt="onedark" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>outrun</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=outrun" alt="outrun" width="360" /></td>
      <td align="center"><b>panda</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=panda" alt="panda" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>prussian</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=prussian" alt="prussian" width="360" /></td>
      <td align="center"><b>radical</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=radical" alt="radical" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>react</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=react" alt="react" width="360" /></td>
      <td align="center"><b>rose</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=rose" alt="rose" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>rose-pine</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=rose-pine" alt="rose-pine" width="360" /></td>
      <td align="center"><b>shades-of-purple</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=shades-of-purple" alt="shades-of-purple" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>shadow-blue</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=shadow-blue" alt="shadow-blue" width="360" /></td>
      <td align="center"><b>shadow-green</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=shadow-green" alt="shadow-green" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>shadow-red</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=shadow-red" alt="shadow-red" width="360" /></td>
      <td align="center"><b>slateorange</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=slateorange" alt="slateorange" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>solarized-dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=solarized-dark" alt="solarized-dark" width="360" /></td>
      <td align="center"><b>solarized-light</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=solarized-light" alt="solarized-light" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>swift</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=swift" alt="swift" width="360" /></td>
      <td align="center"><b>synthwave</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=synthwave" alt="synthwave" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>tokyonight</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=tokyonight" alt="tokyonight" width="360" /></td>
      <td align="center"><b>transparent</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=transparent" alt="transparent" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>vision-friendly-dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=vision-friendly-dark" alt="vision-friendly-dark" width="360" /></td>
      <td align="center"><b>vue</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=vue" alt="vue" width="360" /></td>
    </tr>
    <tr>
      <td align="center"><b>vue-dark</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=vue-dark" alt="vue-dark" width="360" /></td>
      <td align="center"><b>yeblu</b><br/><img src="http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=yeblu" alt="yeblu" width="360" /></td>
    </tr>
  </tbody>
</table>

</details>

### Responsive Card Theme

Use GitHub theme context tags for dark/light switching:

```md
[![Creator Karma Dark](http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=github-dark#gh-dark-mode-only)](https://github.com/DAShaikh10/GitHub-Karma#github-creator-karma-card)
[![Creator Karma Light](http://github-karma.vercel.app/api/karma/creator?username=dashaikh10&theme=default#gh-light-mode-only)](https://github.com/DAShaikh10/GitHub-Karma#github-creator-karma-card)
```

# GitHub Contributor Karma Card

The contributor card measures contribution activity (commits, pull requests, reviews, completed issues in other repos,
and accepted discussion answers).

## Usage

```md
[![Contributor Karma](http://github-karma.vercel.app/api/karma/contributor?username=dashaikh10)](https://github.com/DAShaikh10/GitHub-Karma)
```

## Options

Endpoint: `/api/karma/contributor?username=<GITHUB_USERNAME>&theme=<THEME_NAME>`

| Name       | Description                                                                                          | Type   | Default value |
| ---------- | ---------------------------------------------------------------------------------------------------- | ------ | ------------- |
| `username` | GitHub username to evaluate. Must be 1-39 chars, alphanumeric or `-`, and cannot start/end with `-`. | string | required      |
| `theme`    | Card theme name. Supports all built-in themes configured in this project.                            | enum   | `default`     |

## Themes

```md
![Contributor Karma](http://github-karma.vercel.app/api/karma/contributor?username=dashaikh10&theme=nightowl)
```

## Profile README Example

Copy and paste this into your profile README and replace `YOUR_USERNAME`:

```md
<a href="https://github.com/DAShaikh10/GitHub-Karma">
  <img align="center" src="http://github-karma.vercel.app/api/karma/creator?username=YOUR_USERNAME" />
</a>
<a href="https://github.com/DAShaikh10/GitHub-Karma">
  <img align="center" src="http://github-karma.vercel.app/api/karma/contributor?username=YOUR_USERNAME" />
</a>
```

# Deploy on your own (recommended)

Running your own instance avoids shared endpoint limits and gives you control over token scope and cache settings.

## Self-hosted (Vercel/Other)

### First step: get your Personal Access Token (PAT)

For self-hosting, create a GitHub token and set it as `GITHUB_PERSONAL_ACCESS_TOKEN`.

Classic token (simple setup):

1. Go to `Settings -> Developer settings -> Personal access tokens -> Tokens (classic)`.
2. Create a token.
3. Select scopes:
   - `read:user`
   - `repo` (required if you want private repository data)

Fine-grained token (more restrictive):

1. Go to `Settings -> Developer settings -> Personal access tokens -> Fine-grained tokens`.
2. Create a token for all repositories you want to include.
3. Grant read-only access to relevant repository/user data.

### On Vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/DAShaikh10/GitHub-Karma)

After import:

1. Set `GITHUB_PERSONAL_ACCESS_TOKEN` in Vercel environment variables.
2. Optionally tune cache and scoring variables.
3. Redeploy after changing environment variables.

### On other platforms

```bash
bun install
bun build
bun start
```

Set `GITHUB_PERSONAL_ACCESS_TOKEN` in your runtime environment before starting.

### Available environment variables

Core runtime:

| Name                                | Default                          | Description                                          |
| ----------------------------------- | -------------------------------- | ---------------------------------------------------- |
| `GITHUB_PERSONAL_ACCESS_TOKEN`      | none                             | GitHub token used for GraphQL requests.              |
| `GITHUB_GRAPHQL_API_URL`            | `https://api.github.com/graphql` | GraphQL endpoint URL.                                |
| `CACHE_REVALIDATE_SECONDS`          | `3600`                           | Next.js fetch revalidation for GitHub API responses. |
| `KARMA_CARD_CACHE_SECONDS`          | `7200`                           | `s-maxage` value for card responses.                 |
| `STALE_WHILE_REVALIDATION_SECONDS`  | `300`                            | `stale-while-revalidate` value for card responses.   |
| `GITHUB_RATELIMIT_HEADER`           | `x-ratelimit-limit`              | Header name used for total limit logging.            |
| `GITHUB_RATELIMIT_REMAINING_HEADER` | `x-ratelimit-remaining`          | Header name used for remaining quota logging.        |
| `GITHUB_RATELIMIT_RESET_HEADER`     | `x-ratelimit-reset`              | Header name used for reset time logging.             |

Creator scoring:

| Name                         | Default |
| ---------------------------- | ------- |
| `BEGINNER_STAR_THRESHOLD`    | `1`     |
| `BEGINNER_STAR_MULTIPLIER`   | `1`     |
| `FORK_ENGAGEMENT_MULTIPLIER` | `1`     |
| `STAR_PLATEAU_SCORE`         | `3200`  |
| `STAR_SATURATION_SCALE`      | `3500`  |
| `STAR_TAIL_SLOPE`            | `0.02`  |
| `FORK_PLATEAU_SCORE`         | `900`   |
| `FORK_SATURATION_SCALE`      | `1200`  |
| `FORK_TAIL_SLOPE`            | `0.008` |
| `FORK_CURVE_WEIGHT`          | `0.6`   |
| `HIGH_IMPACT_REPO_THRESHOLD` | `1`     |
| `HIGH_IMPACT_STARS`          | `1`     |
| `HIGH_IMPACT_FORKS`          | `1`     |
| `LEGEND_MULTIPLIER`          | `1`     |

Contributor scoring:

| Name                        | Default |
| --------------------------- | ------- |
| `COMMIT_WEIGHT`             | `1`     |
| `CONTRIBUTOR_PR_WEIGHT`     | `1`     |
| `CONTRIBUTOR_REVIEW_WEIGHT` | `1`     |
| `CONTRIBUTOR_ISSUE_WEIGHT`  | `1`     |
| `CONTRIBUTOR_ANSWER_WEIGHT` | `1`     |

# Development

```bash
bun install
bun dev
```

Other useful commands:

```bash
bun lint
bun format
bun test
bun test:coverage
bun build
bun start
```

# Support the project

If GitHub Karma helps you, consider:

- Starring and sharing the repository.
- Opening issues and pull requests to improve the project.

Inspired by GitHub Readme Stats: https://github.com/anuraghazra/github-readme-stats

# License

MIT
