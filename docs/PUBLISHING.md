# Publishing Guide

Releases run entirely in GitHub Actions: nothing is versioned, tagged or published from a local
machine.

## Releasing a version

GitHub → **Actions** → **Release** → **Run workflow** on `main`, or
`github-check-and-run-release-workflow`, which waits for CI on `main` first.

- **Dry run** checked: runs typecheck and prettier, prints what
  [`pob-version`](https://github.com/christophehurpeau/pob/tree/main/@pob/version) would release,
  and checks the Marketplace (Entra ID) and Open VSX credentials.
- **Dry run** unchecked: releases.
- **Bump** overrides the computed bump type (`pob-version --force`); keep `auto` to follow the
  commits.

[`.github/workflows/release.yml`](../.github/workflows/release.yml) has two jobs:

1. **version**: `pob-version --create-release=github` computes the bump from the conventional
   commits since the last `v*` tag, prepends the section to `CHANGELOG.md`, bumps `package.json`,
   commits `chore: release X.Y.Z [skip ci]`, tags `vX.Y.Z`, pushes and creates the GitHub release.
2. **publish**: checks out the tag, builds the `.vsix`, publishes it to the VS Code Marketplace and
   Open VSX, and attaches it to the GitHub release.

The `.vsix` ships the committed `themes/*.json`: run `pnpm run generate` and commit the result
before releasing a change to `scripts/theme/`.

If **publish** fails, fix the cause and use **Re-run failed jobs**: it starts from the tag without
versioning again, and both registries skip a version they already have (`--skip-duplicate`).

## Repository setup

| Name              | Kind        | Purpose                                                                                 |
| ----------------- | ----------- | --------------------------------------------------------------------------------------- |
| `PUSH_DEPLOY_KEY` | secret      | private half of the read-write deploy key used to push the release commit and tag       |
| `OPEN_VSX_TOKEN`  | secret      | Open VSX access token (https://open-vsx.org/user-settings/tokens)                       |
| `AZURE_CLIENT_ID` | variable    | Entra app registration `vscode-marketplace-publish`, shared with the other `chrp` repos |
| `AZURE_TENANT_ID` | variable    | its tenant                                                                              |
| `marketplace`     | environment | **publish** and **check-auth** run in it; the Entra federated credential trusts it      |

Both rulesets on `main` must exempt deploy keys, otherwise the release push is rejected by the
required status checks.

### VS Code Marketplace (Entra ID, no token)

Azure DevOps PATs are not used: global PATs, the only kind the Marketplace accepts, stop working on
2026-12-01. `azure/login` signs in through GitHub OIDC and `vsce publish --azure-credential` uses
that session. The app's service principal is already a Contributor of the `chrp` publisher; a new
repo only needs a federated credential on the app (entity **Environment**, name `marketplace`) and
the two variables.

`ovsx` pulls `keytar` for local token storage; its native build is denied in
`pnpm-workspace.yaml` because CI passes the token through `OVSX_PAT`.
