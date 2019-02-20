import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { Message } from 'src/app/models/message';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message-get',
  templateUrl: './message-get.component.html',
  styleUrls: ['./message-get.component.css'],
  providers: [MessageService]
})
export class MessageGetComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute
    ) { }

  messages: Message[];
  message: Message;

  ngOnInit() {
    this.getMessages();
  }

  getMessages() {
    this.messageService.getMessages().subscribe(data => {
      this.messages = data;
    });
  }

  getMessage(message) {
    this.message = message;
  }

  onDelete(id) {
    this.messageService.deleteMessage(id);
    console.log(id);
  }

}
