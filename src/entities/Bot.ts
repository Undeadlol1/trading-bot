import { Strategy } from '../../dist/entities/Strategy';

export interface Bot {
  isActive: boolean;
  strategy: Strategy;
  currentState: string;
}
