export interface UserService {
  create(input: any): Promise<any>;
  findByEmail(input: any): Promise<any>;
  // delete, update... any user *management* operation does not violate
  // any SOLID principle despite having more than one action in this file

  notifyUser(id: string): Promise<any>;
  sendEmail(id: string): Promise<any>;
  // other operations that does not belong to user management,
  // in this file's scope, would violate SOLID principles
}
