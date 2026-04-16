import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

async function withFetch() {
  const res = await fetch("https://api.weatherapi.com/");
  const json = await res.json();
  return json;
}

const originalFetch = global.fetch;

describe("withFetch testing fetch", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response),
    ) as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("works", async () => {
    const json = await withFetch();

    expect(fetch).toHaveBeenCalledWith("https://api.weatherapi.com/");
    expect(Array.isArray(json)).toBe(true);
    expect(json.length).toBe(0);
  });
});
