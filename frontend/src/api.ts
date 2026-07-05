const API_BASE = import.meta.env.VITE_API_URL || "https://boothflow-1.onrender.com/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000); // 2 min for Render cold start

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json"
      },
      ...options
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      const message =
        errorBody?.message ??
        errorBody?.error ??
        "Request failed. Please verify the backend is running.";
      throw new Error(message);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error("Backend is starting up (cold start). Please refresh in 30 seconds.");
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export const api = {
  getDashboard: () => request("/dashboard"),
  getConstituencies: () => request("/constituencies"),
  createConstituency: (body: unknown) =>
    request("/constituencies", { method: "POST", body: JSON.stringify(body) }),
  getPollingStations: () => request("/polling-stations"),
  createPollingStation: (body: unknown) =>
    request("/polling-stations", { method: "POST", body: JSON.stringify(body) }),
  getParties: () => request("/parties"),
  createParty: (body: unknown) =>
    request("/parties", { method: "POST", body: JSON.stringify(body) }),
  getElections: () => request("/elections"),
  createElection: (body: unknown) =>
    request("/elections", { method: "POST", body: JSON.stringify(body) }),
  getCandidates: (electionId?: number) => request(electionId ? `/candidates?electionId=${electionId}` : "/candidates"),
  createCandidate: (body: unknown) =>
    request("/candidates", { method: "POST", body: JSON.stringify(body) }),
  getVoters: () => request("/voters"),
  createVoter: (body: unknown) =>
    request("/voters", { method: "POST", body: JSON.stringify(body) }),
  getResults: (electionId: number) => request(`/results?electionId=${electionId}`),
  castVote: (body: unknown) =>
    request("/votes", { method: "POST", body: JSON.stringify(body) })
};