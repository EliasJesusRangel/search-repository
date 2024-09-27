export interface Procedure {
  fn: { (): void; name: string };
  runner: () => void;
  label: string;
}
export interface FindResult {
  name: string;
  scope: string; // e.g., "function", "class", "enum", etc.
  context: string; // Additional information, e.g., function signature, class name, etc.
}
