import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RentalHistory } from "../../models/RentalHistory.model";

@Component({
  selector: 'app-rental-history-dialog',
  templateUrl: './rental-history-dialog.component.html'
})
export class RentalHistoryDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, rentals: RentalHistory[] }) { }
}
