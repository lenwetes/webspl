import React from 'react';

export default function SLPLogo({ size = 'medium', className = '' }) {
  const bulbPx = { small: 52, medium: 72, large: 96 }[size] ?? 72;

  // Texto calibrado para que el bloque total ≈ altura del bulbo
  const slpPx = bulbPx * 0.38;   // SLP — peso visual principal
  const subPx = bulbPx * 0.135;  // Soluciones Informáticas
  const tagPx = bulbPx * 0.105;  // slogan
  const gap   = bulbPx * 0.13;   // separación ícono↔texto

  return (
    <div className={`flex items-center flex-shrink-0 ${className}`} style={{ gap }}>

      <img
        src="/logo-bulb.png"
        alt="SLP Soluciones Informáticas"
        draggable={false}
        style={{ width: bulbPx, height: bulbPx, objectFit: 'contain', flexShrink: 0, display: 'block' }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: subPx * 0.18 }}>

        <span style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 900,
          fontSize: slpPx,
          letterSpacing: '0.06em',
          color: '#c9940a',
          lineHeight: 1,
        }}>
          SLP
        </span>

        <span style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 600,
          fontSize: subPx,
          letterSpacing: '0.03em',
          color: '#b47d0a',
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
        }}>
          Soluciones Informáticas
        </span>

        <span style={{
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: tagPx,
          color: '#92600a',
          whiteSpace: 'nowrap',
          lineHeight: 1.2,
        }}>
          Nos apasiona tu bienestar
        </span>

      </div>
    </div>
  );
}
