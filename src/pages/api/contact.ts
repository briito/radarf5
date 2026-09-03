import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

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