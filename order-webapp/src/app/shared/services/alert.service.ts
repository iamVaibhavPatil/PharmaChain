import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private matSnackBar: MatSnackBar) { }

  public showSuccess(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['success'];
    config.duration = 3000;
    this.matSnackBar.open(message.toUpperCase(), 'X', config);
  }

  public showError(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['danger'];
    config.duration = 5000;
    this.matSnackBar.open(message.toUpperCase(), 'X', config);
  }

  public showInfo(message: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['info'];
    config.duration = 3000;
    this.matSnackBar.open(message.toUpperCase(), 'X', config);
  }
}
