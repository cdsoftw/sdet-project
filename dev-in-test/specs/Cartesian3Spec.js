import Cartesian3 from "../source/Cartesian3.js";

describe("Cartesian3", function () {
  it("construct with default values", function () {
    const cartesian = new Cartesian3();
    expect(cartesian.x).toEqual(0.0);
    expect(cartesian.y).toEqual(0.0);
    expect(cartesian.z).toEqual(0.0);
  });

  it("construct with all values", function () {
    const cartesian = new Cartesian3(1.0, 1.0, 1.0);
    expect(cartesian.x).toEqual(1.0);
    expect(cartesian.y).toEqual(1.0);
    expect(cartesian.z).toEqual(1.0);
  });

  it("add works", function () {
    const left = new Cartesian3(2.0, 3.0, 6.0);
    const right = new Cartesian3(6.0, 5.0, 7.0);
    const result = new Cartesian3();
    const expectedResult = new Cartesian3(8.0, 8.0, 13.0);
    left.add(right, result);
    expect(result).toEqual(expectedResult);
  });

  it("equals returns true for identical values", function () {
    const cartesian = new Cartesian3(1.0, 2.0, 3.0);
    expect(cartesian.equals(new Cartesian3(1.0, 2.0, 3.0))).toEqual(true);
  });

  it("equals returns true for differing values", function () {
    const cartesian = new Cartesian3(1.0, 2.0, 3.0);
    expect(cartesian.equals(new Cartesian3(4.0, 5.0, 6.0))).toEqual(false);
  });
});
