import type { Metadata } from "next";
import { AuthCallback } from "./AuthCallback";

export const metadata: Metadata = {
    title: "Logging in",
    robots: { index: false, follow: false },
};

/** ESN Accounts login ends here: <site>/auth/callback#token=…&expiresAt=… (or #error=…). */
export default function AuthCallbackPage() {
    return (
        <div className="container">
            <AuthCallback />
        </div>
    );
}
