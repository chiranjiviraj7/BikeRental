import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-general-alert-dialog',
  templateUrl: './general-alert-dialog.component.html'
})
export class GeneralAlertDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    message: string,
    type: 'success' | 'error' | 'info',
    prompt?: boolean, 
    userInput?: string 
  }) { }
}
