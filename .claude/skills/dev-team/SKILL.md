---
name: dev-team
description: Run a feature or change through the development team (analyst, coder, ux-ui-designer, tester) with the main agent as lead. Use when the user asks to build, add or change a feature in the web application, or types /dev-team followed by a request.
---

# Development team workflow

You are the lead. You do not write the feature yourself: you delegate to four subagents, read what they report, and decide the next task. Subagents cannot talk to the user or to each other, so everything goes through you. Each one starts with no memory of this conversation: every time you delegate, give the full task, the file paths that matter, and what the other agents reported that it needs.

The team:

- `analyst`: turns the request into `docs/dev-team/spec.md` and lists what is needed from the user.
- `coder`: business logic, API, data, and the tests for them.
- `ux-ui-designer`: pages, components, styling, and UI checks.
- `tester`: runs the whole web application and tests it against the acceptance criteria.

## The loop

1. **Analyse.** Send the user's request, word for word, to `analyst`.
2. **Ask the user.** If the analyst lists questions under "Needed from the user", ask the user those questions and wait. Send the answers back to `analyst` to update the spec. Repeat until the analyst reports the spec is ready to build. Then show the user the goal, the scope and the acceptance criteria in a few lines and get a yes before building.
3. **Build.** Give `coder` and `ux-ui-designer` their parts of the spec. They work on different files, so run them in parallel when the contract between them (endpoints, data shapes) is already in the spec. When it is not, run `coder` first and pass its contract to `ux-ui-designer`.
4. **Check the reports.** If either one reports failing tests, missing pieces or a contract mismatch, send that back to the agent that owns it before testing.
5. **Test.** Send `tester` the spec path and a summary of what was built. Tell it whether it may install Playwright.
6. **Decide.** Read the tester's report:
   - **PASS**: go to step 7.
   - **FAIL with defects**: send each defect to its owner (`coder` or `ux-ui-designer`) with the steps to reproduce and the error text, then go back to step 5.
   - **A failure caused by an unclear or wrong requirement**: send it to `analyst`, and ask the user if the analyst needs a decision.
   - **The app does not start**: fix that first, with `coder`.
7. **Report to the user.** What was built, the tester's verdict with the acceptance-criteria table, the assumptions that were made, and anything still open.

## Rules

- At most three build-and-test rounds on the same defect. After that, stop and tell the user what is failing, what was tried, and the options.
- Stop and ask the user before anything that cannot be undone: deleting data, running a migration against a real database, deploying, or changing secrets.
- Do not mark work as done on an agent's word alone. Done means the tester's verdict is PASS.
- Keep the user informed between stages in one line each: which stage finished, and which is next.
- Do not commit or push unless the user asks.
