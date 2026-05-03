
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Messages {
  id: number;
  sender: string;
  senderInitials: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  read: boolean;
  starred: boolean;
  folder: 'inbox' | 'sent' | 'starred' | 'trash';
}

@Component({
  selector: 'app-messages',
  imports: [CommonModule, FormsModule],
  templateUrl: 'messages.html',
  styleUrls: ['messages.css'],
})
export class MessagesComponent implements OnInit {

  activeTab: 'inbox' | 'sent' | 'starred' | 'trash' = 'inbox';
  selectedMessage: Messages | null = null;
  showCompose = false;
  searchQuery = '';

  compose = { to: '', subject: '', body: '' };

  messages: Messages[] = [
    {
      id: 1,
      sender: 'Ali Ben Salah',
      senderInitials: 'AB',
      email: 'ali.bensalah@example.com',
      subject: 'Course Enrollment Request',
      preview: 'I would like to enroll in the Angular course...',
      body: `Hello,\n\nI would like to enroll in the Angular course available on the platform. Could you please provide me with the necessary steps to complete the enrollment?\n\nThank you,\nAli`,
      date: 'Today, 09:15',
      read: false,
      starred: false,
      folder: 'inbox'
    },
    {
      id: 2,
      sender: 'Fatima Zahra',
      senderInitials: 'FZ',
      email: 'fatima.zahra@example.com',
      subject: 'Payment Issue on Platform',
      preview: 'I tried to pay for the course but the payment...',
      body: `Hi Admin,\n\nI tried to pay for the premium course but the payment gateway returned an error. The transaction ID is #TX20240312. Please look into this.\n\nBest,\nFatima`,
      date: 'Today, 08:40',
      read: false,
      starred: true,
      folder: 'inbox'
    },
    {
      id: 3,
      sender: 'Mohamed Haddad',
      senderInitials: 'MH',
      email: 'm.haddad@example.com',
      subject: 'Certificate Request',
      preview: 'I completed the full-stack course and need...',
      body: `Dear Support,\n\nI have successfully completed the Full-Stack Development course (Course ID: FS-204). I would like to request my certificate of completion.\n\nRegards,\nMohamed Haddad`,
      date: 'Yesterday',
      read: true,
      starred: false,
      folder: 'inbox'
    },
    {
      id: 4,
      sender: 'Nour Khelil',
      senderInitials: 'NK',
      email: 'nour.khelil@example.com',
      subject: 'Instructor Application',
      preview: 'I would like to apply as an instructor...',
      body: `Hello,\n\nI am a software engineer with 5 years of experience and I would like to apply as an instructor on your platform. I specialize in Python and Machine Learning.\n\nPlease let me know the next steps.\n\nBest regards,\nNour Khelil`,
      date: 'Mon, 10:00',
      read: true,
      starred: false,
      folder: 'inbox'
    },
    {
      id: 5,
      sender: 'Admin (You)',
      senderInitials: 'AD',
      email: 'admin@t3alemcodi.com',
      subject: 'Re: Course Approval - Python Basics',
      preview: 'Your course has been approved and is now live...',
      body: `Hi Instructor,\n\nYour course "Python Basics for Beginners" has been reviewed and approved. It is now live on the platform.\n\nCongratulations!\n\nBest,\nT3alem Codi Admin`,
      date: 'Sun, 14:22',
      read: true,
      starred: false,
      folder: 'sent'
    },
  ];

  get unreadCount(): number {
    return this.messages.filter(m => m.folder === 'inbox' && !m.read).length;
  }

  get filteredMessages(): Messages[] {
    let folder = this.activeTab === 'starred'
      ? this.messages.filter(m => m.starred)
      : this.messages.filter(m => m.folder === this.activeTab);

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      folder = folder.filter(m =>
        m.sender.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.preview.toLowerCase().includes(q)
      );
    }

    return folder;
  }

  ngOnInit(): void {}

  setTab(tab: 'inbox' | 'sent' | 'starred' | 'trash'): void {
    this.activeTab = tab;
    this.selectedMessage = null;
  }

  selectMessage(msg: Messages): void {
    this.selectedMessage = msg;
    msg.read = true;
  }

  toggleStar(msg: Messages, event: Event): void {
    event.stopPropagation();
    msg.starred = !msg.starred;
  }

  deleteMessage(msg: Messages): void {
    msg.folder = 'trash';
    this.selectedMessage = null;
  }

  openCompose(): void {
    this.compose = { to: '', subject: '', body: '' };
    this.showCompose = true;
  }

  openReply(): void {
    if (!this.selectedMessage) return;
    this.compose = {
      to: this.selectedMessage.email,
      subject: `Re: ${this.selectedMessage.subject}`,
      body: ''
    };
    this.showCompose = true;
  }

  closeCompose(): void {
    this.showCompose = false;
  }

  sendMessage(): void {
    if (!this.compose.to || !this.compose.subject) return;

    const sent: Messages = {
      id: Date.now(),
      sender: 'Admin (You)',
      senderInitials: 'AD',
      email: this.compose.to,
      subject: this.compose.subject,
      preview: this.compose.body.substring(0, 60) + '...',
      body: this.compose.body,
      date: 'Just now',
      read: true,
      starred: false,
      folder: 'sent'
    };

    this.messages.unshift(sent);
    this.closeCompose();
    this.setTab('sent');
    this.selectedMessage = sent;
  }
}
