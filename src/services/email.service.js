import { Resend } from 'resend';

const INTEREST_LABELS = {
  fulltime: 'Tiempo completo',
  freelance: 'Freelance',
  consultoria: 'Consultoría',
  saludar: 'Saludar',
};

const resendApiKey = process.env.RESEND_API_KEY;
const notificationEmail = process.env.NOTIFICATION_EMAIL;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const buildHtml = ({ name, email, message, company, interest, createdAt }) => {
  const interestLabel = INTEREST_LABELS[interest] || interest || '—';
  const date = new Date(createdAt).toLocaleString('es-AR', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:system-ui,sans-serif;background:#f9f9f9;padding:40px 20px">
  <table style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
    <tr>
      <td style="background:linear-gradient(135deg,#6366f1,#a855f7);padding:24px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:20px">Nuevo mensaje desde el portfolio</h1>
      </td>
    </tr>
    <tr><td style="padding:32px 24px">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666;font-size:14px">Nombre</td></tr>
        <tr><td style="padding:0 0 16px;font-size:16px;font-weight:600">${name}</td></tr>

        <tr><td style="padding:8px 0;color:#666;font-size:14px">Email</td></tr>
        <tr><td style="padding:0 0 16px"><a href="mailto:${email}" style="color:#6366f1;font-size:16px">${email}</a></td></tr>

        <tr><td style="padding:8px 0;color:#666;font-size:14px">Empresa</td></tr>
        <tr><td style="padding:0 0 16px;font-size:16px">${company || '—'}</td></tr>

        <tr><td style="padding:8px 0;color:#666;font-size:14px">Interés</td></tr>
        <tr><td style="padding:0 0 16px;font-size:16px">${interestLabel}</td></tr>

        <tr><td style="padding:8px 0;color:#666;font-size:14px">Mensaje</td></tr>
        <tr><td style="padding:0 0 16px;font-size:15px;line-height:1.6;white-space:pre-wrap;background:#f5f5f5;border-radius:8px;padding:16px">${message}</td></tr>

        <tr><td style="padding-top:24px;border-top:1px solid #eee;color:#999;font-size:12px">Recibido el ${date}</td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
};

export const sendContactNotification = async (contact) => {
  if (!resend || !notificationEmail) {
    console.warn('[EMAIL] Resend no configurado. Variables RESEND_API_KEY y/o NOTIFICATION_EMAIL faltantes.');
    return;
  }

  const html = buildHtml(contact);

  try {
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [notificationEmail],
      subject: `Nuevo mensaje de ${contact.name}`,
      html,
    });
    console.log(`[EMAIL] Notificación enviada a ${notificationEmail}`);
  } catch (error) {
    console.error('[EMAIL] Error al enviar notificación:', error.message);
  }
};
