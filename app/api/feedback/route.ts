import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const feedbackSchema = z.object({
  nome: z.string().min(2).max(100),
  email: z.string().email().max(255),
  assunto: z.enum(["Problema", "Sugestão", "Outro"]),
  assuntoOutro: z.string().max(200).optional(),
  mensagem: z.string().min(10).max(500),
  honeypot: z.string().max(0),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry) {
    if (now < entry.resetAt) {
      if (entry.count >= 3) return true;
      entry.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
  }

  return false;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Muitas tentativas. Tente novamente mais tarde." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Corpo da requisição inválido." },
      { status: 400 },
    );
  }

  const result = feedbackSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: "Dados inválidos." }, { status: 400 });
  }

  const { nome, email, assunto, assuntoOutro, mensagem, honeypot } =
    result.data;

  if (honeypot) {
    return NextResponse.json({ message: "Feedback enviado com sucesso!" });
  }

  const assuntoFinal =
    assunto === "Outro" && assuntoOutro ? `Outro: ${assuntoOutro}` : assunto;

  try {
    await resend.emails.send({
      from: "VegCom Feedback <feedback@vegcom.life>",
      to: "vegcomlife@gmail.com",
      replyTo: email,
      subject: `[Feedback] ${assuntoFinal} — ${nome}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1b4e30; padding: 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fffdf4; margin: 0; font-size: 20px;">Novo Feedback — VegCom</h2>
          </div>
          <div style="background: #fffdf4; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #ecf9dd; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 8px; font-weight: bold; color: #1b4e30; width: 130px; vertical-align: top;">Nome</td>
                <td style="padding: 10px 8px; color: #276b37;">${nome}</td>
              </tr>
              <tr style="background: #ecf9dd;">
                <td style="padding: 10px 8px; font-weight: bold; color: #1b4e30; vertical-align: top;">Email</td>
                <td style="padding: 10px 8px;"><a href="mailto:${email}" style="color: #276b37;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 8px; font-weight: bold; color: #1b4e30; vertical-align: top;">Assunto</td>
                <td style="padding: 10px 8px; color: #276b37;">${assuntoFinal}</td>
              </tr>
              <tr style="background: #ecf9dd;">
                <td style="padding: 10px 8px; font-weight: bold; color: #1b4e30; vertical-align: top;">Mensagem</td>
                <td style="padding: 10px 8px; color: #276b37; white-space: pre-wrap;">${mensagem}</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 12px; color: #276b37; margin-top: 16px; text-align: center; opacity: 0.6;">
            Enviado via VegCom — Para responder, use o email acima (replyTo configurado)
          </p>
        </div>
      `,
    });

    return NextResponse.json({ message: "Feedback enviado com sucesso!" });
  } catch (error) {
    console.error("[feedback] Error sending email:", error);
    return NextResponse.json(
      { message: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 },
    );
  }
}
