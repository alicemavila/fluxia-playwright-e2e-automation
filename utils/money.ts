export function moneyPattern(value: number): RegExp {
  const fixed = value.toFixed(2);
  const [integerPart, cents] = fixed.split('.');

  const withComma = `${integerPart},${cents}`;
  const withDot = `${integerPart}.${cents}`;
  const withThousands = `${Number(integerPart).toLocaleString('pt-BR')},${cents}`;

  return new RegExp(
    `(R\\$\\s*)?(${withComma}|${withDot}|${withThousands})`,
    'i'
  );
}