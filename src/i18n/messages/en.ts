import type { Messages } from "./index";

export const en: Messages = {
  meta: {
    title: "Acme — Context & Harness Engineering",
    description: "Hands-on training for development teams that already use a coding agent.",
  },
  localeSwitcher: {
    label: "Language",
  },
  sections: {
    features: "The goal: a team-wide agentic layer",
    program: "The program",
    chapterLabel: "Part",
    format: "The format",
  },
  contact: {
    title: "Training your team?",
    text: "Leave your email and we will get back to you to design the course with your team.",
    emailLabel: "Email address",
    emailPlaceholder: "you@company.com",
    pending: "Sending…",
    success: "Thank you! {email} is registered, we will get back to you.",
    errors: {
      INVALID_EMAIL: "This email address is not valid.",
      ALREADY_SUBSCRIBED: "This address is already registered.",
      UNEXPECTED: "An unexpected error occurred.",
    },
  },
  footer: "Training repository, fictional content.",
};
