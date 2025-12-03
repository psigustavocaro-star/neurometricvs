---
description: How to deploy directly to Vercel without Git
---

# Deploying Directly to Vercel (No Git Required)

Since you don't have Git installed, the easiest way to publish your website is using the **Vercel CLI**.

## Steps

1.  **Open your Terminal:**
    You can use the terminal inside VS Code or PowerShell.

2.  **Login to Vercel:**
    Run the following command to log in (or sign up) to Vercel:
    ```bash
    npx vercel login
    ```
    -   Select "Continue with Email" (or your preferred method).
    -   It will send you an email or open a browser window to confirm.

3.  **Deploy:**
    Once logged in, run this command to start the deployment:
    ```bash
    npx vercel
    ```
    -   **Set up and deploy?** [Y/n] -> Type `y` and Enter.
    -   **Which scope?** -> Press Enter (select your account).
    -   **Link to existing project?** [y/N] -> Type `n` and Enter.
    -   **Project Name?** -> Press Enter (it will use `neurometrics`).
    -   **In which directory?** -> Press Enter (default is `./`).
    -   **Want to modify settings?** [y/N] -> Type `n` and Enter (it auto-detects Next.js).

4.  **Wait for Build:**
    Vercel will upload your files and build the site. This takes about 1-2 minutes.

5.  **Production Deployment:**
    The previous step creates a "Preview" deployment. To make it **Production** (live for everyone), run:
    ```bash
    npx vercel --prod
    ```

6.  **Final Step (Important):**
    -   Go to your [Supabase Dashboard](https://supabase.com/dashboard).
    -   Go to **Authentication** -> **URL Configuration**.
    -   Add your new Vercel URL (e.g., `https://neurometrics.vercel.app`) to the **Site URL** and **Redirect URLs**.
    -   This ensures users can log in on the live site.
