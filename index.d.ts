export interface LoggerConfig {
  info: (message?: string) => any;
  debug: (message?: string) => any;
  warn: (message?: string) => any;
  fatal: (message?: string) => any;
}

export interface AgentConfig {
  logger?: LoggerConfig;
}

export class Agent {
  constructor(config?: AgentConfig);

  start(): void;

  wrap(cb: () => any, name?: string, isAsync?: boolean): () => void;
}

export const globalAgent: Agent;

export declare interface Tracer {
  init(config?: AgentConfig): Agent;
}

export declare const tracer: Tracer;

export default tracer;
