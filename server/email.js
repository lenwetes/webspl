import nodemailer from 'nodemailer';

const CONTACT_TO = process.env.CONTACT_TO || 'slps.soluciones.informaticas@gmail.com, selpe74@gmail.com, lenwetes@gmail.com';

function createTransporter() {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    throw new Error('El servicio de correo SMTP no está configurado en las variables de entorno del VPS (SMTP_USER / SMTP_PASS).');
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: smtpUser, pass: smtpPass },
  });
  const fromName = process.env.EMAIL_FROM_NAME || 'SLP Soluciones Informáticas';
  return { transporter, smtpUser, fromName };
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const CONTACT_LABELS = {
  nombre: 'Nombre', empresa: 'Empresa', telefono: 'Teléfono', correo: 'Correo',
  servicio: 'Servicio', alcance: 'Alcance', urgencia: 'Urgencia', presupuesto: 'Presupuesto', mensaje: 'Mensaje',
};

export async function sendContactEmail(data) {
  const { transporter, smtpUser, fromName } = createTransporter();
  const rows = Object.entries(CONTACT_LABELS)
    .filter(([k]) => data[k])
    .map(([k, label]) => `<tr><td style="padding:8px 12px;font-weight:700;color:#0f1e33;background:#f8fafc;border:1px solid #e2e8f0;width:130px;vertical-align:top;">${label}</td><td style="padding:8px 12px;color:#475569;border:1px solid #e2e8f0;white-space:pre-wrap;">${esc(data[k])}</td></tr>`)
    .join('');

  await transporter.sendMail({
    from: `"${fromName}" <${smtpUser}>`,
    to: CONTACT_TO,
    replyTo: data.correo,
    subject: `[${data.origen}] ${data.servicio || 'Consulta'} — ${data.nombre}`,
    html: `<div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;">
  <div style="background:#0f1e33;padding:20px 24px;border-radius:12px 12px 0 0;">
    <span style="font-size:22px;font-weight:900;color:#f37021;">SLP</span>
    <span style="font-size:12px;color:#94a3b8;margin-left:8px;">Nueva solicitud · ${esc(data.origen)}</span>
  </div>
  <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:13px;">${rows}</table>
  <p style="font-size:11px;color:#94a3b8;margin-top:16px;">Responda este correo para contestar directamente al cliente.</p>
</div>`,
  });
}

export async function sendPasswordResetEmail(to, name, resetUrl) {
  let transporter, smtpUser, fromName;
  try {
    ({ transporter, smtpUser, fromName } = createTransporter());
  } catch (err) {
    console.warn(`⚠️ [SMTP NO CONFIGURADO] Enlace para ${to}: ${resetUrl}`);
    throw err;
  }

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${smtpUser}>`,
      to,
      subject: 'Recuperación de Contraseña — SLP Soluciones',
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:520px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.10);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f1e33,#162a45);padding:32px 40px;text-align:center;">
              <div style="font-size:28px;font-weight:900;color:#f37021;letter-spacing:-0.5px;">SLP</div>
              <div style="font-size:11px;color:#94a3b8;letter-spacing:3px;text-transform:uppercase;margin-top:2px;">Soluciones Informáticas</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <h2 style="margin:0 0 12px;font-size:20px;font-weight:800;color:#0f1e33;">Recuperación de Contraseña</h2>
              <p style="margin:0 0 8px;font-size:14px;color:#475569;line-height:1.6;">
                Hola <strong>${name}</strong>,
              </p>
              <p style="margin:0 0 28px;font-size:14px;color:#475569;line-height:1.6;">
                Recibimos una solicitud para restablecer la contraseña de tu cuenta. Haz clic en el botón a continuación para continuar. El enlace es válido por <strong>30 minutos</strong>.
              </p>
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#f37021,#dc5c10);color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;border-radius:12px;box-shadow:0 6px 20px rgba(243,112,33,0.35);">
                      Restablecer Contraseña →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:28px 0 0;font-size:12px;color:#94a3b8;line-height:1.6;">
                Si no solicitaste esto, ignora este correo. Tu contraseña no cambiará.
              </p>
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;" />
              <p style="margin:0;font-size:11px;color:#cbd5e1;word-break:break-all;">
                Enlace de acceso directo:<br/>
                <a href="${resetUrl}" style="color:#f37021;">${resetUrl}</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:11px;color:#94a3b8;">
                © ${new Date().getFullYear()} SLP Soluciones Informáticas · Todos los derechos reservados
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    });
  } catch (err) {
    console.error('❌ Error al enviar email con Nodemailer:', err);
    throw new Error(`Error en el servidor de correo: ${err.message}`);
  }
}
