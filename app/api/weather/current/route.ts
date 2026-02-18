import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.WEATHERSTACK_API_KEY;
const BASE_URL = "http://api.weatherstack.com";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    if (!API_KEY) {
        return NextResponse.json({ error: "API Key is missing" }, { status: 500 });
    }

    try {
        const response = await axios.get(`${BASE_URL}/current`, {
            params: {
                access_key: API_KEY,
                query: query,
            },
        });

        if (response.data.error) {
            return NextResponse.json({ error: response.data.error.info }, { status: 400 });
        }

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 });
    }
}
