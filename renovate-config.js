module.exports = {
    $schema: "https://docs.renovatebot.com/renovate-schema.json",
    platform: 'github',
    onboarding: false,
    requireConfig: 'optional',
    repositories: [
        'monkescience/renovate',
        'monkescience/iac',
        'monkescience/phasor',
        'monkescience/gitops',
        'monkescience/portage',
        'monkescience/mirror',
    ],
    extends: [
        'config:best-practices',
        ':semanticCommits',
        ':automergeMajor',
    ],
    minimumReleaseAge: '14 days',
    packageRules: [
        {
            matchDatasources: [
                "terraform-provider",
                "terraform-module"
            ],
            registryUrls: [
                "https://registry.opentofu.org"
            ]
        }
    ],
    argocd: {
        "managerFilePatterns": ["/apps/.+\\.yaml$/"],
        "automerge": true
    }
};
