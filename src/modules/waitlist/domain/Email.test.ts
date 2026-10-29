import { Email } from "./Email";
import { InvalidEmailError } from "./errors";

describe("Email", () => {
  it("normalizes the address to lowercase without surrounding spaces", () => {
    expect(Email.create("  Ada@Example.COM ").value).toBe("ada@example.com");
  });

  it.each(["", "ada", "ada@", "@example.com", "ada@example", "ada @example.com"])(
    "rejects the invalid address %p",
    (raw) => {
      expect(() => Email.create(raw)).toThrow(InvalidEmailError);
    },
  );

  it("treats two addresses as equal once normalized", () => {
    expect(Email.create("ADA@example.com").equals(Email.create("ada@example.com"))).toBe(true);
  });
});
