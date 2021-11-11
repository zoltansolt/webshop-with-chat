import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ChatService {
  public messages: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public currentMessages = this.messages.asObservable();
  public typings: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public currentTypings = this.typings.asObservable();
  public username: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentUsername = this.username.asObservable();
  constructor() {}

  changeUsername(newUsername: string) {
    this.username.next(newUsername);
  }
}
