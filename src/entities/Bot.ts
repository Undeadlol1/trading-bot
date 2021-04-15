import { UsualDatabaseFields } from '../../dist/entities/UsualDatabaseFields';

export abstract class Bot implements UsualDatabaseFields {
  abstract id: string;
  abstract symbol: string;
  abstract createdAt: Date;
  abstract updatedAt: Date;
  abstract isActive: boolean;
  abstract isPaperTradingEnabled: boolean;
}
