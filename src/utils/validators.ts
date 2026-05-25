export function validateFullName(name: string): string | null {
  const normalizedName = name.trim();

  if (!normalizedName) {
    return "Você prencheceu seu nome completo?";
  }

  const nameParts = normalizedName.split(/\s+/);

  if (nameParts.length < 2) {
    return "Por favor, digite seu nome completo.";
  }

  const hasInvalidCharacters =
    !/^[A-Za-zÀ-ÿ\s]+$/.test(normalizedName);

  if (hasInvalidCharacters) {
    return "Nome contém caracteres inválidos.";
  }

  return null;
}

export function validateEmail(email: string): string | null {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    return "Você prencheceu seu e-mail?";
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(normalizedEmail)) {
    return "Endereço de e-mail inválido.";
  }

  return null;
}

export function validateCPF(cpf: string): string | null {
  const normalizedCPF = cpf.replace(/\D/g, "");

  if (!normalizedCPF) {
    return "Você prencheceu seu CPF?";
  }

  if (normalizedCPF.length !== 11) {
    return "CPF deve conter 11 dígitos.";
  }

  if (/^(\d)\1+$/.test(normalizedCPF)) {
    return "CPF inválido.";
  }

  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += Number(normalizedCPF[i]) * (10 - i);
  }

  let firstDigit = (sum * 10) % 11;

  if (firstDigit === 10) {
    firstDigit = 0;
  }

  if (firstDigit !== Number(normalizedCPF[9])) {
    return "CPF inválido.";
  }

  sum = 0;

  for (let i = 0; i < 10; i++) {
    sum += Number(normalizedCPF[i]) * (11 - i);
  }

  let secondDigit = (sum * 10) % 11;

  if (secondDigit === 10) {
    secondDigit = 0;
  }

  if (secondDigit !== Number(normalizedCPF[10])) {
    return "CPF inválido.";
  }

  return null;
}