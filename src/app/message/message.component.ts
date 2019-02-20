import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessageService]
})
export class MessageComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  messages: Message[];
  messageAddForm: FormGroup;
  message: Message;

  ngOnInit() {
    this.createMessageForm();
  }

  createMessageForm() {
    this.messageAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onCreate() {
    if (this.messageAddForm.valid) {
      const message = Object.assign({}, this.messageAddForm.value);
      this.setMessages(message);
    }
  }

  setMessages(message) {
    this.messageService.setMessage(message);
  }

}
