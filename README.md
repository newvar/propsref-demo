This demo shows how the propsRef approach resolves react hooks dependencies issues.
Also we are trying to show the natural way of rewriting class components in hooks and the issues we can meet on that way.

Component changes in chronological order
* `Component-0`
* `Component-1` - with linter error
* `Component-1-fixed` - fixed linter error
* `Component-2` - with fetch logic
* `Component-2-fix1` - fixed linter error
* `Component-2-fixed` - fixed refetching by propsRef
* `Component-2-decomposed` - extracted hooks
* `Component-0-decomposed` - extracted class methods to compare with extracted hooks

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
