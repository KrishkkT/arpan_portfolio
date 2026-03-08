import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    const username = "Arpanbhuva";
    const token = process.env.GITHUB_TOKEN;

    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
            params: {
                sort: "updated",
                per_page: 6,
            },
            headers: token ? { Authorization: `token ${token}` } : {},
        });

        const repos = response.data.map(repo => ({
            name: repo.name,
            description: repo.description,
            githubLink: repo.html_url,
            stars: repo.stargazers_count,
            technologies: [repo.language].filter(Boolean),
            lastUpdate: repo.updated_at,
            category: "Software", // Default for GitHub
        }));

        return NextResponse.json(repos);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch GitHub projects" }, { status: 500 });
    }
}
