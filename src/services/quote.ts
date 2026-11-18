export interface QuoteSubmission {
  name: string;
  phone: string;
  email: string;
  city: string;
  services: string[];
  yardSize: string;
  timeline: string;
  preferredDate: string;
  message: string;
}

export interface QuoteResponse {
  ok: boolean;
  referenceId: string;
  submittedAt: string;
}

export async function submitQuoteRequest(payload: QuoteSubmission): Promise<QuoteResponse> {
  // Isolated client-side handler ready for backend/webhook wiring when client provides endpoint
  await new Promise((resolve) => setTimeout(resolve, 420));

  const referenceId = `CAS-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    ok: true,
    referenceId,
    submittedAt: new Date().toISOString(),
  };
}
