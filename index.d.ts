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

  wrap(cb: () => any, name?: string): () => void;
  wrap(cb: () => any, name: string, isAsync: boolean): () => Promise<void>;
}

export declare const tracer: Agent;

export default tracer;
