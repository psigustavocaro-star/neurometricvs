---
description: How to deploy the application to Vercel
---

# Deploying to Vercel

Since this is a Next.js application with Supabase, **Vercel** is the best platform for deployment.

## Prerequisites

1.  **GitHub Account:** Ensure your code is pushed to a GitHub repository.
2.  **Vercel Account:** Sign up at [vercel.com](https://vercel.com).
3.  **Supabase Project:** You already have this.

## Steps

1.  **Push to GitHub:**
    If you haven't already, commit your changes and push them to a GitHub repository.
    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push
    ```

2.  **Import to Vercel:**
    -   Go to your Vercel Dashboard.
    -   Click **"Add New..."** -> **"Project"**.
    -   Select your GitHub repository (`neurometrics`).
    -   Click **"Import"**.

3.  **Configure Environment Variables:**
    -   In the "Configure Project" screen, look for the **"Environment Variables"** section.
    -   You need to add the variables from your `.env.local` file.
    -   Open your `.env.local` file locally and copy the values for:
        -   `NEXT_PUBLIC_SUPABASE_URL`
        -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
        -   `OPENAI_API_KEY` (if you are using the AI features)
    -   Paste them into the Vercel fields.

4.  **Deploy:**
    -   Click **"Deploy"**.
    -   Wait for the build to complete (it should take about a minute).

5.  **Finalize:**
    -   Once deployed, you will get a URL (e.g., `neurometrics.vercel.app`).
    -   **Important:** Go to your **Supabase Dashboard** -> **Authentication** -> **URL Configuration**.
    -   Add your new Vercel URL to the **Site URL** and **Redirect URLs** to ensure login works correctly in production.

## Troubleshooting

-   If the build fails on Vercel, check the "Logs" tab.
-   Ensure you didn't miss any Environment Variables.
