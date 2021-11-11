import {Component, OnInit} from '@angular/core';
import {ChatService} from "./chat.service";
import * as $ from 'jquery';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit {

  webSocket: WebSocket = new WebSocket('ws://localhost:5000');;
  message: string = '';
  messages: any[] = [];
  index: number = 0;
  username: string = '';
  inputForm: FormGroup = new FormGroup({
    message: new FormControl('')
  });
  typings: any[] = [];
  chatBoxOpened: boolean = false;
  unreadMessages: number = 0;

  constructor(private chatService: ChatService) {
    chatService.currentMessages.subscribe(msg => {
      this.messages = msg;
      console.log(msg)
    });
    chatService.currentUsername.subscribe(name => {
      this.username = name;
      console.log(this.username)
    });
    chatService.currentTypings.subscribe(typings => {
      this.typings = typings;
    })
  }

  ngOnInit(): void {
    this.openWebSocket()
  }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:5000');
    this.webSocket.onopen = (event: Event) => {
      console.log('Szerver fut: ', event);
    };

    this.webSocket.onmessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === 'delete') {
        const isDeleted = (element: any) => element.message === message.message && element.type === 'newMessage'  && element.nickname === message.nickname;
        const deleteIndex = this.messages.findIndex(isDeleted);
        this.messages[deleteIndex].message = 'törölve';
        this.chatService.messages.next(this.messages);
      } else if (message.type === 'typing') {
        this.typings.push(message);
        this.chatService.typings.next(this.typings);
      } else if (message.type === 'typingEnded') {
        const isDeleted = (element: any) => element.nickname === message.nickname;
        const deleteIndex = this.typings.findIndex(isDeleted);
        this.typings.splice(deleteIndex, 1);
        this.chatService.typings.next(this.typings);
      } else {
        this.messages.push(message);
        this.chatService.messages.next(this.messages);
        if (!this.chatBoxOpened && message.type === 'newMessage') {
          this.unreadMessages++;
        }
        console.log(this.unreadMessages);
      }
    };

    this.webSocket.onerror = (event: Event) => {
      this.webSocket.close();
    };

    this.webSocket.onclose = (event: CloseEvent) => {
      console.log('Szerver leáll, újracsatlakozás: ', event);
      this.openWebSocket();
    };
  }

  deleteMessage(msg: any): void {
    const deleteMsg = {
      type: 'delete',
      message: msg.message
    };
    const isDeleted = (element: any) => element.message === msg.message && element.type === 'sendMessage';
    const deleteIndex = this.messages.findIndex(isDeleted);
    this.messages[deleteIndex].message = 'törölve';
    this.chatService.messages.next(this.messages);
    this.webSocket.send(JSON.stringify(deleteMsg));
  }

  sendMessage(message: string): void {
    const msg = {
      type: "sendMessage",
      message: message
    };
    this.messages.push(msg);
    this.chatService.messages.next(this.messages);
    this.webSocket.send(JSON.stringify(msg));
  }

  typing() {
    if (!this.username) {
      return;
    }
    const msg = {
      type: 'typing',
    };
    this.webSocket.send(JSON.stringify(msg));
  }

  submit(e: any) {
    e.preventDefault();
    let msg = this.inputForm.get('message')?.value;
    if (msg === '') {
      return;
    };
    this.inputForm.get('message')?.patchValue('');
    if (!this.username) {
      this.chatService.changeUsername(msg);
      const name = {
        type: "setNickname",
        nickname: msg
      };
      this.webSocket.send(JSON.stringify(name));
      return;
    }
    this.sendMessage(msg);
    const typingEnded = { type: 'typingEnded' };
    this.webSocket.send(JSON.stringify(typingEnded));
  }

  openChat() {
    this.chatBoxOpened = !this.chatBoxOpened;
    if (this.chatBoxOpened) {
      this.unreadMessages = 0;
    }
    $("#chat-circle").toggle({effect: 'scale'});
    $(".chat-box").toggle({effect: 'scale'});
  }

  chatBoxToggle() {
    this.chatBoxOpened = !this.chatBoxOpened;
    if (this.chatBoxOpened) {
      this.unreadMessages = 0;
    }
    $("#chat-circle").toggle({effect: 'scale'});
    $(".chat-box").toggle({effect: 'scale'});
  }
}
