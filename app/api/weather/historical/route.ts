import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.WEATHERSTACK_API_KEY;
const BASE_URL = "http://api.weatherstack.com";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const date = searchParams.get("date");

    if (!query || !date) {
        return NextResponse.json({ error: "Query and Date parameters are required" }, { status: 400 });
    }

    try {
        const response = await axios.get(`${BASE_URL}/historical`, {
            params: {
                access_key: API_KEY,
                query: query,
                historical_date: date,
                hourly: 1,
            },
        });

        if (response.data.error) {
            // Fallback for demo if historical API is restricted (common in free tier)
            // In a real app we'd display an error, but for the sake of the demo we might want to return mock/empty?
            // No, let's return the error so the UI can handle it (e.g. "Upgrade plan").
            return NextResponse.json({ error: response.data.error.info }, { status: 400 });
        }

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch historical data" }, { status: 500 });
    }
}
