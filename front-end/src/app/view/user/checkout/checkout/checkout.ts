import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Data } from '../../../services/data';

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  fullName: string;
  domainName: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout implements OnInit {
  course: Course | null = null;
  isLoading = true;
  isProcessing = false;
  paymentSuccess = false;

  // Form data
  email = '';
  phone = '';
  address = '';
  cardName = '';
  cardNumber = '';
  expiryDate = '';
  cvv = '';

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(Data);
  cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.dataService.GetCourseById(id).subscribe({
          next: (res: any) => {
            this.course = res;
            this.isLoading = false;
            this.cd.markForCheck();
          },
          error: (err: any) => {
            console.error('Error fetching course for checkout', err);
            this.isLoading = false;
            this.cd.markForCheck();
          },
        });
      }
    });
  }

  processPayment(): void {
    this.isProcessing = true;

    // Simulate API call for payment processing
    setTimeout(() => {
      this.isProcessing = false;
      this.paymentSuccess = true;
      this.cd.markForCheck();
      // Auto-redirect to courses after success
      setTimeout(() => {
        this.router.navigate(['/courses']);
      }, 3000);
    }, 1500);
  }
}
