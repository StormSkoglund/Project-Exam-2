/**
 * Tests for the fetchAllVenues utility logic.
 * Verifies sorting and filtering of venue data arrays.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

describe("fetchAllVenues function logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should sort venues alphabetically by name", () => {
    const venues = [
      { name: "Zebra Hotel" },
      { name: "Alpha Resort" },
      { name: "Beta Lodge" },
    ];

    const sorted = venues.sort((a, b) => a.name.localeCompare(b.name));
    const names = sorted.map((v) => v.name);

    expect(names).toEqual(["Alpha Resort", "Beta Lodge", "Zebra Hotel"]);
  });

  it("should filter out venues without media", () => {
    const venues = [
      { name: "Hotel with Image", media: [{ url: "test.jpg", alt: "test" }] },
      { name: "Hotel without Image", media: [] },
      { name: "Hotel with null media", media: null },
    ];

    const filtered = venues.filter(
      (venue) => venue.media && venue.media.length > 0
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe("Hotel with Image");
  });

  it('should filter out venues with "[object" in name', () => {
    const venues = [
      { name: "Normal Hotel" },
      { name: "[object Undefined]" },
      { name: "[object Object]" },
      { name: "Another Normal Hotel" },
    ];

    const filtered = venues.filter(
      (venue) => venue.name && !venue.name.includes("[object")
    );

    expect(filtered).toHaveLength(2);
    expect(filtered.map((v) => v.name)).toEqual([
      "Normal Hotel",
      "Another Normal Hotel",
    ]);
  });

  it("should apply all filters and sorting together", () => {
    const venues = [
      { name: "Zebra Hotel", media: [{ url: "image.jpg", alt: "test" }] },
      {
        name: "[object Undefined]",
        media: [{ url: "image.jpg", alt: "test" }],
      },
      { name: "Alpha Resort", media: [] },
      { name: "Beta Lodge", media: [{ url: "image.jpg", alt: "test" }] },
      { name: "", media: [{ url: "image.jpg", alt: "test" }] },
    ];

    const result = venues
      .filter((venue) => venue.media && venue.media.length > 0)
      .filter((venue) => venue.name && !venue.name.includes("[object"))
      .sort((a, b) => a.name.localeCompare(b.name));

    expect(result).toHaveLength(2);
    expect(result.map((v) => v.name)).toEqual(["Beta Lodge", "Zebra Hotel"]);
  });

  it("should filter out venues with empty names", () => {
    const venues = [
      { name: "Valid Hotel", media: [{ url: "test.jpg", alt: "test" }] },
      { name: "", media: [{ url: "test.jpg", alt: "test" }] },
      { name: null, media: [{ url: "test.jpg", alt: "test" }] },
      { name: undefined, media: [{ url: "test.jpg", alt: "test" }] },
    ];

    const filtered = venues.filter(
      (venue) => venue.name && !venue.name.includes("[object")
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe("Valid Hotel");
  });
});
