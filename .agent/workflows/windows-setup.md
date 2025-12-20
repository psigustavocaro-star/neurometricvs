---
description: How to set up the development environment on Windows
---

# Windows Development Setup

Since the project is hosted on GitHub, you can easily switch to a Windows machine to continue working.

## Prerequisites

1.  **Install Node.js:**
    -   Download and install the **LTS version** from [nodejs.org](https://nodejs.org/).
2.  **Install Git:**
    -   Download and install from [git-scm.com](https://git-scm.com/).
3.  **Install VS Code:**
    -   Recommended code editor. Download from [code.visualstudio.com](https://code.visualstudio.com/).

## Steps to Setup

1.  **Clone the Repository:**
    Open command prompt (cmd) or PowerShell and run:
    ```bash
    git clone https://github.com/psigustavocaro-star/neurometricvs.git
    cd neurometricvs
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    -   Create a new file named `.env.local` in the root folder.
    -   **Important:** You need to copy the *content* of your Mac's `.env.local` file into this new file on Windows.
    -   (Tip: You can securely send the content to yourself via a password manager, or copy the keys from your Supabase/Vercel dashboard if you don't have safe access to the Mac file).

4.  **Run the Server:**
    ```bash
    npm run dev
    ```
    The site should now be running at `http://localhost:3000`.

## Troubleshooting on Windows

-   **Line Endings (CRLF vs LF):**
    If you see many files showing as "modified" immediately after cloning, it might be due to line endings.
    Run this command in the repo to enforce LF (Mac/Linux style) which is standard for web dev:
    ```bash
    git config core.autocrlf false
    ```
    Then reset the files:
    ```bash
    git reset --hard
    ```
