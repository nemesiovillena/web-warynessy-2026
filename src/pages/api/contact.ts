import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { nombre, email, telefono, asunto, mensaje } = data;

    // Validación básica
    if (!nombre || !email || !mensaje) {
      return new Response(
        JSON.stringify({ error: 'Nombre, email y mensaje son obligatorios.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'El formato del email no es válido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resendApiKey = import.meta.env.RESEND_API_KEY;
    const emailTo = import.meta.env.EMAIL_TO || 'contacto@warynessy.com';
    const emailFrom = import.meta.env.EMAIL_FROM || 'onboarding@resend.dev';

    if (!resendApiKey) {
      console.warn('RESEND_API_KEY no configurada. Saltando envío de email en desarrollo.');

      // En desarrollo, permitimos que el formulario "funcione" sin la API Key para pruebas de UI
      if (import.meta.env.DEV || import.meta.env.NODE_ENV === 'development') {
        console.log('SIMULACIÓN DE ENVÍO DE EMAIL (DESARROLLO):', {
          to: emailTo,
          from: emailFrom,
          data: { nombre, email, telefono, asunto, mensaje }
        });

        return new Response(
          JSON.stringify({ success: true, message: 'Simulación: Mensaje "enviado" correctamente (Modo Desarrollo).' }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Error de configuración del servidor.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      replyTo: email,
      subject: `[Web Warynessy] ${asunto || 'Nuevo mensaje'} - ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #AD9775; border-bottom: 2px solid #AD9775; padding-bottom: 10px;">
            Nuevo mensaje desde la web
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666; width: 100px;">Nombre:</td>
              <td style="padding: 8px 12px;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Email:</td>
              <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Teléfono:</td>
              <td style="padding: 8px 12px;">${telefono || 'No proporcionado'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #666;">Asunto:</td>
              <td style="padding: 8px 12px;">${asunto || 'Sin especificar'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
            <p style="font-weight: bold; color: #666; margin: 0 0 8px;">Mensaje:</p>
            <p style="white-space: pre-wrap; margin: 0;">${mensaje}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            Enviado desde el formulario de contacto de warynessy.com
          </p>
        </div>
      `,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Mensaje enviado correctamente.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al enviar email:', error);
    return new Response(
      JSON.stringify({ error: 'Error al enviar el mensaje. Inténtalo de nuevo.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
