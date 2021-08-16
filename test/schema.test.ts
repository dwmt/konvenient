import { describe, it, expect } from "@jest/globals";
import { configurationSchema } from "../src/decorator";
import { isNestedSchema, nestedSchema } from "../src/schema";

describe("isNestedSchema", () => {
  it("returns true if it has NestedSchema", () => {
    const target = Object.create(null);
    target[nestedSchema] = {
      foo: "bar",
    };

    expect(isNestedSchema(target)).toBe(true);
  });

  it("returns false if it does not have NestedSchema", () => {
    const target = Object.create(null);
    target[configurationSchema] = {
      foo: "bar",
    };

    expect(isNestedSchema(target)).toBe(false);
  });
});

describe('isNestedSchemaWithDefauts', () => {
  it("returns true if it has nestedSchema and default", () => {
    const target = Object.create(null);
    target[nestedSchema] = {
      foo: "bar",
    };

    target['default'] = 'baz';

    expect(isNestedSchema(target)).toBe(true);
  });

  it("returns false if it does not have NestedSchema", () => {
    const target = Object.create(null);
    target[configurationSchema] = {
      foo: "bar",
    };

    expect(isNestedSchema(target)).toBe(false);
  });
})