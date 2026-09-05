import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

// Rate limiting simples em memória (por IP). Suficiente para coibir bots
// básicos, mas não é garantido em ambientes serverless com múltiplas
// instâncias (cada instância fria tem seu próprio mapa). Para uma proteção
// mais robusta, considere um serviço externo (Upstash Redis, Vercel KV, etc.).
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const ip = clientAddress || request.headers.get("x-forwarded-for") || "unknown";

    if (isRateLimited(ip)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Muitas tentativas. Tente novamente mais tarde.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const formData = await request.formData();

    // Honeypot: campo invisível para humanos. Se vier preenchido, é bot.
    const honeypot = formData.get("website")?.toString().trim();

    if (honeypot) {
      // Resposta "de sucesso" para não revelar ao bot que foi detectado.
      return new Response(
        JSON.stringify({
          success: true,
          message: "Mensagem enviada com sucesso!",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const nome = formData.get("nome")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const mensagem = formData.get("mensagem")?.toString().trim();

    if (!nome || !email || !mensagem) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Preencha todos os campos.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Informe um e-mail válido.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { error } = await resend.emails.send({
      from: "Radar F5 <contato@radarf5.com>",
      to: ["radarf5web@gmail.com"],
      replyTo: email,
      subject: `Nova mensagem de contato - ${nome}`,
      text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`,
    });

    if (error) {
      console.error("Erro ao enviar e-mail:", error);

      return new Response(
        JSON.stringify({
          success: false,
          message: "Não foi possível enviar a mensagem.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Mensagem enviada com sucesso!",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Erro na API de contato:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Ocorreu um erro ao processar sua mensagem.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};