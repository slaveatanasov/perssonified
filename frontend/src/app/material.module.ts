import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatSidenavModule, 
  MatIconModule, 
  MatListModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatMenuModule, 
  MatExpansionModule, 
  MatGridListModule,
  MatProgressBarModule
} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressBarModule
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressBarModule
  ]
})

export class MaterialModule { }