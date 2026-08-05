import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true', // true para puerto 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Envía email de recuperación de contraseña
 * @param {string} to - Correo destino
 * @param {string} name - Nombre del usuario
 * @param {string} resetUrl - URL completa con token de recuperación
 */
export async function sendPasswordResetEmail(to, name, resetUrl) {
  const fromName = process.env.EMAIL_FROM_NAME || 'SLP Soluciones Informáticas';
  const fromAddr = process.env.SMTP_USER;

  await transporter.sendMail({
    from: `"${fromName}" <${fromAddr}>`,
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
}
