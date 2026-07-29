export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
export default cn;
