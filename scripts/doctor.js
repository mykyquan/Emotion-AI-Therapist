const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const requiredFiles = [
    'Backend/.env.example',
    'Backend/src/config/ai-config.json',
    'docker-compose.yml',
    '.gitignore',
    'LICENSE',
    'README.md',
    'README.vi.md',
    'README.zh-TW.md',
    'README.zh-CN.md',
    'AGENTS.md',
    'docs/codex.md',
    'docs/presets.md',
    'presets/study-coach.json',
    '.agents/skills/ai-assistant-config-generator/SKILL.md'
];

let hasFailure = false;

function check(condition, okMessage, failMessage) {
    if (condition) {
        console.log(`OK   ${okMessage}`);
    } else {
        hasFailure = true;
        console.error(`FAIL ${failMessage}`);
    }
}

function warn(condition, message) {
    if (!condition) {
        console.warn(`WARN ${message}`);
    }
}

function exists(relativePath) {
    return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
    return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

const major = Number(process.versions.node.split('.')[0]);
check(major >= 18, `Node.js ${process.versions.node}`, 'Node.js 18 or newer is required.');

for (const file of requiredFiles) {
    check(exists(file), `${file} exists`, `${file} is missing`);
}

if (exists('Backend/src/config/ai-config.json')) {
    try {
        JSON.parse(read('Backend/src/config/ai-config.json'));
        console.log('OK   Backend/src/config/ai-config.json is valid JSON');
    } catch (error) {
        hasFailure = true;
        console.error(`FAIL Backend/src/config/ai-config.json is invalid JSON: ${error.message}`);
    }
}

const backendEnvExists = exists('Backend/.env');
warn(backendEnvExists, 'Backend/.env does not exist. This is fine for Docker if you pass env vars another way.');

let hasGroqKey = Boolean(process.env.GROQ_API_KEY);
if (!hasGroqKey && backendEnvExists) {
    const envText = read('Backend/.env');
    hasGroqKey = /^GROQ_API_KEY=(?!\s*$)(?!your_)/m.test(envText);
}

warn(hasGroqKey, 'GROQ_API_KEY was not found in the environment or Backend/.env. Do not print real keys in logs.');

if (hasFailure) {
    process.exitCode = 1;
} else {
    console.log('OK   Public beta readiness checks completed');
}
