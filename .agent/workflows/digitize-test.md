---
description: How to digitize new tests from PDF content
---

# Workflow: Digitizing New Tests

To add a new test to the platform from a PDF source, follow these steps:

1.  **Provide the Content:**
    *   Copy and paste the text of the questions and options directly into the chat.
    *   OR upload screenshots of the test pages if the layout is complex.
    *   Provide the scoring rules (how points are assigned and what the total scores mean).

2.  **Define the Structure:**
    I will convert this content into a TypeScript definition following our `TestDefinition` interface:
    *   `id`: Unique slug (e.g., 'gad-7').
    *   `title`: Full name of the test.
    *   `description`: Brief summary.
    *   `questions`: Array of questions with `id`, `text`, `type` (e.g., 'single_choice'), and `options`.
    *   `scoring`: Logic for ranges and interpretations.

3.  **Implementation:**
    *   I will create a new file in `lib/tests/[test-slug].ts`.
    *   I will add the test to the registry in `app/tests/[id]/page.tsx`.
    *   I will add the test card to the `TestCatalog` component.

4.  **Verification:**
    *   We will verify the interactive version to ensure scoring works as expected.
