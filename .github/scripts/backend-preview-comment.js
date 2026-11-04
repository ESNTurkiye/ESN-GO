// Keeps one comment per PR up to date, like the Vercel bot.
// Called from .github/workflows/backend-preview.yml with actions/github-script.
const MARKER = "<!-- esngo-backend-preview -->";

const STATUS = {
  deploying: "🔄 Deploying",
  ready: "✅ Ready",
  failed: "❌ Failed",
  deleted: "🗑️ Deleted",
};

function istanbulTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Istanbul",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

module.exports = async (
  { github, context },
  { status, stack, stage, apiUrl, cdnDomain, region },
) => {
  const { owner, repo } = context.repo;
  const issue_number = context.payload.pull_request.number;
  const runUrl = `${context.serverUrl}/${owner}/${repo}/actions/runs/${context.runId}`;
  const logsUrl =
    `https://${region}.console.aws.amazon.com/cloudwatch/home?region=${region}` +
    `#logsV2:log-groups$3FlogGroupNameFilter$3D$252Fesngo$252F${stage}`;

  const api = apiUrl
    ? `[${apiUrl.replace("https://", "")}](${apiUrl}/cities)`
    : "–";
  const cdn = cdnDomain ? `\`${cdnDomain}\`` : "–";
  const actions =
    status === "deleted"
      ? `[Run](${runUrl})`
      : `[Run](${runUrl}) · [Logs](${logsUrl})`;

  const lines = [
    MARKER,
    "**ESN GO backend preview** (AWS dev account, `eu-central-1`)",
    "",
    "| Stack | Status | API | Media CDN | Actions | Updated (Istanbul) |",
    "| --- | --- | --- | --- | --- | --- |",
    `| \`${stack}\` | ${STATUS[status]} | ${api} | ${cdn} | ${actions} | ${istanbulTime()} |`,
  ];

  if (status === "ready") {
    lines.push(
      "",
      "<details><summary>Use it with the frontend</summary>",
      "",
      "In `apps/frontend/.env.local`:",
      "",
      "```bash",
      `NEXT_PUBLIC_API_URL=${apiUrl}`,
      `NEXT_PUBLIC_MEDIA_CDN=https://${cdnDomain}`,
      "```",
      "",
      "The preview starts with empty tables. It is deleted when this PR is closed or merged.",
      "</details>",
    );
  }
  if (status === "failed") {
    lines.push(
      "",
      `Deploy failed. See the [run](${runUrl}) for the CloudFormation error.`,
    );
  }

  const body = lines.join("\n");
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number,
  });
  const existing = comments.find(
    (c) => c.user.type === "Bot" && c.body.includes(MARKER),
  );

  if (existing) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existing.id,
      body,
    });
  } else {
    await github.rest.issues.createComment({ owner, repo, issue_number, body });
  }
};
