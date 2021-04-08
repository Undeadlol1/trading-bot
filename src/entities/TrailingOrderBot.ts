import { TrailingOrderBotCreateDTO } from '../DTOs/TrailingOrderBotCreateDTO';
import { UsualDatabaseFields } from './UsualDatabaseFields';

export interface TrailingOrderBot
  extends TrailingOrderBotCreateDTO,
    UsualDatabaseFields {
  hasSold: boolean;
  hasBought: boolean;
}
