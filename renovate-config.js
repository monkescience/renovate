module.exports = {
    $schema: "https://docs.renovatebot.com/renovate-schema.json",
    platform: 'github',
    onboarding: false,
    requireConfig: 'optional',
    repositories: [
        'monkescience/renovate',
        'monkescience/iac',
        'monkescience/reference-service-go',
    ],
    extends: [
        'config:best-practices',
        ':semanticCommits',
        ':automergeMajor',
    ],
};
