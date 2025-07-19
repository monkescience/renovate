module.exports = {
    $schema: "https://docs.renovatebot.com/renovate-schema.json",
    platform: 'github',
    onboarding: false,
    requireConfig: 'optional',
    repositories: [
        'monkescience/renovate',
        'monkescience/iac',
        'monkescience/reference-service-go',
        'monkescience/gitops',
        'monkescience/portage',
    ],
    extends: [
        'config:best-practices',
        ':semanticCommits',
        ':automergeMajor',
    ],
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
        "automerge": false
    }
};
