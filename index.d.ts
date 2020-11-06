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

interface InitializeInterface {
  init(config?: AgentConfig): Agent;
  globalAgent(): Agent | undefined;
}

export default InitializeInterface;
