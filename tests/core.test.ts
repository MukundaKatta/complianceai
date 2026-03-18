import { describe, it, expect } from "vitest";
import { Complianceai } from "../src/core.js";
describe("Complianceai", () => {
  it("init", () => { expect(new Complianceai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Complianceai(); await c.manage(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Complianceai(); await c.manage(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
