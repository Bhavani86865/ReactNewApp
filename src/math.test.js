import { test, expect } from "vitest";
import { add, subtract, multiply, divide, calculate } from "./math.js";

test("Addition test", () => {
  expect(add(10, 20)).toBe(30);
});

test("Performs subtraction, multiplication, and division", () => {
  expect(subtract(15, 7)).toBe(8);
  expect(multiply(4, 6)).toBe(24);
  expect(divide(20, 5)).toBe(4);
});

test("Calculates using the selected operator", () => {
  expect(calculate(12, 3, "+")).toBe(15);
  expect(calculate(12, 3, "-")).toBe(9);
  expect(calculate(12, 3, "*")).toBe(36);
  expect(calculate(12, 3, "/")).toBe(4);
});

test("Division by zero returns an error state", () => {
  expect(divide(10, 0)).toBe("Error");
  expect(calculate(10, 0, "/")).toBe("Error");
});