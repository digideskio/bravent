import assert from "assert";
import { validate, Success, Failure } from "../lib/validation";
import { has, pipe, where, lt } from "ramda";

describe("validate()", () => {

  const validations = {
    "Date must be present.": has("date"),
    "User ID must be present.": has("userId"), 
    "Amount must be greater than zero.": where({ amount: lt(0)}),
  };

  it("results in success when all predicates are true", () => {
    const command = {
      type: "makePayment",
      amount: 50,
      date: "2016-09-02",
      userId: "666"
    };

    assert.deepEqual(
      validate(command, validations),
      Success(command)
    );
  });

  it("results in failure when some predicates are false", () => {
    const command = {
      type: "makePayment",
      amount: 0,
      userId: "666"
    };

    assert.deepEqual(
      validate(command, validations),
      Failure([
        "Date must be present.",
        "Amount must be greater than zero."
      ])
    );
  });
});