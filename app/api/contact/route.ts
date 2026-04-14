import { NextResponse } from "next/server";
import { BUSINESS } from "@/lib/constants";

/* /api/contact — receives reservation-form submissions from
   components/Reservation.tsx and relays them to BUSINESS.email
   through the Resend transactional-email API.

   Runtime is set to "edge" because all we do here is one outgoing
   fetch; edge cold-starts are dramatically faster than Node and
   Resend's REST endpoint accepts fetch fine. */

export const runtime = "edge";

type Payload = {
  name?: string;
  nameKana?: string;
  tel?: string;
  email?: string;
  vehicle?: string;
  bodyColor?: string;
  treatment?: string;
  concerns?: string[];
  note?: string;
  botcheck?: string;
};

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { error: "不正なリクエストです。" },
      { status: 400 },
    );
  }

  // Honeypot — silently pretend success so naive bots don't retry.
  if (data.botcheck?.trim()) {
    return NextResponse.json({ ok: true });
  }

  // Minimal validation. Matches the `required` attrs on the form.
  const missing = !data.name?.trim() ||
    !data.email?.trim() ||
    !data.tel?.trim() ||
    !data.vehicle?.trim();
  if (missing) {
    return NextResponse.json(
      { error: "お名前・メール・電話・車種は必須です。" },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "送信先がまだ設定されていません。管理者にお問い合わせください。",
      },
      { status: 503 },
    );
  }

  /* `RESEND_FROM` overrides the default if the account is using a
     different verified sender. Fallback uses the site's own
     domain so the message reaches Gmail's inbox (not spam). */
  const from =
    process.env.RESEND_FROM ||
    "Car Wash Homies <no-reply@carwashhomies.com>";

  const subject = `【お問い合わせ】${data.name} 様 / ${data.vehicle}`;

  const lines = [
    "車の美容外科 Car Wash Homies お問い合わせフォーム",
    "─────────────────────",
    `お名前     : ${data.name ?? ""}`,
    `フリガナ   : ${data.nameKana ?? ""}`,
    `電話番号   : ${data.tel ?? ""}`,
    `メール     : ${data.email ?? ""}`,
    "",
    "── 愛車情報 ──",
    `車種・年式 : ${data.vehicle ?? ""}`,
    `カラー     : ${data.bodyColor || "（未入力）"}`,
    "",
    "── お悩み ──",
    data.concerns?.length
      ? data.concerns.map((c) => `・${c}`).join("\n")
      : "（未選択）",
    "",
    "── ご希望の施術 ──",
    data.treatment || "（未選択）",
    "",
    "── ご相談内容・ご希望日時 ──",
    data.note || "（未入力）",
    "",
    "─────────────────────",
    "※ ウェブサイトのお問い合わせフォームから送信されました。",
  ];
  const text = lines.join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [BUSINESS.email],
        reply_to: data.email,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", res.status, errText);
      return NextResponse.json(
        { error: "送信サービスでエラーが発生しました。" },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact POST failed:", err);
    return NextResponse.json(
      { error: "通信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 },
    );
  }
}
