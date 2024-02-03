# Testing documentation

Testing the project is done mainly by Vitest, which is a testing framework created for projects done with React local development tool Vite.
Vitest is very similar to Jest, which is the most used testing framework for React projects, but Vitest is really easy to configure on a Vite project.
Testing is heavily focused on the business and game logic of project, because the frontend is fairly simple unlike the logic which is in comparison much more
complicated and bugs are harder to detect.

## Testing coverage

Coverage is automated by using GitHub actions, and incorporating Codecov testing coverage on every push to repository. Testing coverage has been fluxuating between 60-80& since adding it last week. In the beginning testing wasn't put much effort into, because project structure and logic
wasn't fully in place and judging from experice tests done too early might become completely useless later if the structure of project changes. As the project moves on, testing
has gone more hand in hand with developing new logic for the project. Coverage has been fluxuating between 60-80% since adding test coverage. Coverage percent on its own isn't
really put much effort into, but used as a tool to check if something vital part of logic is not tested yet.

---

![Screenshot of testing coverage](https://github.com/anttiromppanen/tiralab-chess/blob/main/documentation/images/Screenshot%20from%202024-02-03%2020-59-40.png)
