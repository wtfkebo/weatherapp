import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Weatherstack autocomplete endpoint is separate usually, but let's try to use it.
const BASE_URL = "http://api.weatherstack.com";
const API_KEY = process.env.WEATHERSTACK_API_KEY;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json([]);
    }

    try {
        // Weatherstack Autocomplete
        // If this endpoint doesn't exist on free tier, we might need a fallback.
        // Documentation says it exists.
        const response = await axios.get(`${BASE_URL}/autocomplete`, {
            params: {
                access_key: API_KEY,
                query: query,
            },
        });

        // Check if response is error (Weatherstack returns 200 with error body sometimes)
        if (response.data.error) {
            console.error("Autocomplete API Error:", response.data.error);
            return NextResponse.json([]);
        }

        // Normalize data if necessary
        const results = response.data.results || [];
        return NextResponse.json(results);

    } catch (error) {
        console.error("Autocomplete Error:", error);
        return NextResponse.json([]);
    }
}
