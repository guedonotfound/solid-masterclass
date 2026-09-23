// Strategy Pattern

import type { User } from "../application/entities/User.js";

export interface NotifierStrategy {
  notify(user: User): Promise<void>;
}

export class WhatsAppNotifierStrategy implements NotifierStrategy {
  async notify(user: User): Promise<void> {
    console.log(`Notifying ${user.name} via WhatsApp`);
    return Promise.resolve();
  }
}

export class EmailNotifierStrategy implements NotifierStrategy {
  async notify(user: User): Promise<void> {
    console.log(`Notifying ${user.name} via Email`);
    return Promise.resolve();
  }
}

export class SmsNotifierStrategy implements NotifierStrategy {
  async notify(user: User): Promise<void> {
    console.log(`Notifying ${user.name} via SMS`);
    return Promise.resolve();
  }
}
