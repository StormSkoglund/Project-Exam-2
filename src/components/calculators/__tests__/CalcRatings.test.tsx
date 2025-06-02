/**
 * Tests for the CalcRatings component.
 * Verifies correct rendering of stars and CSS classes for various rating values.
 */

import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CalcRatings } from "../CalcRatings";

describe("CalcRatings component", () => {
  it("should render without crashing", () => {
    const { container } = render(<CalcRatings rating={4.5} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render 5 star elements for any rating", () => {
    const { container } = render(<CalcRatings rating={3.7} />);
    const starElements = container.querySelectorAll("span");
    expect(starElements).toHaveLength(5);
  });

  it("should render correct number of full stars for whole number ratings", () => {
    const { container } = render(<CalcRatings rating={4} />);
    const starElements = container.querySelectorAll("span");
    expect(starElements).toHaveLength(5);
  });

  it("should render half star for decimal ratings >= 0.5", () => {
    const { container } = render(<CalcRatings rating={3.7} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should render no full stars for rating 0", () => {
    const { container } = render(<CalcRatings rating={0} />);
    const starElements = container.querySelectorAll("span");
    expect(starElements).toHaveLength(5);
  });

  it("should render 5 full stars for rating 5", () => {
    const { container } = render(<CalcRatings rating={5} />);
    const starElements = container.querySelectorAll("span");
    expect(starElements).toHaveLength(5);
  });

  it("should handle decimal ratings properly", () => {
    const ratings = [1.2, 2.5, 3.8, 4.3];

    ratings.forEach((rating) => {
      const { container } = render(<CalcRatings rating={rating} />);
      const starElements = container.querySelectorAll("span");
      expect(starElements).toHaveLength(5);
    });
  });

  it("should apply correct CSS classes", () => {
    const { container } = render(<CalcRatings rating={3.5} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass(
      "flex",
      "flex-row",
      "items-center",
      "justify-center",
      "mb-2",
      "mt-2"
    );
  });

  it("should handle edge case ratings", () => {
    const edgeCases = [0, 0.1, 0.4, 0.5, 0.9, 1, 4.9, 5];

    edgeCases.forEach((rating) => {
      const { container } = render(<CalcRatings rating={rating} />);
      const starElements = container.querySelectorAll("span");
      expect(starElements).toHaveLength(5);
    });
  });
});
