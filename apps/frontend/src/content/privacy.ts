/**
 * /privacy: what ESN GO keeps and why, in plain words. Must match the code:
 * login data (apps/backend users table), localStorage keys in
 * lib/session.ts and lib/place-form.ts, Amazon Location maps, photo uploads to S3.
 */
export const PRIVACY = {
  title: "Privacy",
  lead: "ESN GO is a city guide by ESN Türkiye. You can browse it without an account, and we don't use tracking or advertising cookies.",
  sections: [
    {
      title: "If you only browse",
      items: [
        "We don't ask who you are and don't build a profile of you.",
        "The map is loaded from Amazon Location Service. Like any website, it receives your IP address to send the map.",
      ],
    },
    {
      title: "If you log in as an ESNer",
      items: [
        "ESN Accounts sends us your username, your name and your ESN section. We never see your password, and your email is not shared with us.",
        "Your name and section are shown on places you add. Your username tells us which places are yours to edit.",
        "You stay logged in on this browser for 24 hours.",
      ],
    },
    {
      title: "Places and photos you add",
      items: [
        "Places, text and photos you add are public on ESN GO.",
        "Photos are stored on Amazon Web Services in the EU.",
        "You can edit or delete your places at any time from My places.",
      ],
    },
    {
      title: "What stays in your browser",
      items: [
        "Your login, until it expires or you log out.",
        "An unfinished place form, so you don't lose it on a reload. It is deleted after 7 days.",
        "Nothing else. These are not sent anywhere except to log you in.",
      ],
    },
  ],
  contactTitle: "Questions or removal",
  contact:
    "To ask what we keep about you or to have it removed, contact ESN Türkiye.",
  contactLink: "Contact ESN Türkiye",
};
