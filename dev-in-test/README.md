# Part 1
## Code Review

* General notes
  - For readability and conciseness, consider using `.toBeTrue()` and `.toBeFalse()` instead of `.toEqual()` + passing in a primitive
  - For even more robust code confidence, consider using RNG for numerical parameters when appropriate
    * Also, no negative values are tested in the spec
  - In my preferred IDE (VScode), `<code>some_code_here</code>` syntax does not display properly in JSdoc comments, so I would recommend using backticks ( \` ) instead.
  - Use single quotes instead of double in the spec file
  - Karma runner is [deprecated](https://github.com/karma-runner/karma/commit/450fdfdac5b999967daec1020f1ac69cf9b854ab) as of April 2023. Considering using an alternative.
  - Ensure that dependencies have no security issues; tools like GitHub's [Dependabot](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/configuring-dependabot-security-updates) make this very simple.
  - Consider using a code coverage tool, such as [Istanbul](https://github.com/istanbuljs/nyc)
* `Cartesian3.js`
  - Line [37](https://github.com/cdsoftw/cesium-sdet-project/blob/307b868967139df7de99add83be6fe4ad9e87f29/dev-in-test/source/Cartesian3.js#L37), [40](https://github.com/cdsoftw/cesium-sdet-project/blob/307b868967139df7de99add83be6fe4ad9e87f29/dev-in-test/source/Cartesian3.js#L40)
    * See above note - use \`true\` and \`false\` instead.
  - [Line 52](https://github.com/cdsoftw/cesium-sdet-project/blob/307b868967139df7de99add83be6fe4ad9e87f29/dev-in-test/source/Cartesian3.js#L52)
    * While not required, I would recommend using the bracket syntax (`[right]`) for the parameter name so as to match the rest of the file.
* `Cartesian3Spec.js`
  - At first glance, not all logic branches / code paths are covered by the unit test, namely:
    * Mixing both default and given constructor parameters
      - A new test case seems logical, e.g. `it("constructs instance with mixed values", ...`
    * [Line 44](https://github.com/cdsoftw/cesium-sdet-project/blob/307b868967139df7de99add83be6fe4ad9e87f29/dev-in-test/source/Cartesian3.js#L44) is not covered in the `"equals returns true for identical values"` test
      - Add `expect(cartesian.equals(cartesian)).toBeTrue();` or sim.
    * The block starting at [Line 57](https://github.com/cdsoftw/cesium-sdet-project/blob/307b868967139df7de99add83be6fe4ad9e87f29/dev-in-test/source/Cartesian3.js#L57) is not covered in the `add()` test
      - A new test case seems logical, e.g. `it("add throws error with invalid params", ...`
    * [Line 68](https://github.com/cdsoftw/cesium-sdet-project/blob/307b868967139df7de99add83be6fe4ad9e87f29/dev-in-test/source/Cartesian3.js#L68) is not covered in the `add()` test
      - Add `expect(left.add(right)).toEqual(expectedResult);` or sim.
