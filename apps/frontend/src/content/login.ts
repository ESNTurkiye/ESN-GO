/**
 * /login: the stop before ESN Accounts. Someone already logged in to ESN Accounts in this
 * browser comes straight back without typing a password, so this page says what we
 * receive and what it is for before anything is shared (decision 8 Nov, Kayra).
 * Matches apps/backend: the users table keeps the username, name and section.
 */
export const LOGIN = {
  title: "Are you an ESNer?",
  body: "ESNers are volunteers of the Erasmus Student Network. They log in with their ESN Accounts to add the places they recommend. You don't need to log in to browse ESN GO.",
  receiveTitle: "What ESN GO receives from ESN Accounts",
  receive: ["Your ESN Accounts username", "Your name", "Your ESN section"],
  useTitle: "What it is used for",
  use: [
    "Your name and section are shown on places you add.",
    "Your username tells us which places are yours to edit.",
    "We never see your password, and your email is not shared with us.",
  ],
  sso: "If you are already logged in to ESN Accounts in this browser, you will come straight back here without typing your password.",
  action: "Log in with ESN Accounts",
  browse: { label: "Not an ESNer? Explore places", href: "/explore" },
  session:
    "You stay logged in on this browser for 24 hours. Logging out of ESN GO doesn't log you out of ESN Accounts.",
};
