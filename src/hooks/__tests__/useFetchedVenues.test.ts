// filepath: c:\Users\Skogl\OneDrive\Dokumenter\Project-exam-2\src\hooks\__tests__\useFetchedVenues.test.ts
import React from "react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import useFetchedVenues from "../useFetchedVenues";

const mockFetch = vi.fn();
global.fetch = mockFetch;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return React.createElement(
      QueryClientProvider,
      { client: queryClient },
      children
    );
  };
};

describe("useFetchedVenues hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch and process venues correctly", async () => {
    const mockVenuesData = [
      {
        id: "1",
        name: "Zebra Hotel",
        description: "A nice hotel",
        media: [{ url: "test.jpg", alt: "test" }],
        price: 100,
        maxGuests: 4,
        rating: 4.5,
        created: "2023-01-01",
        updated: "2023-01-01",
        meta: { wifi: true, parking: true, breakfast: false, pets: false },
        location: {
          address: "123 Main St",
          city: "Test City",
          zip: "12345",
          country: "Test Country",
          continent: "Test Continent",
          lat: 40.7128,
          lng: -74.006,
        },
        _count: { bookings: 5 },
      },
      {
        id: "2",
        name: "Alpha Resort",
        description: "A great resort",
        media: [{ url: "test2.jpg", alt: "test2" }],
        price: 200,
        maxGuests: 6,
        rating: 4.8,
        created: "2023-01-02",
        updated: "2023-01-02",
        meta: { wifi: true, parking: true, breakfast: true, pets: true },
        location: {
          address: "456 Beach Ave",
          city: "Test Beach",
          zip: "67890",
          country: "Test Country",
          continent: "Test Continent",
          lat: 25.7617,
          lng: -80.1918,
        },
        _count: { bookings: 10 },
      },
      {
        id: "3",
        name: "[object Undefined]",
        description: "Troll entry",
        media: [{ url: "troll.jpg", alt: "troll" }],
        price: 50,
        maxGuests: 2,
        rating: 1.0,
        created: "2023-01-03",
        updated: "2023-01-03",
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: {
          address: null,
          city: null,
          zip: null,
          country: null,
          continent: null,
          lat: null,
          lng: null,
        },
        _count: { bookings: 0 },
      },
    ];

    const mockResponse = {
      ok: true,
      json: async () => ({
        data: mockVenuesData,
        meta: {
          nextPage: null,
          pageCount: 1,
        },
      }),
    };

    mockFetch.mockResolvedValue(mockResponse);

    const wrapper = createWrapper();
    const { result } = renderHook(() => useFetchedVenues(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].name).toBe("Alpha Resort");
    expect(result.current.data?.[1].name).toBe("Zebra Hotel");
  });

  it("should handle fetch errors", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    });

    const wrapper = createWrapper();
    const { result } = renderHook(() => useFetchedVenues(), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
  });
});
