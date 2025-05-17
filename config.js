module.exports = {
    platform: 'github',
    onboarding: false,
    requireConfig: false,
    repositories: [
        'monkescience/renovate',
        'monkescience/iac',
        'monkescience/reference-service-go',
    ],
    extends: ['local>monkescience/renovate'],
};