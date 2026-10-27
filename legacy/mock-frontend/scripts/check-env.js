const { exit, env } = process;

const parseList = (value) =>
    (value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

// Configure required keys via REQUIRED_ENV_VARS="KEY1,KEY2" for local/CI.
const requiredEnvVars = parseList(env.REQUIRED_ENV_VARS);

if (requiredEnvVars.length === 0) {
    console.log(
        "check-env: no REQUIRED_ENV_VARS configured, skipping strict validation.",
    );
    exit(0);
}

const missing = requiredEnvVars.filter((key) => !env[key]);

if (missing.length > 0) {
    console.error("check-env: missing required environment variables:");
    for (const key of missing) {
        console.error(`- ${key}`);
    }
    exit(1);
}

console.log("check-env: all required environment variables are set.");
