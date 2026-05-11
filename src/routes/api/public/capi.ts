import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";

const PIXEL_ID = "4498289267084727";
const TEST_EVENT_CODE = "TEST23282";

const sha256 = (s: string) =>
  createHash("sha256").update(s.trim().toLowerCase()).digest("hex");

export const Route = createFileRoute("/api/public/capi")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        }),
      POST: async ({ request }) => {
        const token = process.env.META_CAPI_ACCESS_TOKEN;
        if (!token) {
          return Response.json({ error: "missing token" }, { status: 500 });
        }
        let body: any = {};
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "bad json" }, { status: 400 });
        }
        const eventName = String(body.event_name || "PageView").slice(0, 40);
        const eventId = String(body.event_id || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
        const eventSourceUrl = String(body.event_source_url || request.headers.get("referer") || "");
        const fbp = body.fbp ? String(body.fbp) : undefined;
        const fbc = body.fbc ? String(body.fbc) : undefined;

        const xff = request.headers.get("x-forwarded-for") || "";
        const ip = xff.split(",")[0].trim() || request.headers.get("cf-connecting-ip") || "";
        const ua = request.headers.get("user-agent") || "";

        const userData: Record<string, unknown> = {
          client_ip_address: ip || undefined,
          client_user_agent: ua,
        };
        if (fbp) userData.fbp = fbp;
        if (fbc) userData.fbc = fbc;
        if (body.email) userData.em = [sha256(String(body.email))];
        if (body.phone) userData.ph = [sha256(String(body.phone).replace(/\D/g, ""))];

        const payload = {
          data: [
            {
              event_name: eventName,
              event_time: Math.floor(Date.now() / 1000),
              event_id: eventId,
              action_source: "website",
              event_source_url: eventSourceUrl,
              user_data: userData,
              custom_data: body.custom_data || {},
            },
          ],
          test_event_code: TEST_EVENT_CODE,
        };

        const res = await fetch(
          `https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        const text = await res.text();
        return new Response(text, {
          status: res.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      },
    },
  },
});