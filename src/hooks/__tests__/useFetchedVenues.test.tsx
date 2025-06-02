/**
 * Custom hook to fetch, filter, and sort venues from the API.
 * Filters out venues without media and those with "[object" in the name.
 * @returns {object} Query result with filtered and sorted venues.
 */

/**
 * Tests for the useFetchedVenues custom hook.
 * Mocks fetch and React Query context to verify venue filtering, sorting, and error handling.
 */
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import useFetchedVenues from "../useFetchedVenues";

const mockFetch = vi.fn();
global.fetch = mockFetch;

/**
 * Creates a React Query wrapper for testing hooks with a fresh QueryClient.
 * @returns {({ children }: { children: ReactNode }) => JSX.Element} A wrapper component for React Query context.
 */
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useFetchedVenues hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch and process venues correctly", async () => {
    /**
     * Mocks a successful fetch and verifies that the hook filters and sorts venues as expected.
     */

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
      {
        id: "4",
        name: "No Image Venue",
        description: "Venue without images",
        media: [],
        price: 75,
        maxGuests: 3,
        rating: 3.0,
        created: "2023-01-04",
        updated: "2023-01-04",
        meta: { wifi: true, parking: false, breakfast: false, pets: false },
        location: {
          address: "789 No Image St",
          city: "Image City",
          zip: "54321",
          country: "Test Country",
          continent: "Test Continent",
          lat: 30.0,
          lng: -90.0,
        },
        _count: { bookings: 2 },
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

  it("should filter out venues without media", async () => {
    /**
     * Mocks a fetch response with some venues missing media and checks that only venues with media are returned.
     */

    const mockVenuesData = [
      {
        id: "1",
        name: "Good Venue",
        description: "A venue with images",
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
        name: "No Media Venue",
        description: "A venue without images",
        media: [],
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

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toBe("Good Venue");
  });

  it("should filter out troll entries with [object in name", async () => {
    /**
     * Mocks a fetch response with troll entries and checks that they are filtered out.
     */

    const mockVenuesData = [
      {
        id: "1",
        name: "Good Venue",
        description: "A normal venue",
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

    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].name).toBe("Good Venue");
  });

  it("should handle fetch errors", async () => {
    /**
     * Mocks a failed fetch and checks that the hook sets the error state.
     */

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

  it("should sort venues alphabetically", async () => {
    /**
     * Mocks a fetch response and checks that the venues are sorted alphabetically by name.
     */

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
        name: "Beta Lodge",
        description: "A cozy lodge",
        media: [{ url: "test3.jpg", alt: "test3" }],
        price: 150,
        maxGuests: 4,
        rating: 4.2,
        created: "2023-01-03",
        updated: "2023-01-03",
        meta: { wifi: true, parking: false, breakfast: true, pets: false },
        location: {
          address: "789 Mountain Rd",
          city: "Mountain View",
          zip: "98765",
          country: "Test Country",
          continent: "Test Continent",
          lat: 35.0,
          lng: -118.0,
        },
        _count: { bookings: 3 },
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

    expect(result.current.data).toHaveLength(3);
    expect(result.current.data?.[0].name).toBe("Alpha Resort");
    expect(result.current.data?.[1].name).toBe("Beta Lodge");
    expect(result.current.data?.[2].name).toBe("Zebra Hotel");
  });
});
