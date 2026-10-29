#!/usr/bin/env node
// PreToolUse hook: keep Claude away from env files, which hold secrets.
//
// Why a hook and not only a rule
//   security.md says "no secrets in the repository", but a rule is context: Claude may still
//   open `.env.local` to debug a config. A hook runs before every matching tool call.
//
// How it works
//   1. Claude Code sends the tool call as JSON on stdin (tool name + its input).
//   2. Collect the paths the call targets: a file path for file tools, the words of the
//      command line for Bash.
//   3. If one of them is an env file: block the call.
//
// Contract with Claude Code (PreToolUse event)
//   exit 0 -> the tool call runs.
//   exit 2 -> the tool call is blocked; stderr is shown to Claude as the reason.
//
// Limit
//   The Bash check only spots file names written in the command: `cat .e*` slips through.
//   A hook narrows the risk; it does not replace keeping real secrets out of reach.
//
// Written in Node rather than Bash: the input is JSON, and Node is already required here.

import { basename } from "node:path";
import { text } from "node:stream/consumers";

// .env, .env.local, .env.production.local… but not .env.example (a template, no secrets).
const ENV_FILE_PATTERN = /^\.env(\..+)?$/;
const ALLOWED_FILES = [".env.example"];

function isEnvFile(path) {
  const name = basename(path);
  return ENV_FILE_PATTERN.test(name) && !ALLOWED_FILES.includes(name);
}

// 1. Read the tool call from stdin.
const { tool_name: toolName, tool_input: toolInput } = JSON.parse(await text(process.stdin));

// 2. Paths targeted by the call.
const targets =
  toolName === "Bash"
    ? toolInput.command.split(/[\s'"`;|&<>()=]+/)
    : [toolInput.file_path ?? toolInput.path ?? ""];

// 3. Block if one of them is an env file.
const envFile = targets.find(isEnvFile);
if (envFile) {
  process.stderr.write(
    `Blocked: ${envFile} is an env file and may hold secrets. ` +
      "Do not read or write it; ask the user to make the change.\n",
  );
  process.exit(2);
}
